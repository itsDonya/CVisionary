import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <article className="min-h-screen w-full bg-[url('/src/assets/images/auth-bg.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      <Outlet />
    </article>
  );
};

export default AuthLayout;
