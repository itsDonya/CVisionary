import { Outlet, useLocation } from "react-router-dom";

// components
import Header from "../components/layouts/components/default/Header";
import Footer from "../components/layouts/components/default/Footer";

const DefaultLayout = () => {
  const location = useLocation();

  // methods
  const isHomePage = () => {
    return location.pathname === "/";
  };

  return (
    <>
      <div className="w-full bg-[url('/src/assets/images/landing-bg.jpg')] bg-cover bg-center bg-fixed flex flex-col items-center justify-start gap-10">
        {!isHomePage() && <Header />}

        <main className="w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
