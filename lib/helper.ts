import { ApplicationInterface, ApplicationStatus } from "@/interfaces";

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

// Helper function which will take in the 'appData' and extract the month,
// then it will use the month as a reference and create a new object that contains the month and count.
export const placeholderMonths = (
  appData: { month: string; count: number }[]
) => {
  // Extract the month to use as a reference from the first element of appData
  const referenceMonth = appData[0]?.month;

  // List of all possible months
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Find the index of the reference month in the allMonths array
  const referenceIndex = allMonths.indexOf(referenceMonth);

  // Create a new array that contains the months starting from the reference month
  const monthsFromReference = allMonths.slice(referenceIndex);

  // Create a new object array that contains the month and the count (default to 0 if the month is not in appData)
  const filledData = monthsFromReference.map((month) => {
    const existingData = appData.find((d) => d.month === month);
    return existingData ? existingData : { month, count: 0 };
  });

  return filledData;
};

// Helper function to calulate the average of the status relative to the total applications submitted
export const getStatusAverage = (
  applications: ApplicationInterface[],
  statusOfApp: ApplicationStatus
): number => {
  const totalApplications = applications.length;

  // Filter the applications by the desired status
  const matchingApplications = applications.filter(
    (app) => app.status.toLowerCase() === statusOfApp.toLowerCase()
  );

  // Calculate the percentage of the matching status
  const average = (matchingApplications.length / totalApplications) * 100;

  // Round to two decimal places
  return parseFloat(average.toFixed(1));
};
