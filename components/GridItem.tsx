import React from "react";

interface GirdItemProps {
  title: string;
  children: React.ReactNode;
}

export const GirdItem: React.FC<GirdItemProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col justify-center">
      <p className="text-3xl lowercase">{title}</p>
      <div className="bg-base-200 p-8 rounded-3xl shadow-md h-[530px]">
        {children}
      </div>
    </div>
  );
};
