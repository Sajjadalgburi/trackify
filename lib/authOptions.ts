// these are providers that we will use for authentication
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// import mongodb
import { connectToMongoDb } from "@/lib/database";

// user modal
import { User } from "@/models/user";

// intiliazing the options for the authentication and passing some type references
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // TODO: Implement type so that session.user.id is not any
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({
      profile,
    }: {
      profile: {
        name: string;
        email: string;
        username: string;
        password: string;
        picture?: string | null;
      };
    }) {
      // log the profile object to the console
      console.log("============================================");
      console.log("============================================");
      console.log(profile);
      console.log("============================================");
      console.log("============================================");

      try {
        await connectToMongoDb();
        // 1. Check if user already exists in the database
        // 2. If not, create a new user in the database

        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(), // remove spaces and convert username to lowercase
            password: profile.password,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
