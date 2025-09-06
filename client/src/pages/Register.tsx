import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <article className="min-h-screen w-full bg-[url('/src/assets/images/auth-bg.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      <RegisterForm />
    </article>
  );
};

export default Register;
