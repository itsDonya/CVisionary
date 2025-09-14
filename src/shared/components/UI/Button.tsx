import { Link } from "react-router-dom";
import type { ReactNode } from "react";

// types
type ButtonProps = {
  to?: string;
  children?: string;
  icon?: ReactNode;
  variant?: "icon" | "super" | "outlined";
  rounded?: "none" | "rounded" | "pill";
};

// classes
const variantClasses = {
  icon: "",
  super: "super-button",
  outlined: "text-sm text-white/80 border border-white/80",
};

const roundedClasses = {
  none: "rounded-none",
  rounded: "rounded-xl",
  pill: "rounded-full",
};

const Button = ({
  to,
  children,
  icon,
  variant = "outlined",
  rounded = "rounded",
}: ButtonProps) => {
  const classNames = `btn ${variantClasses[variant]} ${roundedClasses[rounded]}`;

  if (to)
    return (
      <Link to={to} className={classNames}>
        {icon && icon}
        {children && children}
      </Link>
    );

  return (
    <button className={classNames}>
      {icon && icon}
      {children && children}
    </button>
  );
};

export default Button;
