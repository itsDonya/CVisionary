import type { AboutUsMissionType } from "@/data/general.types";

const AboutUsMission = ({ mission }: { mission: AboutUsMissionType }) => {
  return (
    <section className="relative w-full">
      <div className="absolute -top-16 -left-20 w-72 h-56 bg-[url('https://framerusercontent.com/images/h9AVMXsfRL2Sh7jTKcwJTvuBDO4.png')] animate-pulse"></div>
      <div className="absolute -bottom-24 -right-20 w-96 h-56 bg-[url('https://framerusercontent.com/images/h9AVMXsfRL2Sh7jTKcwJTvuBDO4.png')] animate-pulse"></div>

      <div className="w-11/12 mt-10 backdrop-blur-lg bg-gradient-to-tl from-black/60 via-black/40 to-black/20 rounded-3xl p-6 text-center">
        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          {mission.title}
        </h2>
        <p className="text-neutral-300 leading-relaxed max-w-4xl mx-auto whitespace-pre-line">
          {mission.text}
        </p>
      </div>
    </section>
  );
};

export default AboutUsMission;
