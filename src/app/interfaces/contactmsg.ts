export interface ContactMessage {
  id?: string;
  senderID?:String;
  name: string;
  phone: string;
  message: string;
  severity: string;
  type: string;
  email: string;
}
