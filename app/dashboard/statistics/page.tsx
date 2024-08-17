"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "../DashboardLayout";
import { ApplicationInterface } from "@/interfaces";

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

  console.log(application);

  return (
    <DashboardLayout>
      <div>
        <h1>Welcome to Statistics</h1>
      </div>
    </DashboardLayout>
  );
};

export default Page;
