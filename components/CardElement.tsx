import React from "react";
import Image from "next/image";

import { ApplicationInterface } from "@/interfaces";

interface CardElementProps {
  type: string;
  application: ApplicationInterface[];
}

const CardElement: React.FC<CardElementProps> = ({ type, application }) => {
  return (
    <div className="bg-base-200 w-full border-base-300 min-h-screen border-r sm:w-1/3 p-6">
      {/* Title Box */}
      <div className="text-center">
        <h2 className="text-5xl tracking-wide capitalize font-semibold my-4 text-base-content">
          {type}
        </h2>

        {/* this will change based on the lenght of saved application within the card itself */}
        <p className="text-base-content mb-8 uppercase text-sm opacity-70">
          {application.length} jobs
        </p>
        <button className="btn btn-block btn-square btn-secondary font-extralight text-2xl text-white">
          +
        </button>
      </div>

      <div className="flex rounded bg-base-100 p-4 mt-10 w-full border border-base-300">
        {
          // iterate through the application and display card
        }
        {application.map((app, i) => (
          <div key={i}>
            <div className="bg-primary mr-4 w-1 rounded-sm" />
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
        ))}
      </div>
    </div>
  );
};

export default CardElement;
