

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentAccessService } from '../../../home/Service/studentAccess.service';
import { CourseSectionService } from '../../../home/Service/courseSection.service';
import { StudentService } from '../../../home/Service/student.service';

@Component({
   selector: 'app-student-course-access',
  standalone: false,
  templateUrl: './StudentCourseAccess.html',
  styleUrl: './StudentCourseAccess.css'
})
export class StudentCourseAccess implements OnInit {
  studentId!: string;
  studentName = ''; 
  courseSections: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private studentAccessSer: StudentAccessService,
    private courseSectionSer: CourseSectionService,
    
   private studentSer: StudentService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('studentId')!;
    this.loadSections();
    this.loadStudentDetails(this.studentId);
  }

    loadStudentDetails(studentId: string) {
    this.studentSer.getProfile(studentId).subscribe({
      next: (res) => {
        this.studentName = `${res.firstName} ${res.lastName}`;
      },
      error: (err) => {
        console.error('Error loading student details:', err);
      }
    });
  }

  loadSections() {
    this.courseSectionSer.getAllSections().subscribe({
      next: (allSections) => {
        // Map base data
        this.courseSections = allSections.map(s => ({
          ...s,
          accessGranted: false
        }));

        // Fetch student-specific access
        this.studentAccessSer.getAccessByStudent(this.studentId).subscribe({
          next: (accessData) => {
            this.courseSections.forEach(section => {
              const matched = accessData.find(a => a.sectionId === section.sectionId);
              if (matched) {
                section.accessGranted = matched.accessGranted;
              }
            });
          },
          error: () => console.warn('⚠️ Could not fetch student access info')
        });
      },
      error: () => Swal.fire('Error', 'Failed to load course sections', 'error')
    });
  }

  toggleAccess(section: any) {
    const action = section.accessGranted ? 'revoke' : 'assign';

    Swal.fire({
      title: `${action === 'assign' ? 'Grant' : 'Revoke'} Access`,
      text: `Are you sure you want to ${action} access for "${section.title}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiCall = action === 'assign'
          ? this.studentAccessSer.assignAccess(this.studentId, section.sectionId, 'Admin')
          : this.studentAccessSer.revokeAccess(this.studentId, section.sectionId);

        apiCall.subscribe({
          next: () => {
            Swal.fire('Success', `Access ${action}ed successfully`, 'success');
            this.loadSections();
          },
          error: () => Swal.fire('Error', `Failed to ${action} access`, 'error')
        });
      }
    });
  }
}
