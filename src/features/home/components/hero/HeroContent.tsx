import Button from "@/shared/components/UI/Button";
import { heroSection } from "../../data/home";
import HeroProperties from "./HeroProperties";
import HeroScrollWheel from "./HeroScrollWheel";
import { Zap } from "lucide-react";

const HeroContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10">
      <div className="-mb-6 px-4 py-1 bg-gradient-to-tr from-primary-600 to-fuchsia-900 flex flex-center gap-1.5 border border-white/40 rounded-full shadow">
        <Zap className="w-3.5 text-white" />
        <p className="text-xs text-white">{heroSection.tagline}</p>
      </div>

      <h2 className="text-5xl text-white font-extrabold">
        {heroSection.title}
      </h2>

      <p className="w-200 text-center text-lg text-neutral-200/80">
        {heroSection.description}
      </p>

      <Button>{heroSection.buttonText}</Button>

      <span className="w-64 h-0.5 mt-6 bg-gradient-to-r from-white/5 via-white/20 to-white/5 rounded-[50%]"></span>

      <HeroProperties properties={heroSection.properties} />

      <HeroScrollWheel />
    </div>
  );
};

export default HeroContent;
