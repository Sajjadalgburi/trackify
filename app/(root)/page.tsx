"use client";

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
    <div>
      <button onClick={handleClick} className="btn">
        Click me
      </button>
    </div>
  );
};

export default page;
