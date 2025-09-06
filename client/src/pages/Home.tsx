// components
import Properties from "@/components/home/properties/Properties";
import Hero from "@/components/home/hero/Hero";

const Home = () => {
  return (
    <article className="bg-[url('/src/assets/images/landing-bg.jpg')] bg-cover bg-center bg-fixed">
      <Hero />
      <Properties />
    </article>
  );
};

export default Home;
