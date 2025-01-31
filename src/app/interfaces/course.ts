export interface Course {
  id?: string;
  courseName: string;
  tutor: string;
  duration: number; // can be from 0-12 weeks
  description: string;
  importantTechnologiesUsed: string[]; // array of any set of strings
  courseFee: string; // 0-500
  credits: number; // 1-5
  imageUrl?:String;
  numberOfEnrolledPeople?: number;
  totalStars?: number;
  feedback?:feedback[];
  comments?:Comments[];
  disabled?:String;
  datecreated?:Date;
}

interface feedback{
  id: String;
  userid:String;
  username:String;
  comment:String;
  date: Date;
  likes:number;
  dislikes:Number
}

 interface Comments {
  id: String;
  senderID:String;
  utype:String;
  Message:String;
  urgency:String;
}
