import type { AboutUsCTAType } from "@/data/general.types";

const AboutUsCTA = ({ CTA }: { CTA: AboutUsCTAType }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">{CTA.title}</h2>

      <p className="text-gray-300 mb-8 max-w-2xl mx-auto">{CTA.description}</p>

      <button className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full font-semibold hover:from-pink-600 hover:to-violet-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/25 cursor-pointer">
        <span className="mr-2">🚀</span>
        {CTA.buttonText}
      </button>
    </div>
  );
};

export default AboutUsCTA;
