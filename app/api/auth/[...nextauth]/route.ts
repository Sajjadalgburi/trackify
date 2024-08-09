import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export const handler = NextAuth(authOptions);

// exporting the handler for the api route as both GET and POST
export { handler as GET, handler as POST };
