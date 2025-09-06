import type { HeroPropertyItem } from "@/data/home.types";

const HeroProperties = ({ properties }: { properties: HeroPropertyItem[] }) => {
  return (
    <ul className="flex items-center justify-center gap-4">
      {properties.map((prop) => (
        <li
          key={prop.title}
          className="px-6 py-3 bg-white/10 flex flex-col flex-center gap-2 border border-white/30 rounded-lg shadow-lg animate-pulse">
          <prop.icon className="size-4 text-white" />
          <h4 className="text-xs text-white">{prop.title}</h4>
        </li>
      ))}
    </ul>
  );
};

export default HeroProperties;
