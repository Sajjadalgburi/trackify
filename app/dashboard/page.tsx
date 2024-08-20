"use client";

import { useEffect, useState } from "react";
import { ApplicationInterface } from "@/interfaces";
import { useSession } from "next-auth/react";
import CardElement from "@/components/CardElement";
import { filterByStatus } from "@/lib/helper";
import DashboardLayout from "./DashboardLayout";

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
        // gracefully handle the case where the user id is not available. this will prevent the backend from throwing an error when trying to fetch applications
        if (!userId) return;

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

  const handleDelete = async (id: string) => {
    try {
      if (!userId) return;

      const hasConfirmed = confirm(
        "Are you sure you want to delete this application?"
      );

      if (!hasConfirmed) return;

      // delete the application from the database
      const response = await fetch(`/api/application/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      // if the response is not ok, throw an error
      if (!response.ok) {
        throw new Error("An error occurred while deleting the application");
      }
      // filter the application state and remove the deleted application
      setApplication((prevState) => prevState.filter((app) => app._id !== id));
    } catch (error) {
      console.error(
        "An error occurred during deleting the application:",
        error
      );
    }
  };

  // filter the applications based on the status and pass each status to the appropriate card
  return (
    <DashboardLayout>
      <div className="flex justify-between items-start">
        <CardElement
          application={filterByStatus(application, "offer")}
          type="offer"
          handleDelete={handleDelete}
        />
        <CardElement
          application={filterByStatus(application, "applied")}
          type="applied"
          handleDelete={handleDelete}
        />
        <CardElement
          application={filterByStatus(application, "interview")}
          type="interview"
          handleDelete={handleDelete}
        />
        <CardElement
          application={filterByStatus(application, "rejected")}
          type="rejected"
          handleDelete={handleDelete}
        />
        <CardElement
          application={filterByStatus(application, "pending")}
          type="pending"
          handleDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Page;
