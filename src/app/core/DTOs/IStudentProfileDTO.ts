export interface IStudentProfileDTO {
  _id?:any;
  studentId: any; 
  role?:any;
  loginID: string;
  fullName: string; 
  firstName?: string; 
  lastName?: string; 
  email: string;
  mobileNo?: string;
  phone?: string; 
  dob?: string; 
  gender?: string;
  address?: string;
  state?: string;
  city?: string; 
  profilePicture?: string | null;
  resume?: string | null;
  objectiveOfCourse?: string;
  occupation?: string;
  companyName?: string;
  designation?: string;
  registrationDate?: string;
  status?: boolean;

  // Enrollment / course info
  enrollId?: string;
  courseCode?: string;
  batchCode?: string;
  batchTiming?: string;
}