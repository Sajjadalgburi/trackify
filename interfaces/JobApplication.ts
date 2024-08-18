import { Document } from "mongoose";

// Define the application status enum
export enum ApplicationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  OFFER = "offer",
  APPLIED = "applied",
  INTERVIEW = "interview",
}

// Define the application interface to also extend the Document interface from Mongoose so that typescript can recognize it as a Mongoose document
export interface ApplicationInterface extends Document {
  position: string;
  status: ApplicationStatus;
  date?: string;
  company: string;
  note?: string;
  url?: string;
  logo?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}
