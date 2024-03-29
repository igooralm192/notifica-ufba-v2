import { IUserType } from "../entities";

export interface IDisciplineGroupMemberDTO {
  userId: string;
  userName: string;
  userType: IUserType;
  studentId?: string
  teacherId?: string
}
