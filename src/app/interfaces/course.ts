export interface Course {
  id?: string;
  courseName: string;
  tutor: string;
  duration: number;
  description: string;
  importantTechnologiesUsed: string[];
  courseFee: string;
  credits: number;
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
