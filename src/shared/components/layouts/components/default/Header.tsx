import { header } from "../../data/default";
import { Link } from "react-router-dom";
import type { HeaderLinkItem } from "../../types/default";
import Logo from "@/shared/components/UI/Logo";
import Button from "@/shared/components/UI/Button";
import { User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full px-44 py-4 bg-gradient-to-l from-white/15 via-white/0 to-white/15 flex items-center justify-between gap-10 border border-white/10 rounded-b-3xl shadow-xl backdrop-blur-3xl z-20">
      <Link to="/" className="flex items-end justify-start gap-4">
        <Logo
          className="size-8 drop-shadow-md drop-shadow-black/40"
          alt="CVisionary - AI-powered Resume Builder"
        />

        {/* title */}
        <h1 className="text-white/70 text-xl font-[500]">CVisionary</h1>
      </Link>

      <div className="flex items-center justify-end gap-12">
        <nav className="flex items-center justify-end gap-6">
          {header.links.map((item: HeaderLinkItem) => (
            <Link
              to={item.path}
              key={item.title}
              className="text-sm text-neutral-400 hover:text-neutral-300 transition-colors duration-300 transition-200">
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* login/panel */}
        <Button
          to="/auth/login"
          size="sm"
          icon={<User className="size-4 text-white/60" />}>
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
