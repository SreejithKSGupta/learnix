import { Comment } from "./comment";

export interface Course {
  id: string;
  courseName: string;
  tutor: string;
  tutorid:String;
  duration: number;
  description: string;
  importantTechnologiesUsed: string[];
  courseFee: number;
  credits: 1 | 2 | 3 | 4 | 5;
  imageUrl: string | null;
  numberOfEnrolledPeople?: number;
  content:any;
  totalStars: number;
  feedback: Feedback[];
  comments: Comment[];
  disabled: boolean;
  dateCreated: Date;
  dateUpdated: Date,
  isApproved: Boolean,
  isRejected: Boolean,
  rejectionReason: string,
}

export interface Feedback {
  id: string;
  userId: string;
  username: string;
  comment: string;
  date: Date;
  likes: number;
  dislikes: number;
}


