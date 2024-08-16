import React from "react";
import Image from "next/image";

const CardElement = () => {
  return (
    <div className="bg-base-content w-full border-gray-500 min-h-screen border-r-2 sm:w-1/3 p-4">
      {/* Title Box */}

      <div className="text-center">
        {" "}
        <h2 className="text-4xl tracking-wider font-bold my-4 text-white">
          Other
        </h2>
        {/* lenght of the jobs array within the div */}
        <p className="text-white mb-10 uppercase">3 jobs</p>
        <button className="btn-block btn-square bg-slate-500">+</button>
      </div>

      <div className="flex rounded bg-base-100 p-2 mt-10 w-96 border border-gray-400/[.4]">
        <div className="bg-slate-500 mr-4  w-1 rounded-sm" />
        <div className="p-2">
          <h2 className="text-2xl">Company Name</h2>{" "}
          <div className="flex items-center justify-start ml-3">
            {" "}
            <Image
              alt="logo"
              src="/job_placeholder.svg"
              className="mr-4"
              width={30}
              height={30}
            />{" "}
            <p className="text-sm text-left">Software Engineer</p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardElement;
