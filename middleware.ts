// this middleware will require authentication for specific routes

// refer back to the documentation for more information https://next-auth.js.org/configuration/nextjs

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/dashboard/create-application"],
};
