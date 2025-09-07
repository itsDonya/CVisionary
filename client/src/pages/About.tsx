import AboutUsCTA from "@/components/abouts-us/AbourUsCTA";
import AboutUsMission from "@/components/abouts-us/AboutUsMission";
import AboutUsTagline from "@/components/abouts-us/AboutUsTagline";
import AboutUsOurVision from "@/components/abouts-us/AboutUsVision";
import { aboutUsPage } from "@/data/general";
import DefaultLayout from "@/layouts/Default";

const AboutUs = () => {
  return (
    <DefaultLayout>
      <article className="w-full text-white relative overflow-hidden">
        <AboutUsTagline text={aboutUsPage.tagline} />

        <main className="relative flex flex-col items-center justify-start gap-20 z-10 max-w-7xl mx-auto px-6 py-10">
          <AboutUsOurVision vision={aboutUsPage.vision} />

          {/* <AboutUsCounters /> */}

          <AboutUsMission mission={aboutUsPage.mission} />

          <AboutUsCTA CTA={aboutUsPage.CTA} />
        </main>
      </article>
    </DefaultLayout>
  );
};

export default AboutUs;
