import { Schema, model, models, Document } from "mongoose";

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
}

// Create the application schema
const applicationSchema = new Schema<ApplicationInterface>({
  position: {
    type: String,
    required: [true, "Position is required"],
  },

  // Use the enum values for the status field
  status: {
    type: String,
    enum: Object.values(ApplicationStatus),
    default: ApplicationStatus.APPLIED,
    required: [true, "Status is required"],
  },
  date: {
    type: String,
    default: Date.now,
    required: [false, "Date is required"],
  },
  company: {
    type: String,
    required: [true, "Company is required"],
  },
  note: {
    type: String,
  },
  url: {
    type: String,
  },
  logo: {
    type: String,
  },
  location: {
    type: String,
  },
});

export const ApplicationModel =
  models.ApplicationModel ||
  model<ApplicationInterface>("ApplicationModel", applicationSchema);
