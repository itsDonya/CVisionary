import PropertyCard from "./PropertyCard";
import { propertiesSection } from "@/data/home";

const Properties = () => {
  return (
    <section className="w-full bg-[url('https://framerusercontent.com/images/J9PD0z8SzMHT2KxXQClbD5Q7PU.png')] flex flex-col items-center justify-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 whitespace-pre-line">
          {propertiesSection.title}
        </h2>
        <p className="text-lg text-neutral-300/80 max-w-md mx-auto whitespace-pre-line">
          {propertiesSection.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6">
        {propertiesSection.items.map((item, index) => (
          <PropertyCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Properties;
