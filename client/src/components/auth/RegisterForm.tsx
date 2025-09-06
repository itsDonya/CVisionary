import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: handle register logic
    console.log(formData);
  };

  return (
    <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-lg border border-white/20 p-8 shadow-2xl">
      <h1 className="text-white text-3xl font-medium text-center mb-8">
        Register
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
            required
          />
        </div>

        <div className="space-y-2">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
            required
          />
        </div>

        <div className="space-y-2">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
            required
          />
        </div>

        <div className="space-y-2">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-transparent border-b-2 border-white/40 text-white placeholder-white/70 py-3 px-0 focus:outline-none focus:border-white/80 transition-colors duration-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-500 text-white hover:text-primary-500 font-medium py-3 px-6 rounded-md hover:bg-white transition-300 mt-8 cursor-pointer">
          Register
        </button>
      </form>

      <p className="text-center text-white/80 text-sm mt-6 flex flex-cnter gap-2">
        Already have an account?
        <Link
          to="/login"
          className="text-primary-500 hover:underline transition-colors duration-200">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
