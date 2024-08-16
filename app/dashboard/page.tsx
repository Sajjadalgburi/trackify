"use client";

import { useEffect, useState } from "react";
import { ApplicationInterface } from "@/interfaces";
import { useSession } from "next-auth/react";
import CardElement from "@/components/CardElement";
import BottomNav from "@/components/BottomNav";
import { filterByStatus } from "@/lib/helper";

const Page = () => {
  // allow the use state to accept the ApplicationInterface
  const [application, setApplication] = useState<ApplicationInterface[]>([]);

  // grabbing the user id from the session and then passing it as a header to the fetch request to get the applications of that user
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // useffect to fetch applications from /api/applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // fetching the applications from the api and passing the user id as a header authorization
        const response = await fetch("/api/application", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });

        // if the response is not ok, throw an error
        if (!response.ok) {
          throw new Error("An error occurred while fetching applications");
        }

        // json the response and set the application state
        const data = await response.json();
        setApplication(data);
      } catch (error) {
        console.error("An error occurred during fetching applications:", error);
      }
    };

    fetchApplications();
  }, [userId]);

  // filter the applications based on the status and pass each status to the appropriate card
  return (
    <div className="relative">
      <div className="flex justify-between items-start">
        <CardElement
          application={filterByStatus(application, "offer")}
          type="offer"
        />
        <CardElement
          application={filterByStatus(application, "applied")}
          type="applied"
        />
        <CardElement
          application={filterByStatus(application, "interview")}
          type="interview"
        />
        <CardElement
          application={filterByStatus(application, "rejected")}
          type="rejected"
        />
        <CardElement
          application={filterByStatus(application, "pending")}
          type="pending"
        />
      </div>

      <BottomNav />
    </div>
  );
};

export default Page;
