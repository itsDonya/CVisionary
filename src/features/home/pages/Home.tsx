// components
import Hero from "../components/hero/Hero";
import Properties from "../components/properties/Properties";
import Features from "../components/features/Features";

const Home = () => {
  return (
    <article className="pb-20 flex flex-col items-center justify-start gap-16">
      <Hero />
      <Properties />
      <Features />
    </article>
  );
};

export default Home;
