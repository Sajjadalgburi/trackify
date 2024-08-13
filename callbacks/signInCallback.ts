// import mongodb and the user modal
import { connectToMongoDb } from "@/lib/database";
import { UserModel } from "@/models/user";

// import the necessary types so that typescript can understand the types
import { Profile, User, Account } from "next-auth";

// the signIn function is called when the user signs in
export const signIn = async ({
  profile,
}: {
  user: User;
  account: Account | null;
  profile?: Profile;
}): Promise<boolean> => {
  try {
    await connectToMongoDb();
    // 1. Check if user already exists in the database
    const existingUser = await UserModel.findOne({
      email: profile?.email,
    });

    // 2. If not, create a new user in the database
    if (!existingUser) {
      await UserModel.create({
        email: profile?.email,
        username: profile?.name
          ?.replace(" ", "")
          .toLowerCase()
          .trim() as string, // remove spaces and convert username to lowercase
        password: profile?.password,
        image: profile?.picture,
      });
    }

    return true;
  } catch (error) {
    // return false if there is an error in the sign in process
    console.error(error);
    return false;
  }
};
