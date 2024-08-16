import { connectToMongoDb } from "@/lib/database";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToMongoDb();

    // Grab the user ID from the authorization header
    const authHeader = await req.headers.get("authorization");
    let userId: string | undefined = authHeader?.split(" ")[1];

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User not authenticated" }),
        {
          status: 401,
        }
      );
    }

    // Find the user by ID and populate their applications
    const user = await User.findById(userId).populate("applications").exec();

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(user.applications), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in fetching applications", error);
    return new NextResponse(
      JSON.stringify({ message: "Error in fetching applications" }),
      {
        status: 500,
      }
    );
  }
};
