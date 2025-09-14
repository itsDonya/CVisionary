import type { PropertyItem } from "../../types";

const PropertyCard = ({ icon: Icon, title, description }: PropertyItem) => {
  return (
    <div className="group relative p-4 bg-gradient-to-br from-purple-900/20 to-black/40 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
      <div className="mb-4">
        <div className="size-14 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30 flex items-center justify-center backdrop-blur-sm group-hover:border-purple-400/50 transition-colors duration-300">
          <Icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
        </div>

        <div className="absolute inset-0 top-3 left-3 w-16 h-16 bg-purple-300/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="z-10">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-100 transition-colors duration-300 h-[3em]">
          {title}
        </h3>

        <p className="text-sm text-neutral-200/80 font-[200] leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
