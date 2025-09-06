import { ChevronDown } from "lucide-react";

const HeroScrollWheel = () => {
  return (
    // <div className="w-5 h-8 mt-4 py-1 flex items-end justify-center border-[2px] border-white/40 rounded-full animate-bounces cursor-pointer">
    //   <span className="size-2.5 bg-white/40 rounded-full animate-bounce"></span>
    // </div>

    <div className="mt-4 flex flex-col items-center justify-center animate-bounce cursor-pointer">
      <ChevronDown className="-mb-4 text-white/60" />
      <ChevronDown className="text-white/60" />
      <ChevronDown className="-mt-4 text-white/60" />
    </div>
  );
};

export default HeroScrollWheel;
