export interface ContactMessage {
  id?: string;
  senderID?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  severity: "Low" | "Medium" | "High";
  type: "General Inquiry" | "Support" | "Feedback";
  createdAt?: Date;
}
