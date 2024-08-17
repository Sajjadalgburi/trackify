import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// create a new component called StatusButton that accepts a type prop which will be the status of the application
interface StatusButtonProps {
  type: string;
}

// the type is passed on from a higher component and then used to query the applications based on the status
const StatusButton: React.FC<StatusButtonProps> = ({ type }) => {
  const router = useRouter();

  // on button click, push the user to the create-application page with the type of
  // application that will be queried to change the state of the application useState
  const handleClick = (): void => {
    router.push(`/dashboard/create-application?type=${type}`);
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-block btn-square btn-secondary"
    >
      <Image src="/plus_sign.svg" width={25} height={20} alt="sign" />
    </button>
  );
};

export default StatusButton;
