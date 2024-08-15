"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

// form component that will be used to create a new job application
import Form from "@/components/Form";
import { ApplicationInterface } from "@/interfaces";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  // custom useState to check wether the user has submitted the form
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: session } = useSession();

  const router = useRouter();

  // useState hook to manage the state of the application object
  const [application, setApplication] = useState({
    position: "",
    status: "applied",
    date: "",
    company: "",
    note: "",
    url: "",
    logo: "",
    location: "",
  });

  // useForm hook from react-hook-form to manage the form state which application interface will be used to define the form data
  const { register, handleSubmit } = useForm<ApplicationInterface>();

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);

      console.log(application);

      // making a POST request to the backend to save the newly created user application /api/application/new
      const response = await fetch("/api/application/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...application,
          userId: session?.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create application");
      } else {
        setTimeout(() => {
          router.push("/dashboard");
          alret("Application created successfully");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create application");
    } finally {
      // reset the form 2 secconds after submission
      setTimeout(() => {
        // set is submitting to false so that the button returns to original state
        setIsSubmitting(false);

        // reset the application state manually
        setApplication({
          position: "",
          status: "applied",
          date: "",
          company: "",
          note: "",
          url: "",
          logo: "",
          location: "",
        });
      }, 2000);
    }
  };

  return (
    <Form
      typeOfForm="Track"
      application={application}
      setApplication={setApplication}
      submitting={isSubmitting}
      register={register} // passed the register function from react-hook-form to the Form component
      handleSubmit={handleSubmit(onSubmit)} // wrap onSubmit with handleSubmit from react-hook-form
    />
  );
};

export default Page;
