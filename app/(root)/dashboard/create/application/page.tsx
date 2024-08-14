"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { ApplicationStatus, ApplicationInterface } from "@/models/application";

// form component that will be used to create a new job application
import Form from "@/components/Form";

const Page = () => {
  // useState hook to manage the state of the application object
  const [application, setApplication] = useState({
    position: "",
    status: ApplicationStatus.PENDING,
    date: "",
    company: "",
    note: "",
    url: "",
    logo: "",
    location: "",
  });

  // useForm hook from react-hook-form to manage the form state which application interface will be used to define the form data
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ApplicationInterface>();

  const onSubmit = async (data: ApplicationInterface) => {
    new Promise<void>((resolve) => {
      setTimeout(async () => {
        resolve();
        console.log(data);
        reset();
      }, 1000);
    });
  };

  return (
    <Form
      type="Create"
      application={application}
      setApplication={setApplication}
      submitting={isSubmitting}
      register={register} // passed the register function from react-hook-form to the Form component
      handleSubmit={handleSubmit(onSubmit)} // wrap onSubmit with handleSubmit from react-hook-form
    />
  );
};

export default Page;
