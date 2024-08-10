"use client";

// this is the mobile navigation component which accepts the toggle state and the function to handle the toggle change

import React from "react";
import { navbarItems } from "@/data";
import Link from "next/link";

// props for the mobile navigation component
interface MobileNavigationProps {
  handleToggleChange: () => void;
  toggle: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  handleToggleChange,
  toggle,
}) => {
  return (
    <>
      {/* mobile navigation */}
      <div className="md:hidden flex relative">
        <label className="btn btn-circle swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input onClick={handleToggleChange} type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
        {toggle && (
          <div className="absolute top-16 right-0 bg-neutral px-[3.3rem] py-6 shadow-2xl rounded-md">
            <ul className="md:hidden flex flex-col justify-center items-center gap-4">
              {navbarItems.map((item, index) => (
                <Link href={item.url} key={index}>
                  <li className="hover:underline text-[#fff] text-xl md:text-sm md:text-gray-500 transition-all duration-1000">
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileNavigation;
