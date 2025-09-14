import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { form, onSubmit, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <section className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-lg border border-white/20 p-8 shadow-2xl">
      <h1 className="text-white text-3xl font-medium text-center mb-8">
        Login
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 text-white/80 cursor-pointer">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 bg-transparent border border-white/40 rounded text-white focus:ring-0 focus:ring-offset-0"
            />
            <span>Remember me</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 text-white hover:text-primary-500 font-medium py-3 px-6 rounded-md hover:bg-white transition-colors duration-200 mt-8 cursor-pointer disabled:opacity-50">
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-center text-white/80 text-sm mt-6 flex flex-center gap-2">
        Don't have an account?
        <Link to="/auth/register" className="text-primary-500 hover:underline">
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;
