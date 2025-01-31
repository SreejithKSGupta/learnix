export interface Course {
  id?: string;
  courseName: string;
  tutor: string;
  duration: number; // 0-12 weeks
  description: string;
  importantTechnologiesUsed: string[]; // List of key technologies used
  courseFee: number; // Changed from string to number (ensures valid fee range)
  credits: 1 | 2 | 3 | 4 | 5; // Restricting values to a valid range
  imageUrl?: string;
  numberOfEnrolledPeople?: number;
  totalStars?: number; // Used for average rating
  feedback?: Feedback[]; // Fixed casing for consistency
  comments?: Comment[]; // Fixed casing for consistency
  disabled?: boolean; // Changed from `String` to `boolean`
  dateCreated?: Date;
}

export interface Feedback {
  id: string;
  userId: string; // Changed casing to match standard camelCase
  username: string;
  comment: string;
  date: Date;
  likes: number;
  dislikes: number;
}

export interface Comment {
  id: string;
  senderId: string; // Changed casing for consistency
  userType: string; // Renamed `utype` to `userType` for clarity
  message: string; // Fixed casing (Message -> message)
  urgency: "Low" | "Medium" | "High"; // Restricted to valid values
}
