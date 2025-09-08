import type { ReactNode } from "react";
import Footer from "@/components/layout/general/Footer";
import Header from "@/components/layout/general/Header";

interface PropTypes {
  children: ReactNode;
  hasHeader?: boolean;
}

const DefaultLayout = ({ children, hasHeader = true }: PropTypes) => {
  return (
    <>
      <div className="w-full bg-[url('/src/assets/images/landing-bg.jpg')] bg-cover bg-center bg-fixed flex flex-col items-center justify-start gap-10">
        {hasHeader && <Header />}
        <main className="w-full">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
