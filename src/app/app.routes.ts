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
// import { StudentCourseAccess } from './features/admin/component/StudentCourseAccess/studentcourseaccess';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  {
    path: 'home',
    component: HomePage,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashbord },
      { path: 'myCource', component: MyCourse },
      { path: 'view-module', component: ViewModule },
      { path: 'my-Profile', component: MyProfile },
      { path: 'manageStudent', component: ManageStudent },
      { path: 'student-payment/:studentId', component: StudentPaymentComponent },
      { path: 'student-access/:studentId', component: StudentCourseAccess },
      { path: 'Manage-Cource', component: ManageCourse },
      { path: 'admin-Dashboard', component: AdminDashboardComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];




