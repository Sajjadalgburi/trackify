"use client";

import { UseFormRegister, FieldValues } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { GoBackBtn } from "@/components/GoBackBtn";

// note: thanks to chatGPT-4 for the layout. I repeat, form LAYOUT only. dont get too excited start to think it made this entire component. i did

interface FormProps extends InputHTMLAttributes<HTMLInputElement> {
  typeOfForm: string;
  application: any;
  setApplication: any;
  submitting: boolean;
  register: UseFormRegister<FieldValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const Form: React.FC<FormProps> = ({
  typeOfForm,
  application,
  setApplication,
  submitting,
  register,
  handleSubmit,
}) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="my-10 text-center">
        <h1 className="font-extrabold text-3xl md:text-7xl">
          {typeOfForm} Application
        </h1>
        <p className="font-light mt-2 md:my-3 text-sm md:text-base">
          Fill in the form below to {typeOfForm.toLowerCase()} an application
        </p>
        {/* Button to navigate back into the url */}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/*  */}
          {/*  */}
          {/* Position Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Position <span className="text-red-500">*</span>
              </span>
            </label>

            <input
              onChange={(e) =>
                setApplication({ ...application, position: e.target.value })
              }
              value={application.position}
              className="input input-bordered"
              // regext pattern to match only letters and spaces
              {...(register("position"),
              { required: true, pattern: "^[a-zA-Z\\s]*$" })}
              placeholder="Position"
            />
          </div>

          {/* Company Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Company <span className="text-red-500">*</span>
              </span>
            </label>

            <input
              onChange={(e) =>
                setApplication({ ...application, company: e.target.value })
              }
              value={application.company}
              className="input input-bordered"
              // regext pattern to match only letters and spaces
              {...(register("company"),
              { required: true, pattern: "^[a-zA-Z\\s]*$" })} // must place the regex in a string so that typescript will not complain
              placeholder="Company"
            />
          </div>

          {/* Date Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Date <span className="text-red-500">*</span>
              </span>
            </label>

            <input
              onChange={(e) =>
                setApplication({ ...application, date: e.target.value })
              }
              value={application.date}
              className="input input-bordered"
              min={new Date().toISOString().split("T")[0]} // Prevents selecting a past date
              // chat gpt-4: i think this is a good idea to prevent selecting a past date
              // lol co-pilot wrote the above comment
              max={
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                  .toISOString()
                  .split("T")[0]
              } // Sets the maximum date to one year from today
              // regext pattern to match date format
              {...(register("date"),
              {
                required: true,
                pattern: "^\\d{4}-\\d{2}-\\d{2}$",
              })}
              type="date"
            />
          </div>

          {/* Date Status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Status <span className="text-red-500">*</span>
              </span>
            </label>

            <select
              value={application.status}
              onChange={(e) =>
                setApplication({ ...application, status: e.target.value })
              }
              className="select select-bordered"
              {...(register("status"),
              {
                required: true,
              })}
            >
              <option>applied</option>
              <option>pending</option>
              <option>rejected</option>
              <option>offer</option>
              <option>interview</option>
            </select>
          </div>

          {/* Url Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">URL</span>
            </label>

            <input
              onChange={(e) =>
                setApplication({ ...application, url: e.target.value })
              }
              value={application.url}
              className="input input-bordered"
              // regext pattern to match only appropriate URL format
              {...(register("url"),
              {
                required: false,
                pattern: "^(http|https)://[^\\s$.?#].[^\\s]*$",
              })}
              placeholder="URL"
            />
          </div>

          {/* Logo url Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Logo URL</span>
            </label>

            <input
              onChange={(e) =>
                setApplication({ ...application, logo: e.target.value })
              }
              value={application.logo}
              className="input input-bordered"
              // regext pattern to match only appropriate URL format
              {...(register("logo"),
              {
                required: false,
                pattern: "^(http|https)://[^\\s$.?#].[^\\s]*$",
              })}
              placeholder="Logo URL"
            />
          </div>

          {/* Location Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>

            <input
              onChange={(e) =>
                setApplication({ ...application, location: e.target.value })
              }
              value={application.location}
              className="input input-bordered"
              // regext pattern to match only appropriate location format
              {...(register("location"),
              {
                required: false,
                pattern: "^[a-zA-Z\\s]*$",
              })}
              placeholder="Location"
            />
          </div>
        </div>

        {/* Notes Textarea */}
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Notes</span>
          </label>

          <textarea
            value={application.note}
            className="textarea textarea-bordered h-40"
            {...(register("note"),
            {
              required: false,
            })}
            placeholder="Notes"
            onChange={(e) =>
              setApplication({ ...application, note: e.target.value })
            }
          />
        </div>

        {/* Custom message */}
        <p className="text-sm">
          <span className="text-red-500">*</span> indicates required field
        </p>

        {/* submit button */}
        <div className="flex justify-center mt-6 gap-3">
          <button
            className="btn btn-neutral"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : `${typeOfForm} Application`}
          </button>
        </div>
      </form>
      <GoBackBtn />
    </div>
  );
};

export default Form;
