import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginPage } from './features/auth/Component/LoginPage/LoginPage';
import { HomePage } from './features/home/Component/HomePage/HomePage';

import { routes } from './app.routes'; // or wherever your routes file is
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dashbord } from './features/home/Component/Dashbord/Dashbord';
import { MyCourse } from './features/home/Component/MyCourse/MyCourse';
import { ViewModule } from './features/home/Component/ViewModule/ViewModule';
import { MyProfile } from './features/home/Component/MyProfile/MyProfile';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignupPage } from './features/auth/Component/SignupPage/SignupPage';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Admindashboard } from './features/admin/component/AdminDashboard/AdminDashboard';
import { ManageStudent } from './features/admin/component/ManageStudent/ManageStudent';
import { StudentPaymentComponent } from './features/admin/component/StudentPaymentComponent/StudentPaymentComponent';
import { StudentCourseAccess } from './features/admin/component/StudentCourseAccess/StudentCourseAccess';
import { ManageCourse } from './features/admin/component/manage-course/manage-course';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    HomePage,
    Dashbord,
    MyCourse,
    ViewModule,
    MyProfile,
    SignupPage,
    ManageStudent,
    Admindashboard,
    StudentPaymentComponent,
    StudentCourseAccess,
    ManageCourse
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
