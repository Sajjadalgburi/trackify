import { connectToMongoDb } from "@/lib/database";
import { User } from "@/models/user";
import { Application } from "@/models/application";
import { applicationData, user } from "@/data";

export const GET = async () => {
  // Connect to the database first
  await connectToMongoDb();

  try {
    // Delete all the users and applications first
    await User.deleteMany({});
    await Application.deleteMany({});

    const createUser = await User.create(user);
    const createApplications = await Application.insertMany(applicationData);

    if (!createApplications) {
      console.error("Error in seeding applications");
      return new Response(
        JSON.stringify({ message: "Error in seeding applications" }),
        {
          status: 500,
        }
      );
    }

    if (!createUser) {
      console.error("Error in creating user");
      return new Response(
        JSON.stringify({ message: "Error in creating user" }),
        {
          status: 500,
        }
      );
    }

    // return a response of 200 status code to indicate that the user has been created successfully
    return new Response(
      JSON.stringify({ message: "Application and User created successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in seeding", error);
    return new Response(JSON.stringify({ message: "Error in seeding" }), {
      status: 401,
    });
  }
};
