export interface Comment {
  id: string;
  senderId: string;
  senderName:string;
  senderType:string
  recieverType: string;
  recieverName:String;
  recieverId: string;
  message: string;
  timestamp: Date;
  urgency: "Low" | "Medium" | "High";
  status: "pending" | "approved"|"removed";
}
