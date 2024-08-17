import React from "react";
import Image from "next/image"; // Make sure to import the Image component
import Link from "next/link";

import { ApplicationInterface } from "@/interfaces";

interface CardProps {
  applicationArray: ApplicationInterface[];
}

import { dateDiffInDays } from "@/lib/helper";

const Card: React.FC<CardProps> = ({ applicationArray }) => {
  return (
    <div className="flex flex-col gap-y-10 mt-[3rem]">
      {applicationArray.map((app) => (
        <Link
          key={app._id as string}
          href={`/dashboard/edit-application?id=${app._id as string}`}
        >
          <div className="relative rounded-xl hover:border-secondary hover:border-solid transition-all cursor-pointer bg-slate-100 p-2 w-full border-2 border-base-300">
            <div className="flex text-black items-start">
              <div className="bg-secondary rounded-md h-[80px] w-1"></div>
              <div className="p-2">
                <h2 className="text-lg font-medium">{app.company}</h2>
                <div className="flex items-center justify-start mt-2">
                  <Image
                    alt="logo"
                    src={app.logo || "/job_placeholder.svg"}
                    className="mr-4"
                    width={30}
                    height={30}
                  />
                  <p className="text-sm opacity-70">{app.position}</p>
                </div>
                <p className="absolute bottom-0 right-0 text-sm p-2 text-gray-500">
                  {dateDiffInDays(app.date as string, "any status")}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
