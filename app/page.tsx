"use client";

import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar";

const page = () => {
  const handleClick = async () => {
    try {
      const res = await fetch("/api/seed");

      if (!res.ok) {
        throw new Error(`Error in seeding: ${res.statusText}`);
      }

      console.log("It worked successfully");
    } catch (error) {
      console.error("Error in seeding", error);
      // Optionally show a user-friendly message
      alert("There was an error seeding the database. Please try again.");
    }
  };

  return (
    <main>
      <Navbar />
      <Hero />
      {/* <button onClick={handleClick} className="btn">
        Click me
      </button> */}
    </main>
  );
};

export default page;
