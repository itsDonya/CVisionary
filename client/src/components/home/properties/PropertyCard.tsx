import type { PropertyItem } from "@/data/home.types";

const PropertyCard = ({ icon: Icon, title, description }: PropertyItem) => {
  return (
    <div className="group relative p-8 bg-gradient-to-br from-purple-900/20 to-black/40 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30 flex items-center justify-center backdrop-blur-sm group-hover:border-purple-400/50 transition-colors duration-300">
          <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
        </div>

        <div className="absolute inset-0 top-8 left-8 w-16 h-16 bg-purple-300/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="z-10">
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-100 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-neutral-300/80 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
