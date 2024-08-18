import { Schema } from "mongoose";
import { ApplicationStatus, ApplicationInterface } from "@/interfaces";

// Create the application schema
export const applicationSchema = new Schema<ApplicationInterface>(
  {
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
  },
  { timestamps: true }
);
