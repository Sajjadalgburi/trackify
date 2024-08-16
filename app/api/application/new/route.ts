import { connectToMongoDb } from "@/lib/database";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    // Parse and validate the request body
    const {
      company,
      position,
      status,
      date,
      note,
      url,
      logo,
      location,
      userId,
    } = await request.json();

    if (!userId || !company || !position || !status || !date) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await connectToMongoDb();

    // Find the user by id
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Add the application to the user's applications array
    user.applications.push({
      company,
      position,
      status,
      date,
      note,
      url,
      logo,
      location,
    });

    await user.save();

    return new NextResponse("Application added successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
