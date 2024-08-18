"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "../DashboardLayout";
import { ApplicationInterface } from "@/interfaces";
import { GirdItem } from "@/components/GridItem";
import LineChart from "@/components/LineChart";
import { convertIntoDate } from "@/lib/helper";

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
          <GirdItem title="Total Applications">
            <LineChart appData={chartData} />
          </GirdItem>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
