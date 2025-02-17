import { Comment } from './comment';


export interface User {
  id: string;
  disabled?: boolean;
  name: string;
  userType: "tutor" | "student" | "admin";
  gender: "male" | "female" | "other";
  email: string;
  areaOfInterest: ("coding" | "sports" | "arts")[];
  experience: number;
  password: string;
  imageUrl: string;
  courses?: UserCourse[];
  messages?: Comment[];
}

export interface UserCourse {
  id: string;
  date?: number;
  expiry?: number;
  completion?: number;
}
