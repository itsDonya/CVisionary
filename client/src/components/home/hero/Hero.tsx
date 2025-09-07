import HeroContent from "./HeroContent";
import HeroNavigation from "./HeroHeader";

const Hero = () => {
  return (
    <section className="w-full h-screen min-h-screen flex flex-center">
      <div className="w-11/12 h-[88%] px-8 py-6 bg-gradient-to-br from-black/20 to-black/40 flex flex-col items-start justify-start gap-6 border border-white/40 rounded-3xl backdrop-blur-xs shadow-2xl">
        <HeroNavigation />
        <HeroContent />
      </div>
    </section>
  );
};

export default Hero;
