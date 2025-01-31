export interface ContactMessage {
  id?: string;
  senderID?:String; // can be subscribed (has sender ID), or Not.
  name: string;
  phone: string;
  message: string;
  severity: string; // can be low, medium, high
  type: string; // can be general enquery, support or feedback
  email: string;
}
