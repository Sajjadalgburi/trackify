"use client";

import { navbarItems } from "@/data";
import Link from "next/link";
import { useState } from "react";
import MobileNavigation from "./MobileNavigation";

const Navbar = () => {
  // usestate to toggle the mobile navigation
  const [toggle, setToggle] = useState(false);

  // function to handle the toggle change
  const handleToggleChange = () => {
    setToggle((prev) => !prev);
  };

  return (
    <header className="max-w-7xl mx-auto px-10 py-3  ">
      <nav className="flex justify-between items-center capitalize">
        {/*  */}
        <div className="flex justify-center items-center gap-3">
          <h1 className="text-3xl font-bold md:mr-6">Trackify</h1>
          {/* Desktop Navigation */}{" "}
          <ul className="md:flex hidden justify-center items-center gap-4">
            {navbarItems.map((item, index) => (
              <Link href={item.url} key={index}>
                <li className="hover:underline text-gray-500 transition-all duration-1000">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
          {/* This below is for mobile navigation */}
        </div>

        <ul className="md:flex hidden justify-center items-center gap-4">
          {/* Replace with actual custom buttons */}
          <li>register</li>
          <li>login</li>
        </ul>

        {/* passing the state into the mobile navigation */}
        <MobileNavigation
          handleToggleChange={handleToggleChange}
          toggle={toggle}
        />

        {/*  */}
      </nav>
    </header>
  );
};

export default Navbar;
