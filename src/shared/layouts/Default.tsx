import type { ReactNode } from "react";

// components
import Header from "../components/layouts/components/default/Header";
import Footer from "../components/layouts/components/default/Footer";
import { Outlet } from "react-router-dom";

interface PropTypes {
  children?: ReactNode;
  hasHeader?: boolean;
}

const DefaultLayout = ({ hasHeader = true }: PropTypes) => {
  return (
    <>
      <div className="w-full bg-[url('/src/assets/images/landing-bg.jpg')] bg-cover bg-center bg-fixed flex flex-col items-center justify-start gap-10">
        {hasHeader && <Header />}
        <main className="w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
