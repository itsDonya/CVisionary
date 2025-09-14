import type { AboutUsVisionType } from "../types";
import PropertyCard from "@/features/home/components/properties/PropertyCard";

const AboutUsVision = ({ vision }: { vision: AboutUsVisionType }) => {
  return (
    <>
      <section>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            {vision.title}
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto font-[300] leading-relaxed">
            {vision.description}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl px-6">
          {vision.items.map((item, index) => (
            <PropertyCard key={index} {...item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutUsVision;
