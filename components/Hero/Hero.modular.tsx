import { heroData } from "@/data";

const HeroContent = () => {
  return (
    <div className="flex flex-col md:text-left text-center">
      <h1 className="text-5xl font-bold pr-10 capitalize">
        {heroData.title}{" "}
        <span className="text_gradient font-extrabold">trackify.me</span>
      </h1>

      <p className="text-base md:ml-8 my-5 tracking-[.2rem] text-gray-500">
        {heroData.textOne}
      </p>
      <p className="text-lg max-w-[40rem]">{heroData.textTwo}</p>

      {/* List items */}
      <ul className="md:ml-8 my-10 md:my-3">
        {heroData.listItems.map((feature, index) => (
          <li
            key={index}
            className="flex justify-center md:justify-start items-center text-sm my-2"
          >
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button to 'get started' */}
      <div className="flex md:justify-start justify-center ">
        <button className="btn btn-outline px-10 capitalize">
          get started
        </button>
      </div>

      {/* this will display the application tracked */}
      <p className="text-sm text-gray-500 mt-5">{heroData.tracked} </p>
    </div>
  );
};

export default HeroContent;
