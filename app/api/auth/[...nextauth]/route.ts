import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// callback functions modularized for better readability
import { signIn } from "@/callbacks/signInCallback";
import { session } from "@/callbacks/sessionCallback";

export const handler = NextAuth({
  // passing the spread operator to pass all the options from the authOptions
  ...authOptions,

  callbacks: {
    session,
    signIn,
  },
});

// exporting the handler for the api route as both GET and POST
export { handler as GET, handler as POST };
