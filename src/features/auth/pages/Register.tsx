import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const { form, onSubmit, isLoading, error } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <section className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-lg border border-white/20 p-8 shadow-2xl">
      <h1 className="text-white text-3xl font-medium text-center mb-8">
        Register
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter your full name"
            {...register("name")}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-500 text-white hover:text-primary-500 font-medium py-3 px-6 rounded-md hover:bg-white transition-300 mt-8 cursor-pointer disabled:opacity-50">
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center text-white/80 text-sm mt-6 flex justify-center gap-2">
        Already have an account?
        <Link
          to="/auth/login"
          className="text-primary-500 hover:underline transition-colors duration-200">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;
