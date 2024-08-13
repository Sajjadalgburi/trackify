"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, LiteralUnion } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Form values type to ensure type safety and validation
type FormValues = {
  username?: string;
  email: string;
  password: string;
};

const LoginOrSignUpForm = ({ type }: { type: "login" | "register" }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  // function to handle the form submission and returing a promise and resetting the form after 2 seconds
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Attempt to sign in the user with the data from the form
      const result = await signIn(
        "credentials",
        {
          redirect: false,
          email: data?.email,
          username: data?.username,
          password: data?.password,
        },
        { callbackUrl: "/dashboard" }
      );

      if (result?.error) {
        console.error("Sign in error:", result.error);
      } else {
        // redirect to the dashboard after successful login
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
    } finally {
      // Reset the form after submission
      reset();
    }
  };

  // fetching the providers from the getProviders function
  const [providers, setProviders] =
    // setting the type of the state to the Record of the providers.
    // if this is not set, the typescript will throw an error
    useState<Record<
      LiteralUnion<BuiltInProviderType, string>,
      ClientSafeProvider
    > | null>(null);

  // on component mount, fetch the providers using the getProviders function from next-auth
  useEffect(() => {
    const getAllProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    getAllProviders();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full ">
        <h2 className="md:text-6xl text-2xl text-center font-bold mb-4">
          {type === "login" ? "Log In" : "Sign Up"}
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter your credentials to {type === "login" ? "log in" : "sign up"}
        </p>

        {/* Google and GitHub */}
        <div className="flex justify-center gap-4">
          {/* if providers are available, map through them and display the
          buttons appropriately to sign in with the provider */}
          {providers &&
            Object.values(providers)
              // get the first two providers only
              .slice(0, 2)
              .map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id), { callbackUrl: "/dashboard" };
                  }}
                  className="btn text-center btn-neutral px-6 md:px-14"
                >
                  {provider.name}{" "}
                  {/* if the provider is github, show the github icon, else show the google icon */}
                  {provider.id === "github" ? <FaGithub /> : <FaGoogle />}
                </button>
              ))}
        </div>

        <div className="text-center tracking-[.2rem] md:tracking-[.4rem] text-sm text-gray-600 my-4">
          OR CONTINUE WITH
        </div>

        {/* Form elements */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {type === "register" && (
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="email">
                Username
              </label>
              <input
                id="username"
                type="username"
                {...register("username", { required: "username is required" })}
                className="w-full px-3 py-2 bg-neutral text-white rounded"
                placeholder="John Doe"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}
          {/*  */}
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 bg-neutral text-white rounded"
              placeholder="m@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/*  */}

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 bg-neutral text-white rounded"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/*  */}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-secondary px-14">
              {type === "login" ? "Log In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginOrSignUpForm;
