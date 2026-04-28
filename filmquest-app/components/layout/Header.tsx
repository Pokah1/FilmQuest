import Button from "@/components/commons/Button";
import { NAV_LINKS} from "@/constants/navigation";
import Link from "next/link";

const Header: React.FC = () => (
  <header className="h-28 flex items-center bg-[#171D22] px-4 md:px-16 lg:px-44 text-white">
    <div className="flex items-center justify-between w-full">
      <h2 className="text-xl md:text-4xl font-semibold">
        Film<span className="text-[#E2D609]">Quest</span>
      </h2>

      <nav className="hidden md:flex flex-1 justify-center space-x-8">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold"
          >
            {label}
          </Link>
        ))}
      </nav>

      <Button title="Sign in" />
    </div>
  </header>
);

export default Header;