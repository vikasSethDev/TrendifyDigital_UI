export interface StudentAccessDTO {
  _id?: string;
  studentId: string;
  sectionId: number;
  accessGranted: boolean;
  grantedBy?: string;
  grantedAt?: Date;
}
