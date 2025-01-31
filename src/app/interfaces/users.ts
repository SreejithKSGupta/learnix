export interface User {
  id: string;
  disabled?: boolean; // Changed from string to boolean for easier checking
  name: string;
  userType: "tutor" | "student" | "admin"; // Restricted to valid user types
  gender: "male" | "female" | "other"; // Restricted to valid gender options
  email: string;
  areaOfInterest: ("coding" | "sports" | "arts")[]; // Restricted to valid interests
  experience: number; // 0-20
  password: string;
  imageUrl?: string; // Fixed casing for consistency
  courses?: UserCourse[]; // Fixed naming consistency
  messages?: Message[]; // Fixed naming consistency
}

export interface UserCourse {
  id: string;
  date?: number; // Optional field for course start date
  expiry?: number; // Optional field for course expiry date
  completion?: number; // Completion percentage (0-100)
}

export interface Message {
  id: string;
  senderId: string; // Changed `senderID` to camelCase for consistency
  userType: string; // `userType` is a more clear name than `utype`
  message: string;
  urgency: "Low" | "Medium" | "High"; // Restricting urgency to valid values
}
