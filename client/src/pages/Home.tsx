// components
import Hero from "@/components/home/hero/Hero";
import Properties from "@/components/home/properties/Properties";
import Features from "@/components/home/features/Features";

const Home = () => {
  return (
    <article className="pb-40 bg-[url('/src/assets/images/landing-bg.jpg')] bg-cover bg-center bg-fixed flex flex-col items-center justify-start gap-28">
      <Hero />
      <Properties />
      <Features />
    </article>
  );
};

export default Home;
