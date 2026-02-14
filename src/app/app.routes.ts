import { Routes } from '@angular/router';
import { HomePage } from './features/home/Component/HomePage/HomePage';
import { LoginPage } from './features/auth/Component/LoginPage/LoginPage';
import { SignupPage } from './features/auth/Component/SignupPage/SignupPage';
import { Dashbord } from './features/home/Component/Dashbord/Dashbord';
import { MyCourse } from './features/home/Component/MyCourse/MyCourse';
import { ViewModule } from './features/home/Component/ViewModule/ViewModule';
import { MyProfile } from './features/home/Component/MyProfile/MyProfile';
import { ManageStudent } from './features/admin/component/ManageStudent/ManageStudent';
import { AdminDashboardComponent } from './features/admin/component/AdminDashboard/AdminDashboard';
import { StudentPaymentComponent } from './features/admin/component/StudentPaymentComponent/StudentPaymentComponent';
import { StudentCourseAccess } from './features/admin/component/StudentCourseAccess/StudentCourseAccess';
import { ManageCourse } from './features/admin/component/manage-course/manage-course';
import { UnauthorizedComponent } from './features/shared/unauthorized/unauthorized.component';

// ✅ Import Guards
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // ========================================
  // PUBLIC ROUTES (No Authentication)
  // ========================================
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  { path: 'unauthorized', component: UnauthorizedComponent },

  // ========================================
  // PROTECTED ROUTES (Require Authentication)
  // ========================================
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGuard], // ✅ Protect entire home section
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      // Student routes
      { path: 'dashboard', component: Dashbord },
      { path: 'myCource', component: MyCourse },
      { path: 'view-module', component: ViewModule },
      { path: 'my-Profile', component: MyProfile },
      
      // Admin routes (require admin role)
      { 
        path: 'admin-Dashboard', 
        component: AdminDashboardComponent,
        canActivate: [AdminGuard] // ✅ Admin only
      },
      { 
        path: 'manageStudent', 
        component: ManageStudent,
        canActivate: [AdminGuard] // ✅ Admin only
      },
      { 
        path: 'student-payment/:studentId', 
        component: StudentPaymentComponent,
        canActivate: [AdminGuard] // ✅ Admin only
      },
      { 
        path: 'student-access/:studentId', 
        component: StudentCourseAccess,
        canActivate: [AdminGuard] // ✅ Admin only
      },
      { 
        path: 'Manage-Cource', 
        component: ManageCourse,
        canActivate: [AdminGuard] // ✅ Admin only
      },
    ]
  },

  // Catch-all redirect
  { path: '**', redirectTo: 'login' }
];