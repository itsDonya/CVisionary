import type { ReactNode } from "react";
import Footer from "@/components/layout/footer/Footer";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="w-full bg-[url('/src/assets/images/landing-bg.jpg')] bg-cover bg-center bg-fixed flex flex-col items-center justify-start gap-20">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
