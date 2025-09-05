import Button from "@/components/UI/Button";
import { heroContent } from "@/data/home";

const HeroContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10">
      <h2 className="text-5xl text-white font-extrabold">
        {heroContent.title}
      </h2>

      <p className="w-200 text-center text-lg text-neutral-300">
        {heroContent.description}
      </p>

      <Button to="/somewhere">Get Started Free</Button>
    </div>
  );
};

export default HeroContent;
