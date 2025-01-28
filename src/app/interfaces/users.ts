export interface Users {
  id: number;
  name: string;
  usertype: string;
  gender: string;
  email: string;
  areaOfInterest: string;
  experience:number;
  password: string;
  courses?: UserCourses[];
  messages?:Messages[];
}

export interface UserCourses {
  id: string;
  date: Date;
  expiry:Date;
}

export interface Messages {
  id: String;
  senderID:String;
  utype:String;
  Message:String;
  urgency:String;
}
