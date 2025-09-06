import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-[url('/src/assets/images/auth-bg.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
};

export default Login;
