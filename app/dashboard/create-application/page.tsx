"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

// form component that will be used to create a new job application
import Form from "@/components/Form";
import { ApplicationInterface } from "@/interfaces";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../DashboardLayout";
import { useSearchParams } from "next/navigation";

const Page = () => {
  // custom useState to check wether the user has submitted the form
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: session } = useSession();

  const router = useRouter();

  // grab the status id from the URL
  const searchParams = useSearchParams();
  const applicationStatus = searchParams.get("type");

  // either use the applicationStatus from the URL or default to applied
  const status = applicationStatus || "applied";

  console.log("status", status);

  // useState hook to manage the state of the application object
  const [application, setApplication] = useState({
    position: "",
    status: status,
    date: "",
    company: "",
    note: "",
    url: "",
    logo: "",
    location: "",
  });

  // useForm hook from react-hook-form to manage the form state which application interface will be used to define the form data
  const { register, handleSubmit } = useForm<ApplicationInterface>();

  const onSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true);

      // Ensure session is available before proceeding
      if (!session || !session.user) {
        throw new Error("User session is not available");
      }

      // making a POST request to the backend to save the newly created user application /api/application/new
      const response = await fetch("/api/application/new", {
        method: "POST",
        body: JSON.stringify({
          company: application.company,
          position: application.position,
          status: application.status,
          date: application.date,
          note: application.note,
          url: application.url,
          logo: application.logo,
          location: application.location,
          userId: session?.user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Request to send application to the server failed");
      }

      alert("Application created successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create application");
    } finally {
      // reset the form and isSubmitting state after submission
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
    }
  };

  return (
    <DashboardLayout>
      {" "}
      <Form
        typeOfForm="Track"
        application={application}
        setApplication={setApplication}
        submitting={isSubmitting}
        register={register} // passed the register function from react-hook-form to the Form component
        handleSubmit={handleSubmit(onSubmit)} // wrap onSubmit with handleSubmit from react-hook-form
      />
    </DashboardLayout>
  );
};

export default Page;
