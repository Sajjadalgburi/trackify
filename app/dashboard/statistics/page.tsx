"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "../DashboardLayout";
import { ApplicationInterface, ApplicationStatus } from "@/interfaces";
import { GirdItem } from "@/components/GridItem";
import LineChart from "@/components/LineChart";
import { convertIntoDate, getStatusAverage } from "@/lib/helper";
import PieChartComp from "@/components/PieChartComp";

const Page = () => {
  const [application, setApplication] = useState<ApplicationInterface[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!userId) return;

        const response = await fetch("/api/application", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });

        if (!response.ok) {
          throw new Error("An error occurred while fetching applications");
        }

        const data = await response.json();
        setApplication(data);
      } catch (error) {
        console.error("An error occurred during fetching applications:", error);
      }
    };

    fetchApplications();
  }, [userId]);

  // map through the application and get the date in string format such as "2021-09-01"
  const getDatesFromApplication = application.map(
    (app) => app?.createdAt as string
  );

  // use the helper function to iterate through each date and increment the month apperance => 'aug': 2, 'sep':1, 'oct': 14
  const applicationCountByMonth = convertIntoDate(getDatesFromApplication);

  // Convert the Map into an array of objects for the LineChart
  const chartData = Array.from(applicationCountByMonth, ([month, count]) => ({
    month,
    count,
  }));

  // application data for the pieChart
  const applicationData = [
    {
      statusName: "offer",
      value: getStatusAverage(application, "offer" as ApplicationStatus),
    },
    {
      statusName: "applied",
      value: getStatusAverage(application, "applied" as ApplicationStatus),
    },
    {
      statusName: "rejected",
      value: getStatusAverage(application, "rejected" as ApplicationStatus),
    },
    {
      statusName: "pending",
      value: getStatusAverage(application, "pending" as ApplicationStatus),
    },
    {
      statusName: "interview",
      value: getStatusAverage(application, "interview" as ApplicationStatus),
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[85%] mx-auto pt-20">
        <div className="text-left ml-[8rem]">
          <h1 className="text-3xl md:text-6xl font-bold">
            Welcome to Statistics
          </h1>
          {/* p tag to explain the purpose */}
          <p className="text-md mt-4">
            Here you can see the statistics of your applications
          </p>
        </div>

        {/* grid items which will display the charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[7rem]">
          <GirdItem
            desc="Your application statistics over time i.e how many applications you have submitted in each month"
            title="Total Applications"
          >
            <LineChart appData={chartData} />
          </GirdItem>
          <GirdItem
            desc="Visual breakdown of your job applications, categorized by their current status."
            title="Application Status Distribution"
          >
            <PieChartComp appData={applicationData} />
          </GirdItem>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
