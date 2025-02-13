export interface Comment {
  id: string;
  userName:String;
  senderId: string;
  userType: string;
  message: string;
  timestamp: Date;
  urgency: "Low" | "Medium" | "High";
  status: "pending" | "approved"|"removed";
}
