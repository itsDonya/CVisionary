import Button from "@/components/UI/Button";
import { heroContent } from "@/data/home.tsx";
import HeroProperties from "./HeroProperties";

const HeroContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10">
      <div className="-mb-6 px-4 py-1 bg-gradient-to-tr from-primary-600 to-fuchsia-900 flex flex-center border border-white/40 rounded-full shadow">
        <p className="text-xs text-white">{heroContent.tagline}</p>
      </div>

      <h2 className="text-5xl text-white font-extrabold">
        {heroContent.title}
      </h2>

      <p className="w-200 text-center text-lg text-neutral-300">
        {heroContent.description}
      </p>

      <Button>{heroContent.buttonText}</Button>

      <span className="w-64 h-0.5 mt-6 bg-gradient-to-r from-white/5 via-white/20 to-white/5 rounded-[50%]"></span>

      <HeroProperties properties={heroContent.properties} />
    </div>
  );
};

export default HeroContent;
