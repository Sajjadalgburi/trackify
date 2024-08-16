import React from "react";
import Image from "next/image"; // Make sure to import the Image component

import { ApplicationInterface } from "@/interfaces";

interface CardProps {
  applicationArray: ApplicationInterface[];
}

const Card: React.FC<CardProps> = ({ applicationArray }) => {
  return (
    <div className="flex flex-col gap-y-10 mt-[3rem]">
      {applicationArray.map((app) => (
        <div className="rounded bg-base-100 p-4 w-full border border-base-300">
          <div key={app.id} className="flex items-start">
            <div className="bg-white h-[100px] w-1"></div>
            <div className="p-2">
              <h2 className="text-xl text-base-content font-medium">
                {app.company}
              </h2>
              <div className="flex items-center justify-start mt-2">
                <Image
                  alt="logo"
                  src={app.logo || "/job_placeholder.svg"}
                  className="mr-4"
                  width={30}
                  height={30}
                />
                <p className="text-sm text-base-content opacity-70">
                  {app.position}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
