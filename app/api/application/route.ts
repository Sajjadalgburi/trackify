import { connectToMongoDb } from "@/lib/database";
import { Application } from "@/models/application";

export const GET = async () => {
  try {
    await connectToMongoDb();
    const applications = await Application.find({});

    if (!applications) {
      return new Response(
        JSON.stringify({ message: "No applications found" }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(applications), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in fetching applications", error);
    return new Response(
      JSON.stringify({ message: "Error in fetching applications" }),
      {
        status: 500,
      }
    );
  }
};
