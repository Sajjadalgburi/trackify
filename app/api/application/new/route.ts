import { NextApiRequest, NextApiResponse } from "next";

import { connectToMongoDb } from "@/lib/database";

// importing models
import { User } from "@/models/user";

// pass in Next types to the params req, and res
export const POST = async (req: NextApiRequest) => {
  // destructure the body from the request
  let { userId, position, status, date, company, note, url, logo, location } =
    req.body;

  console.log(req.body);

  try {
    await connectToMongoDb();
  } catch (error) {
    console.error(error);
    return new Response("cannot create a new application", {
      status: 401,
    });
  }
};
