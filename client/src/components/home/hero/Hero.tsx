import HeroContent from "./HeroContent";
import HeroNavigation from "./HeroHeader";

const Hero = () => {
  return (
    <section className="w-full h-screen min-h-screen bg-[url('/src/assets/images/landing-bg.jpg')] bg-cover bg-center flex flex-center">
      <div className="w-11/12 h-[88%] px-8 py-6 bg-gradient-to-r from-white/15 to-white/25 flex flex-col items-start justify-start gap-6 rounded-3xl backdrop-blur-3xl shadow-2xl">
        <HeroNavigation />
        <HeroContent />
      </div>
    </section>
  );
};

export default Hero;
