// components
import Hero from "@/components/home/hero/Hero";
import Properties from "@/components/home/properties/Properties";
import Features from "@/components/home/features/Features";
import DefaultLayout from "@/layouts/Default";

const Home = () => {
  return (
    <DefaultLayout>
      <article className="flex flex-col items-center justify-start gap-28">
        <Hero />
        <Properties />
        <Features />
      </article>
    </DefaultLayout>
  );
};

export default Home;
