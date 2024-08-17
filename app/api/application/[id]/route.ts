import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/database";
import { User } from "@/models/User";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToMongoDb();

    const authHeader = req.headers.get("authorization");
    const userId: string | undefined = authHeader?.split(" ")[1];

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is missing" }),
        { status: 400 }
      );
    }

    const user = await User.findById(userId).populate("applications");

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const application = user.applications.find(
      (app: { _id: { toString: () => string } }) =>
        app._id.toString() === params.id
    );

    if (!application) {
      return new NextResponse(
        JSON.stringify({ message: "Application not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(application), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Couldn't get the application", { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToMongoDb();

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
    } = await req.json();

    const user = await User.findOneAndUpdate(
      { _id: userId, "applications._id": params.id },
      {
        $set: {
          "applications.$.company": company,
          "applications.$.position": position,
          "applications.$.status": status,
          "applications.$.date": date,
          "applications.$.note": note,
          "applications.$.url": url,
          "applications.$.logo": logo,
          "applications.$.location": location,
        },
      },
      { new: true }
    );

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Application updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Couldn't update the application", { status: 500 });
  }
};
