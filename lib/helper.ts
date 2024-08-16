import { ApplicationInterface } from "@/interfaces";

// helper function to filter array of objects by status
export const filterByStatus = (arr: ApplicationInterface[], status: string) => {
  // returning the array of objects that match the status
  return arr.filter((app) => app.status === status);
};
