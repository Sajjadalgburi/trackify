import React from "react";
import { ApplicationInterface } from "@/interfaces";
import Card from "./Card";
import StatusButton from "./StatusButton";

interface CardElementProps {
  type: string;
  application: ApplicationInterface[];
}

const CardElement: React.FC<CardElementProps> = ({ type, application }) => {
  return (
    <div className="bg-base-200 w-full border-base-300 border-r sm:w-1/3 p-6">
      {/* Title Box */}
      <div className="text-center">
        <h2 className="text-5xl tracking-wide capitalize font-semibold my-4 text-base-content">
          {type}
        </h2>

        {/* this will change based on the length of saved application within the card itself */}
        <p className="text-base-content mb-8 uppercase text-sm opacity-70">
          {application.length} jobs
        </p>

        <StatusButton type={type} />
      </div>

      {/* Iterate through the application and display cards */}
      {/* also modularized the code to enhance code readability and follow DRY principles */}
      <Card applicationArray={application} />
    </div>
  );
};

export default CardElement;
