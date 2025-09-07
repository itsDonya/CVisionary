import { featuresSection } from "@/data/home";

const Features = () => {
  return (
    <section className="relative w-full flex flex-center">
      <div className="absolute -top-16 left-6 w-72 h-56 bg-[url('https://framerusercontent.com/images/h9AVMXsfRL2Sh7jTKcwJTvuBDO4.png')] animate-pulse"></div>
      <div className="absolute -bottom-24 right-6 w-96 h-56 bg-[url('https://framerusercontent.com/images/h9AVMXsfRL2Sh7jTKcwJTvuBDO4.png')] animate-pulse"></div>

      <div className="w-9/12 h-120 p-12 bg-gradient-to-tl from-black/50 via-black/30 to-black/10 flex flex-col items-start justify-start gap-5 border border-white/30 rounded-2xl backdrop-blur-3xl">
        <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 whitespace-pre-line">
          {featuresSection.title}
        </h4>

        <ul className="w-full grid grid-cols-3 gap-8">
          {featuresSection.items.map((feature) => (
            <li className="flex flex-col items-start justify-start gap-2">
              <div className="flex items-center justify-start gap-1">
                <feature.icon className="size-4 text-white" />
                <strong className="text-sm text-white font-[500]">
                  {feature.title}
                </strong>
              </div>

              <p className="text-xs text-neutral-300 font-[300]">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Features;
