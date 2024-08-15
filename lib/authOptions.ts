// these are providers that we will use for authentication
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// mongodb and the user modal
import { connectToMongoDb } from "@/lib/database";
import { User } from "@/models/user";

// bcrypt for hashing the password before saving it to the database
import bcrypt from "bcrypt";

// importing the NextAuthOptions type from next-auth
import { NextAuthOptions } from "next-auth";

// intiliazing the options for the authentication and passing some type references
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      // The name to display on the sign-in form (e.g. "Sign in with...")
      name: "Enter your credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },

      async authorize(
        credentials:
          | Record<"email" | "username" | "password", string>
          | undefined,
        req: any
      ): Promise<any> {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        try {
          await connectToMongoDb();

          // Look up the user from the credentials supplied
          let user = await User.findOne({ email: credentials.email });

          if (!user) {
            // If user does not exist, create a new user
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            if (!hashedPassword) {
              throw new Error("Password hashing failed");
            }

            user = await User.create({
              email: credentials.email,
              username: credentials.username
                .replace(" ", "")
                .toLowerCase()
                .trim(),
              password: hashedPassword,
            });

            return { id: user._id, email: user.email, username: user.username };
          }

          // Check if the password is correct
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password.trim(),
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid credentials");
          }

          return { id: user._id, email: user.email, username: user.username };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
};
