"use client";

import { navbarItems } from "@/data";
import Link from "next/link";
import { useState, useEffect } from "react";
import MobileNavigation from "./MobileNavigation";
import LoginOrSignUpBtn from "./LoginOrSignUpBtn";

// bunch of imports from next-auth to handle the session and authentication
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  // usestate to toggle the mobile navigation
  const [toggle, setToggle] = useState(false);

  // function to handle the toggle change
  const handleToggleChange = () => {
    setToggle((prev) => !prev);
  };

  const [providers, setProviders] = useState<Object[]>([]);

  useEffect(() => {
    async () => {
      const res = await getProviders();
      console.log(res);
      // setProviders(res);
    };
  }, []);

  return (
    <header className="max-w-[90vw] w-full mx-auto p-1 md:px-10 md:py-3  ">
      <nav className="flex justify-between items-center">
        {/*  */}
        <div className="flex justify-center items-center gap-3">
          <Link className="md:mr-6" href="/">
            <h1 className="text-4xl font-bold">Trackify.me</h1>{" "}
          </Link>
          {/* Desktop Navigation */}{" "}
          <ul className="md:flex hidden justify-center items-center gap-4">
            {navbarItems.map((item, index) => (
              <li className="navbar_items" key={index}>
                <Link href={item.url}>{item.title}</Link>
              </li>
            ))}
          </ul>
          {/* This below is for mobile navigation */}
        </div>

        <div className="md:flex hidden justify-center items-center gap-4">
          {/* Replace with actual custom buttons */}

          <LoginOrSignUpBtn />
        </div>

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
