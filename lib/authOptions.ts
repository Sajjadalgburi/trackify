import { NextAuthOptions } from "next-auth";

// these are providers that we will use for authentication
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";

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
  ],
};
