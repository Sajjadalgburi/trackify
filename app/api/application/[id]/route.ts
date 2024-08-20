import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/database";
import { User } from "@/models/User";
import { user } from "@/data";

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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToMongoDb();

    const id = await params.id;

    const authHeader = req.headers.get("authorization");
    const userId: string | undefined = authHeader?.split(" ")[1];

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is missing" }),
        { status: 400 }
      );
    }

    // find the userId that is making the request and delete the application with the id
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { applications: { _id: id } },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const p = new NextResponse(
      JSON.stringify({ message: "Application deleted" }),
      {
        status: 200,
      }
    );

    return p;
  } catch (error) {
    console.error(error);
    return new NextResponse("Couldn't delete the application", { status: 500 });
  }
};
