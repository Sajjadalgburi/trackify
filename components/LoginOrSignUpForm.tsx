import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";

type FormValues = {
  email: string;
  password: string;
};

const LoginOrSignUpForm = ({ type }: { type: "login" | "register" }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // must return a new promise for react-hook-form to work
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        reset();
      }, 2000);
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-8 shadow-md">
        <h2 className="text-2xl text-center font-bold text-white mb-4">
          {type === "login" ? "Log In" : "Sign Up"}
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Enter your credentials to {type === "login" ? "log in" : "sign up"}
        </p>

        {/* Google and GitHub */}
        <div className="flex gap-4 mb-4">
          <button className="flex-1 bg-neutral hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
            <FaGithub />
            Github
          </button>
          <button className="flex-1 bg-neutral hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
            <FaGoogle />
            Google
          </button>
        </div>

        <div className="text-center text-sm text-gray-400 mb-4">
          OR CONTINUE WITH
        </div>

        {/* Form elements */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1" htmlFor="email">
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
          <div>
            <label className="block text-gray-400 mb-1" htmlFor="password">
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
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-secondary"
            >
              {isSubmitting ? (
                <span className="loading loading-dots loading-sm">
                  {" "}
                  Loading...
                </span>
              ) : type === "login" ? (
                "Log In"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginOrSignUpForm;
