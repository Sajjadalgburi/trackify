import { Schema, model, models, Document } from "mongoose";

// Define the application status enum
enum ApplicationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

// Define the application interface to also extend the Document interface from Mongoose so that typescript can recognize it as a Mongoose document
interface ApplicationInterface extends Document {
  position: string;
  status: ApplicationStatus;
  date: Date;
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
    default: ApplicationStatus.PENDING,
    required: [true, "Status is required"],
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Date is required"],
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

export const Application =
  models.Application ||
  model<ApplicationInterface>("Application", applicationSchema);
