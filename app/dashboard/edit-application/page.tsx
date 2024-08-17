"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";
import { ApplicationInterface } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import DashboardLayout from "../DashboardLayout";

const EditApplication = () => {
  // grab the application id from the URL
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id");

  const router = useRouter();

  // useForm hook from react-hook-form to manage the form state which application interface will be used to define the form data
  const { register, handleSubmit } = useForm<ApplicationInterface>();

  // Get the user ID from the session and store it in a variable so we can pass it to the fetch request as a header value for authorization
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // State to store the application data
  const [application, setApplication] = useState({
    position: "",
    status: "",
    date: "",
    company: "",
    note: "",
    url: "",
    logo: "",
    location: "",
  });

  // useEffect to fetch the application data based on the id
  useEffect(() => {
    if (!userId || !applicationId) return;

    const fetchApplication = async () => {
      const res = await fetch(`/api/application/${applicationId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });

      const data = await res.json();
      console.log(data);
      setApplication(data);
    };

    fetchApplication();
  }, [userId, applicationId]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true);

      // Ensure session is available before proceeding
      if (!userId || !applicationId) return;

      // PATCH request to update the application data
      const response = await fetch(`/api/application/${applicationId}`, {
        method: "PATCH",
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

      alert("Application edit was successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to edit application");
    } finally {
      // reset the form and isSubmitting state after submission
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      {" "}
      <Form
        typeOfForm="Edit"
        application={application}
        setApplication={setApplication}
        submitting={isSubmitting}
        register={register} // passed the register function from react-hook-form to the Form component
        handleSubmit={handleSubmit(onSubmit)} // wrap onSubmit with handleSubmit from react-hook-form
      />
    </DashboardLayout>
  );
};

export default EditApplication;
