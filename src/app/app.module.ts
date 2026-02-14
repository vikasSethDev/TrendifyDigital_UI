import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';
import { LoginPage } from './features/auth/Component/LoginPage/LoginPage';
import { HomePage } from './features/home/Component/HomePage/HomePage';
import { SignupPage } from './features/auth/Component/SignupPage/SignupPage';
import { Dashbord } from './features/home/Component/Dashbord/Dashbord';
import { MyCourse } from './features/home/Component/MyCourse/MyCourse';
import { ViewModule } from './features/home/Component/ViewModule/ViewModule';
import { MyProfile } from './features/home/Component/MyProfile/MyProfile';
import { ManageStudent } from './features/admin/component/ManageStudent/ManageStudent';
import { StudentPaymentComponent } from './features/admin/component/StudentPaymentComponent/StudentPaymentComponent';
import { StudentCourseAccess } from './features/admin/component/StudentCourseAccess/StudentCourseAccess';
import { ManageCourse } from './features/admin/component/manage-course/manage-course';
import { AdminDashboardComponent } from './features/admin/component/AdminDashboard/AdminDashboard';
import { UnauthorizedComponent } from './features/shared/unauthorized/unauthorized.component';

import { routes } from './app.routes';

// ✅ Import the HTTP Interceptor
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

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
    StudentPaymentComponent,
    StudentCourseAccess,
    ManageCourse,
    AdminDashboardComponent,
    UnauthorizedComponent
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
  providers: [
    // ✅ Register HTTP Interceptor to automatically add JWT token to all requests
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }