"use client";

import { navbarItems } from "@/data";
import Link from "next/link";
import { useState } from "react";
import MobileNavigation from "./MobileNavigation";
import LoginOrSignUpBtn from "./LoginOrSignUpBtn";

// bunch of imports from next-auth to handle the session and authentication
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  // usestate to toggle the mobile navigation
  const [toggle, setToggle] = useState(false);

  const { data: session } = useSession();

  // function to handle the toggle change
  const handleToggleChange = () => {
    setToggle((prev) => !prev);
  };

  return (
    <header className="max-w-[90vw] w-full mx-auto p-1 md:px-10 md:py-3  ">
      <nav className="flex justify-between items-center">
        {/* Desktop Navigation */}
        <div className="flex justify-center items-center gap-3">
          <Link className="md:mr-6" href="/">
            <h1 className="text-4xl font-bold">Trackify.me</h1>{" "}
          </Link>

          <ul className="md:flex hidden justify-center items-center gap-4">
            {navbarItems.map((item, index) => (
              <li className="navbar_items" key={index}>
                <Link href={item.url}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:flex hidden justify-center items-center gap-4">
          {session?.user ? (
            <>
              {/* logout button */}
              <button onClick={() => signOut()} className="btn btn-accent">
                Logout
              </button>
              {/* show dashboard button if user is logged in */}
              <button className="btn btn-neutral">
                <Link href="/dashboard">Dashboard</Link>
              </button>{" "}
            </>
          ) : (
            // show login or signup button if user is not logged in
            <LoginOrSignUpBtn />
          )}
        </div>
        {/* Desktop Navigation  */}
        {/*  */}
        {/* This below is for mobile navigation */}
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
