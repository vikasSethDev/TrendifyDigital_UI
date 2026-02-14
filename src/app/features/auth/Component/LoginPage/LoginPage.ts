import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IStudentProfileDTO } from '../../../../core/DTOs/IStudentProfileDTO';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-LoginPage',
  standalone: false,
  templateUrl: './LoginPage.html',
  styleUrls: ['./LoginPage.css']
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // Redirect if already logged in
    if (this.authService.isLoggedIn && this.authService.hasValidToken()) {
      const isAdmin = this.authService.isAdmin;
      this.router.navigate([isAdmin ? '/home/admin-Dashboard' : '/home/dashboard']);
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      studentId: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]]
    });
  }

  async Login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { studentId, password } = this.loginForm.value;

    try {
      // ✅ Call login API - backend now returns JWT token
      const response = await firstValueFrom(
        this.authService.login(studentId, password)
      );

      console.log('Login Response:', response);

      if (response && response.success === true && response.token) {
        // ✅ Token is automatically stored by AuthService
        const student = response.student;

        // Store additional data in session
        sessionStorage.setItem('studentProfile', JSON.stringify(student));

        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Login successful',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });

        // Small delay to show success message
        setTimeout(async () => {
          try {
            const studentID = student.StudentID;
            const profileData = await this.fetchProfile(studentID);
            const studentRole = profileData.role;

            // Navigate based on role
            if (studentRole === 'admin') {
              this.router.navigate(['/home/admin-Dashboard'], { 
                state: { profile: profileData } 
              });
            } else {
              this.router.navigate(['/home/dashboard'], { 
                state: { profile: profileData } 
              });
            }

          } catch (profileError) {
            console.error('Profile loading error:', profileError);
            Swal.fire({ 
              icon: 'error', 
              title: 'Profile Error', 
              text: 'Could not load profile data.', 
              timer: 3000 
            });
            // Still navigate to dashboard even if profile fetch fails
            this.router.navigate(['/home/dashboard']);
          }
        }, 2000);

      } else {
        // Login failed
        this.errorMessage = response.message || 'Wrong student ID or password';
        Swal.fire({
          toast: true,
          icon: 'error',
          title: this.errorMessage,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        this.isLoading = false;
      }

    } catch (err: any) {
      console.error('Authentication Error:', err);
      
      // Handle specific HTTP errors
      if (err.status === 401) {
        this.errorMessage = 'Invalid credentials';
      } else if (err.status === 403) {
        this.errorMessage = 'Your account is inactive. Please contact admin.';
      } else if (err.status === 429) {
        this.errorMessage = 'Too many login attempts. Please try again after 15 minutes.';
      } else {
        this.errorMessage = err.error?.message || 'Server error, please try again later.';
      }

      Swal.fire({
        toast: true,
        icon: 'error',
        title: this.errorMessage,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      
      this.isLoading = false;
    }
  }

  private async fetchProfile(studentId: string): Promise<IStudentProfileDTO> {
    try {
      const profile = await firstValueFrom(
        this.authService.getProfile(studentId)
      );

      if (!profile || !profile.data) {
        throw new Error('Profile data is null or undefined');
      }

      // Use the data field from API response
      const profileData = profile.data || profile;

      // Store role and ID separately
      sessionStorage.setItem('studentRole', JSON.stringify(profileData.role || profileData.Role));
      sessionStorage.setItem('studentID', JSON.stringify(profileData._id || profileData.StudentID));

      return this.mapToDTO(profileData);

    } catch (err: any) {
      const errorMessage = err.error?.message || 'Error fetching profile';
      console.error('Profile Fetching Failed:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  private mapToDTO(profile: any): IStudentProfileDTO {
    return {
      studentId: profile.StudentID || profile._id,
      role: profile.role || profile.Role,
      loginID: profile.LoginID || profile.loginID,
      fullName: `${profile.FirstName || profile.firstName} ${profile.LastName || profile.lastName}`.trim(),
      firstName: profile.FirstName || profile.firstName,
      lastName: profile.LastName || profile.lastName,
      email: profile.Email || profile.email,
      mobileNo: profile.MobileNo || profile.mobileNo,
      phone: profile.MobileNo || profile.mobileNo,
      dob: profile.DOB || profile.dob,
      gender: profile.Gender || profile.gender,
      address: profile.Address || profile.address,
      state: profile.State || profile.state,
      city: profile.City || `${profile.Address || profile.address}, ${profile.State || profile.state}`,
      profilePicture: profile.ProfilePicture || profile.profilePicture,
      resume: profile.Resume || profile.resume,
      objectiveOfCourse: profile.ObjectiveOfCourse || profile.objectiveOfCourse,
      occupation: profile.Occupation || profile.occupation,
      companyName: profile.CompanyName || profile.companyName,
      designation: profile.Designation || profile.designation,
      registrationDate: profile.RegistrationDate || profile.createdAt,
      status: profile.Status !== undefined ? profile.Status : profile.status,
      enrollId: profile.EnrollID || profile.EnrollmentID || profile.enrollID || null,
      courseCode: profile.CourseCode || profile.courseCode || null,
      batchCode: profile.BatchCode || profile.batchCode || null,
      batchTiming: profile.BatchTiming || profile.batchTiming || null
    };
  }
}