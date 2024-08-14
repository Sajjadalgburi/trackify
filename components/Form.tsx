"use client";

// note: thanks to chatGPT-4 for the layout. I repeat, form LAYOUT only. dont get too excited start to think it made this entire component. i did

interface FormProps {
  type: string;
  application: any;
  setApplication: any;
  submitting: boolean;
  register: any;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const Form: React.FC<FormProps> = ({
  type,
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
          {type} Application
        </h1>
        <p className="font-light">
          Fill in the form below to {type.toLowerCase()} an application
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Position *</span>
            </label>
            <input
              className="input input-bordered"
              {...(register("position"), { required: true })}
              placeholder="Position"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Company *</span>
            </label>
            <input
              className="input input-bordered"
              // regext pattern to match only letters and spaces
              {...(register("company"),
              { required: true, pattern: /^[a-zA-Z\s]*$/ })}
              placeholder="Company"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Date *</span>
            </label>
            <input
              className="input input-bordered"
              {...register("date")}
              type="date"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Status *</span>
            </label>

            <select className="select select-bordered" {...register("status")}>
              <option selected>applied</option>
              <option>pending</option>
              <option>approved</option>
              <option>rejected</option>
              <option>offer</option>
              <option>interview</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">URL</span>
            </label>
            <input
              className="input input-bordered"
              {...register("url")}
              placeholder="URL"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Logo URL</span>
            </label>
            <input
              className="input input-bordered"
              {...register("logo")}
              placeholder="Logo URL"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              className="input input-bordered"
              {...register("location")}
              placeholder="Location"
            />
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Notes</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-40"
            {...register("note")}
            placeholder="Notes"
            onChange={(e) =>
              setApplication({ ...application, note: e.target.value })
            }
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="btn btn-neutral"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : `${type} Application`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
