"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { ApplicationStatus, ApplicationInterface } from "@/models/application";

// form component that will be used to create a new job application
import Form from "@/components/Form";

const Page = () => {
  // custom useState to check wether the user has submitted the form
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // useState hook to manage the state of the application object
  const [application, setApplication] = useState({
    position: "",
    status: ApplicationStatus.APPLIED,
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
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationInterface>();

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);

      console.log("application data", application);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create application");
    } finally {
      // reset the form 2 secconds after submission
      setTimeout(() => {
        setIsSubmitting(false);
        reset();
      }, 2000);
    }
  };

  return (
    <Form
      typeOfForm="Create"
      application={application}
      setApplication={setApplication}
      submitting={isSubmitting}
      register={register} // passed the register function from react-hook-form to the Form component
      handleSubmit={handleSubmit(onSubmit)} // wrap onSubmit with handleSubmit from react-hook-form
    />
  );
};

export default Page;
