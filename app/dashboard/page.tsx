"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApplicationInterface } from "@/interfaces";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { GoBackBtn } from "@/components/GoBackBtn";

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

  return (
    <div className="p-3">
      <div>
        <GoBackBtn />
        <h1 className="text-7xl font-bold mt-10 text-center">Applications</h1>
        <br />
        {/* display btn to "Track +" a new application which will redirect the user to /create/new? */}

        <div className="flex justify-end mr-10">
          <Link href="/dashboard/create-application">
            {" "}
            <button className="btn btn-primary px-8">Create Application</button>
          </Link>
        </div>

        <br />
        <ul>
          <div className="flex gap-8 flex-wrap">
            {application.map((item, i) => (
              // interating through the applications and displaying them
              <div key={i} className="card bg-base-100 w-96 shadow-2xl">
                <div className="card-body">
                  <div className="flex items-center">
                    <Image
                      alt={item?.logo as string}
                      width={30}
                      height={30}
                      src={"/placeholder_img.png"}
                      className="mr-4"
                    />
                    <h2 className="card-title">{item.company}</h2>
                  </div>
                  <p>
                    <strong>Position:</strong> {item?.position}
                  </p>
                  <p>
                    <strong>Date:</strong> {item?.date}
                  </p>
                  <p>
                    <strong>Location:</strong> {item?.location}
                  </p>
                  <p>
                    <strong>Note:</strong> {item?.note}
                  </p>
                  <p>
                    <strong>Status:</strong> {item?.status}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <a
                      href={item?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.url}
                    </a>
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">More Info</button>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Page;
