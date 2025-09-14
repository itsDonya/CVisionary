import { Link } from "react-router-dom";
import type { ReactNode } from "react";

// types
type ButtonProps = {
  to?: string;
  children?: string;
  icon?: ReactNode;
  variant?: "icon" | "super" | "outlined";
  rounded?: "none" | "rounded" | "pill";
  size?: "sm" | "md" | "lg";
};

// classes
const variantClasses = {
  icon: "aspect-square",
  super: "super-button",
  outlined:
    "text-sm text-white/80 hover:bg-white/15 border border-white/80 transition-200",
};

const roundedClasses = {
  none: "rounded-none",
  rounded: "rounded-xl",
  pill: "rounded-full",
};

const sizeClasses = {
  sm: "px-2 py-1.5 text-xs",
  md: "px-5 py-3 text-base",
  lg: "rounded-full",
};

const Button = ({
  to,
  children,
  icon,
  variant = "outlined",
  rounded = "rounded",
  size = "md",
}: ButtonProps) => {
  const classNames = `btn ${variantClasses[variant]} ${roundedClasses[rounded]} ${sizeClasses[size]}`;

  if (to)
    return (
      <Link to={to} className={classNames}>
        {icon && icon}
        {variant !== "icon" && children && children}
      </Link>
    );

  return (
    <button className={classNames}>
      {icon && icon}
      {variant !== "icon" && children && children}
    </button>
  );
};

export default Button;
