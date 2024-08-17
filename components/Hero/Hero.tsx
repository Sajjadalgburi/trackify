// this is the hero landing page component which will display bunvh of text to convice user to sign up or use the app
import HeroContent from "./Hero.modular";

const Hero = () => {
  return (
    <section className="flex justify-around items-center max-w-7xl mx-auto md:pb-34 pt-20">
      {/*  */}
      <div className="gap-4 flex flex-col md:flex-row justify-center md:items-start items-center  ">
        <HeroContent />

        <div>
          <img
            className="rounded-xl shadow-xl"
            width={750}
            height={750}
            src="https://placehold.co/100x100"
            alt="placeholder image"
          />
        </div>
      </div>

      {/*  */}
    </section>
  );
};

export default Hero;
