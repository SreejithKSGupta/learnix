export interface Comment {
  id: string;
  senderId: string;
  senderName:string;
  senderType:string;
  senderImg:String;
  recieverType: string;
  recieverName:String;
  recieverId: string;
  deleted?:boolean;
  read?:boolean;
  message: string;
  timestamp: Date;
  urgency: "Low" | "Medium" | "High";
  status: "pending" | "approved"|"removed";
}
