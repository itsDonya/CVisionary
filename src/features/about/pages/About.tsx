import AboutUsCTA from "../components/AbourUsCTA";
import AboutUsMission from "../components/AboutUsMission";
import AboutUsTagline from "../components/AboutUsTagline";
import AboutUsOurVision from "../components/AboutUsVision";
import { aboutUsPage } from "../data";

const AboutUs = () => {
  return (
    <article className="w-full text-white relative overflow-hidden">
      <AboutUsTagline text={aboutUsPage.tagline} />

      <main className="relative flex flex-col items-center justify-start gap-20 z-10 max-w-7xl mx-auto px-6 py-10">
        <AboutUsOurVision vision={aboutUsPage.vision} />

        {/* <AboutUsCounters /> */}

        <AboutUsMission mission={aboutUsPage.mission} />

        <AboutUsCTA CTA={aboutUsPage.CTA} />
      </main>
    </article>
  );
};

export default AboutUs;
