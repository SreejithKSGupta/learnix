export interface Users {
  id: String;
  disabled?:String; // true or false
  name: string;
  usertype: string; // tutor, student or admin
  gender: string; // male , female or other
  email: string;
  areaOfInterest: string[]; // can be coding , sports or arts
  experience:number; // can b a number ranging from 0-20
  password: string;
  imageURL?:String;
  courses?: UserCourses[];
  messages?:Messages[];
}

export interface UserCourses {
  id: String;
  date?: number;
  expiry?:number;
  completion?:number
}

export interface Messages {
  id: String;
  senderID:String;
  utype:String;
  message:String;
  urgency:String;
}

