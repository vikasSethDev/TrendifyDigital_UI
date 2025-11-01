import { Component, OnInit } from '@angular/core';
import { IStudentProfileDTO } from '../../../../core/DTOs/IStudentProfileDTO';
import { Router } from '@angular/router';
import { StudentService } from '../../../home/Service/student.service';


/**
 * Maps a raw PascalCase student object (from API/session storage) 
 * to the camelCase IStudentProfileDTO format expected by the frontend.
 * @param rawData The raw student object using PascalCase keys (e.g., FirstName, LastName).
 * @returns A new IStudentProfileDTO object with camelCase keys.
 */
function mapRawToStudentDTO(rawData: any): IStudentProfileDTO {
  if (!rawData) {
    return {} as IStudentProfileDTO;
  }
  const dto: IStudentProfileDTO = {
    firstName: rawData.FirstName || '',
    lastName: rawData.LastName || '',
    fullName: `${rawData.FirstName || ''} ${rawData.LastName || ''}`.trim(), // Calculated field
    
    studentId: rawData.StudentID,
    role:rawData.role,
    loginID: rawData.LoginID,
    email: rawData.Email,
    mobileNo: rawData.MobileNo,
    dob: rawData.DOB,
    gender: rawData.Gender,
    address: rawData.Address,
    state: rawData.State,
    occupation: rawData.Occupation,
    companyName: rawData.CompanyName,
    designation: rawData.Designation,
    objectiveOfCourse: rawData.ObjectiveOfCourse,
    status: rawData.Status,
    registrationDate: rawData.RegistrationDate,
    
    enrollId: rawData.EnrollID || rawData.EnrollmentID || null,
    courseCode: rawData.CourseCode,
    batchCode: rawData.BatchCode,
    batchTiming: rawData.BatchTiming,
    phone: rawData.MobileNo || null,
    city: rawData.City || null,
    profilePicture: rawData.ProfilePicture || null,
    resume: rawData.Resume || null,
  } as IStudentProfileDTO; 

  return dto;
}


@Component({
  selector: 'app-AdminDashboard',
  standalone: false,
  templateUrl: './AdminDashboard.html',
  styleUrl: './AdminDashboard.css'
})
export class Admindashboard implements OnInit {
  studentProfile!: IStudentProfileDTO | null;
  isLoading = false;
  errorMessage = '';
  studentName: string = '';
  registrationDate: any;

  constructor(private studentService: StudentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const profileStr = sessionStorage.getItem('studentProfile');

    if (profileStr) {
      const rawData = JSON.parse(profileStr);
      this.studentProfile = mapRawToStudentDTO(rawData);
      
    } else {
      console.warn('No profile found in sessionStorage');
    }

    this.loadProfile();
  }

  loadProfile() {
    if (this.studentProfile) {
      // console.log(this.studentProfile, 'student profile home');

      const firstName = this.studentProfile.firstName;
      const lastName = this.studentProfile.lastName;
      
      this.studentName = this.studentProfile.fullName || `${firstName} ${lastName}`.trim();

      // console.log(this.studentName, 'student name');
      
      this.registrationDate = this.studentProfile.registrationDate
        ? new Date(this.studentProfile.registrationDate).toLocaleDateString()
        : 'N/A';
    }
  }

  goToProfile(): void {
    if (this.studentProfile) {
      this.router.navigate(['/home/my-Profile'], { state: { profile: this.studentProfile } });
    } else {
      console.warn('No student profile available to pass');
    }
  }

  signOut(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.studentProfile = null;
    this.router.navigate(['/login']);
  }
}