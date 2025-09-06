import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // functions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: handle login logic
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-lg border border-white/20 p-8 shadow-2xl">
      <h1 className="text-white text-3xl font-medium text-center mb-8">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
            required
          />
        </div>

        <div className="space-y-2">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 text-white/80 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 bg-transparent border border-white/40 rounded text-white focus:ring-0 focus:ring-offset-0"
            />
            <span>Remember me</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white hover:text-primary-500 font-medium py-3 px-6 rounded-md hover:bg-white transition-colors duration-200 mt-8 cursor-pointer">
          Log In
        </button>
      </form>

      <p className="text-center text-white/80 text-sm mt-6 flex flex-center gap-2">
        Don't have an account?
        <Link to="/register" className="text-primary-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
