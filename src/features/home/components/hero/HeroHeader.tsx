// navbar links
import { Link } from "react-router-dom";
import { User } from "lucide-react";

import Logo from "@/shared/components/UI/Logo";
import Button from "@/shared/components/UI/Button";

import { navlinks } from "../../data";
import type { Navlink } from "../../types";

const HeroHeader = () => {
  return (
    <header className="w-full pb-4 flex items-center justify-between gap-6 border-b-[1px] border-b-neutral-100/20">
      {/* logo */}
      <Link to="/" className="flex items-end justify-start gap-4">
        <Logo
          className="size-10 drop-shadow-md drop-shadow-black/40"
          alt="CVisionary - AI-powered Resume Builder"
        />

        {/* title */}
        <h1 className="text-white/70 text-2xl font-semibold">CVisionary</h1>
      </Link>
      <div className="flex items-center justify-end gap-16">
        {/* navbar */}
        <nav className="flex flex-center gap-8">
          {navlinks.map((link: Navlink) => (
            <Link key={link.name} to={link.path}>
              <span className="text-sm text-neutral-300 hover:text-neutral-100 transition-200">
                {link.title}
              </span>
            </Link>
          ))}
        </nav>

        {/* panel */}
        {/* <Button variant="icon"></Button> */}
        <Button size="sm" icon={<User className="size-4 text-white/60" />}>
          Login
        </Button>
      </div>
    </header>
  );
};

export default HeroHeader;
