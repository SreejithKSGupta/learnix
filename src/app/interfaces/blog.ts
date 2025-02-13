import { Comment } from "./comment";

export interface Blog {
  id?: number;
  title: string;
  author: string;
  content: any;
  imageURL: string;
  date: string;
  post:string;
  description:any;
  topic:string;
  comments:Comment[];
}
