import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name?: string;
      id?: string;
      email?: string;
      image?: string;
    };
  }

  interface Profile {
    name?: string | null;
    email: string;
    username: string;
    password: string;
    picture?: string | null;
  }
}
