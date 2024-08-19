import React from "react";

interface GirdItemProps {
  title: string;
  children: React.ReactNode;
  desc: string;
}

export const GirdItem: React.FC<GirdItemProps> = ({
  title,
  children,
  desc,
}) => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <p className="text-2xl font-medium capitalize">{title}</p>
      <p className="text-sm font-thin">{desc}</p>
      <div className="bg-base-200 p-8 rounded-3xl shadow-md h-[530px]">
        {children}
      </div>
    </div>
  );
};
