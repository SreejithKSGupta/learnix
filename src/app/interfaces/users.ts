export interface Users {
  id: String;
  disabled?:String;
  name: string;
  usertype: string;
  gender: string;
  email: string;
  areaOfInterest: string;
  experience:number;
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

