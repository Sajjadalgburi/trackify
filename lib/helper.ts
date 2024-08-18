import { ApplicationInterface } from "@/interfaces";

// helper function to filter array of objects by status
export const filterByStatus = (arr: ApplicationInterface[], status: string) => {
  // returning the array of objects that match the status
  return arr.filter((app) => app.status === status);
};

// helper function to find the difference between two dates
// takes in javascript date objects and returns the difference in days (integer)
export const dateDiffInDays = (
  applicationDate: string,
  status: string
): string => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const currentDate = new Date();

  const targetedDate = new Date(applicationDate as string); // the passed date will be a string format like "2021-09-01"

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const utc2 = Date.UTC(
    targetedDate.getFullYear(),
    targetedDate.getMonth(),
    targetedDate.getDate()
  );

  const diffInDays = Math.floor((utc2 - utc1) / _MS_PER_DAY);

  // Handle edge cases based on status
  if (status.toLowerCase() === "interview") {
    if (diffInDays === 0) {
      return "Today"; // Interview is today
    } else if (diffInDays > 0) {
      return `In ${diffInDays} days`; // Interview is in the future
    } else {
      return `${Math.abs(diffInDays)} days ago`; // Interview was in the past (this may be rare)
    }
  } else {
    if (diffInDays === 0) {
      return "Today"; // Application was submitted today
    } else if (diffInDays > 0) {
      return `In ${diffInDays} days`; // This case may not occur for non-Interview statuses
    } else {
      return `${Math.abs(diffInDays)} days ago`; // Application was submitted in the past
    }
  }
};

// Helper function to convert dates into a hashmap of months and counts
export const convertIntoDate = (dates: string[]) => {
  const hashmap = new Map<string, number>();

  // iterate over the dates array and convert them into months which is passsed from application object as a string
  dates.forEach((d) => {
    const month = new Date(d).toLocaleDateString("en-US", {
      month: "short",
    });

    // handled edge case where hashmap already has the month, in that case increment the count
    // else, if the month is not present in the hashmap, add it with a count of 1
    if (hashmap.has(month)) {
      hashmap.set(month, hashmap.get(month)! + 1);
    } else {
      hashmap.set(month, 1);
    }
  });

  // return the hashmap
  return hashmap;
};
