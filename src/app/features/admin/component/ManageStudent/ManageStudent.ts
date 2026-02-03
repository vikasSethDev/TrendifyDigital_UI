import { Component, OnInit } from '@angular/core';
import { IStudentProfileDTO } from '../../../../core/DTOs/IStudentProfileDTO';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StudentService } from '../../../home/Service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageStudent',
  standalone: false,
  templateUrl: './ManageStudent.html',
  styleUrl: './ManageStudent.css'
})

export class ManageStudent implements OnInit {

  // Data State
  students: IStudentProfileDTO[] = [];
  filterTerm: string = '';
  private filterSubject = new Subject<string>();

  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  totalStudents: number = 0;


  // Form State
  isModalOpen: boolean = false;
  studentForm!: FormGroup;
  isEditMode: boolean = false;
  selectedStudent: IStudentProfileDTO | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.setupFilter();
    this.loadStudents();
  }


  private initForm(): void {
    this.studentForm = this.fb.group({
      StudentID: [null],
      LoginID: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      MobileNo: [''],
      DOB: [''],
      Gender: [''],
      Address: [''],
      State: [''],
      Occupation: [''],
      CompanyName: [''],
      Designation: [''],
      ObjectiveOfCourse: [''],
      Status: [true],
      EnrollID: [''],
      CourseCode: [''],
      BatchCode: [''],
      BatchTiming: [''],
      Role: ['student'],
    });
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (response: any) => {
        const data = Array.isArray(response.students) ? response.students : [];

         const studentsOnly = data.filter(
        (user: any) => user.role === 'student'
      );
      
        console.log(studentsOnly, 'tect');
        this.students = studentsOnly.map((student: any) => ({
          ...student,
          dob: student.dob && student.dob !== 'N/A' ? student.dob : null


        }));
      },
      error: (err) => {
        console.error('Error loading students:', err);
        this.students = [];
      }
    });
  }



  setupFilter(): void {
    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.filterTerm = term.toLowerCase();

      this.students = this.students.filter(student =>
        student.firstName?.toLowerCase().includes(this.filterTerm) ||
        student.email?.toLowerCase().includes(this.filterTerm) ||
        student.enrollId?.toLowerCase().includes(this.filterTerm)
      );
    });
  }


  onFilterChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.filterSubject.next(inputElement.value.trim());
  }


  openAddModal(): void {
    this.isEditMode = false;
    this.selectedStudent = null;
    this.studentForm.reset({ Status: true });
    this.isModalOpen = true;
  }

  openUpdateModal(student: IStudentProfileDTO): void {
    this.isEditMode = true;
    this.selectedStudent = student;
    this.isModalOpen = true;

    this.studentForm.patchValue({
      StudentID: student._id || student.studentId,

      LoginID: student.loginID,
      FirstName: student.firstName,
      LastName: student.lastName,
      Email: student.email,
      MobileNo: student.mobileNo,
      DOB: this.formatDOBForForm(student.dob),
      Gender: student.gender,
      Address: student.address,
      State: student.state,

      Occupation: student.occupation,
      CompanyName: student.companyName,
      Designation: student.designation,
      ObjectiveOfCourse: student.objectiveOfCourse,

      Status: student.status,
      EnrollID: student.enrollId,
      CourseCode: student.courseCode,
      BatchCode: student.batchCode,
      BatchTiming: student.batchTiming,
    });
  }

  openPaymentPage(student: any) {
    if (!student._id) {
      console.error('Student ID missing');
      return;
    }
    this.router.navigate(['/home/student-payment', student._id]);
  }

  openCourseAccess(student: any) {
    if (!student._id) {
      console.error('Student ID missing');
      return;
    }
    this.router.navigate(['/home/student-access', student._id]);
  }


  private formatDOBForForm(dob: string | undefined): string | null {
    if (!dob) return null;
    try {
      return new Date(dob).toISOString().substring(0, 10);
    } catch {
      return null;
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.studentForm.reset();
  }


  saveStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formData = this.studentForm.value;

    if (this.isEditMode) {
      this.handleUpdate(formData);
    } else {
      this.handleRegistration(formData);
    }
  }

  private generateDefaultPassword(firstName: string, dob: string): string {
    // Password format: FirstName@YYYY (e.g., Alex@2000)

    if (!firstName || !dob) {
      console.error('Cannot generate default password without First Name and DOB.');
      return '';
    }
    const date = new Date(dob);

    if (isNaN(date.getTime())) {
      console.error('Invalid Date of Birth provided for password generation.');
      return '';
    }

    const year = date.getFullYear();

    const formattedFirstName = firstName.toLowerCase();

    return `${formattedFirstName}@${year}`;
  }


  private handleRegistration(formData: any): void {
    // const defaultPassword = this.generateDefaultPassword(formData.FirstName, formData.DOB);
    const defaultPassword = 'Alex@2025';

    const registrationPayload = {
      role: 'student',
      loginID: formData.LoginID,
      password: defaultPassword,
      firstName: formData.FirstName,
      lastName: formData.LastName,
      email: formData.Email,
      mobileNo: formData.MobileNo,
      dob: formData.DOB,
      gender: formData.Gender,
      address: formData.Address,
      state: formData.State,
      occupation: formData.Occupation,
      companyName: formData.CompanyName,
      designation: formData.Designation,
      objectiveOfCourse: formData.ObjectiveOfCourse,
      status: formData.Status,
      enrollID: formData.EnrollID,
      courseCode: formData.CourseCode,
      batchCode: formData.BatchCode,
      batchTiming: formData.BatchTiming,
    };

    // Ensure all required fields for password generation were present
    // if (defaultPassword === '') {
    //   Swal.fire('Error', 'Registration data incomplete. First Name and DOB are required.', 'error');
    //   return;
    // }

    this.studentService.registerStudent(registrationPayload).subscribe({
      next: () => {
        Swal.fire('Success', 'New student registered successfully. Password: ' + defaultPassword, 'success');
        this.closeModal();
        this.loadStudents();
      },
      error: (err) => {
        const msg = err.error?.message || 'Registration failed.';
        Swal.fire('Error', msg, 'error');
      }
    });
  }

  private handleUpdate(formData: any): void {
    const studentID = formData.StudentID;

    console.log('Form Data:', formData);
    console.log('Extracted StudentID:', studentID);


    if (!studentID) {
      console.error('Update aborted: StudentID is missing.');
      Swal.fire('Error', 'Cannot update. Student ID is missing.', 'error');
      return;
    }

    const updatePayload: any = {
      role: 'student',
      loginID: formData.LoginID,
      firstName: formData.FirstName,
      lastName: formData.LastName,
      email: formData.Email,
      mobileNo: formData.MobileNo,
      dob: formData.DOB,
      gender: formData.Gender,
      address: formData.Address,
      state: formData.State,
      occupation: formData.Occupation,
      companyName: formData.CompanyName,
      designation: formData.Designation,
      objectiveOfCourse: formData.ObjectiveOfCourse,
      status: formData.Status,
      enrollID: formData.EnrollID,
      courseCode: formData.CourseCode,
      batchCode: formData.BatchCode,
      batchTiming: formData.BatchTiming,
    };

    Object.keys(updatePayload).forEach(key => {
      if (updatePayload[key] === null || updatePayload[key] === undefined) {
        delete updatePayload[key];
      }
    });

    this.studentService.updateStudent(studentID, updatePayload).subscribe({
      next: () => {
        Swal.fire('Success', 'Student details updated successfully.', 'success');
        this.closeModal();
        this.loadStudents();
      },
      error: (err) => {
        console.error('Detailed Update Error:', err);
        const msg = err.error?.message || 'Update failed.';
        Swal.fire('Error', msg, 'error');
      }
    });
  }
}