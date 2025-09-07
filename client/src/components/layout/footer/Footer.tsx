import Logo from "@/components/UI/Logo";
import { footer } from "@/data/layout";
import type { FooterContactItem, FooterNavlinkItem } from "@/data/layout.types";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative w-full h-20 bg-gradient-to-tr from-black/60 via-black/40 to-black/20 rounded-t-3xl backdrop-blur-3xl overflow-hidden">
      {/* bg pattern */}
      <span
        style={{ backgroundSize: "14px" }}
        className="absolute top-0 left-0 size-full bg-[url('https://framerusercontent.com/images/h9AVMXsfRL2Sh7jTKcwJTvuBDO4.png')] opacity-20 -z-10"></span>

      {/* content */}
      <div className="w-full h-full px-6 grid grid-cols-3 items-center justify-center">
        {/* logo & title */}
        <Link to="/" className="w-max flex items-center justify-start gap-3">
          <Logo className="size-7 drop-shadow-md drop-shadow-black/40" />
          <h5 className="text-lg text-neutral-300 font-[300]">
            <strong>CVisionary</strong>
          </h5>
        </Link>

        {/* navlink */}
        <nav className="w-full flex flex-center gap-6">
          {footer.navLinks.map((link: FooterNavlinkItem) => (
            <Link to={link.to} title={link.title} key={link.title}>
              <p className="text-xs text-neutral-300 hover:text-neutral-100 transition-200">
                {link.title}
              </p>
            </Link>
          ))}
        </nav>

        {/* contact us */}
        <div className="flex items-center justify-end gap-3">
          {footer.contactLinks.map((item: FooterContactItem) => (
            <a
              href={item.href}
              target="_blank"
              className="size-10 bg-white/5 flex flex-center border border-white/20 rounded-xl shadow-lg hover:shadow-xl hover:shadow-black/60 cursor-pointer transition-200">
              <item.icon className="size-4 text-neutral-200" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
