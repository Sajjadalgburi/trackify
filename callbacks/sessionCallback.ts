// user modal
import { User } from "@/models/User";

// import the necessary types so that typescript can understand the types
import { Session } from "next-auth";

export const session = async ({
  session,
}: {
  session: Session;
}): Promise<Session> => {
  // store the user id from MongoDB to session
  const sessionUser = await User.findOne({
    email: session.user.email,
  });

  if (!sessionUser) {
    throw new Error("User not found for session");
  }

  session.user.id = sessionUser._id.toString();

  return session;
};
