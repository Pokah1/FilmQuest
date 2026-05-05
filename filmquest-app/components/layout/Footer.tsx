import { FOOTER_LINKS } from "@/constants/navigation";
import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";

const SOCIALS = [
  { icon: faXTwitter, href: "https://x.com", label: "X (Twitter)" },
  { icon: faFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: faInstagram, href: "https://instagram.com", label: "Instagram" },
];

const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <footer className="bg-[#171D22] text-white pt-10 px-6 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center w-full pb-8">

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <h2 className="text-xl md:text-4xl font-semibold mb-4 md:mb-0 text-white">
            Film<span className="text-[#E2D609]">Quest</span>
          </h2>
        </Link>

        {/* Nav links */}
        <nav className="flex-1 flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-lg transition-colors duration-300"
              style={{
                color: router.pathname === href ? "#E2D609" : "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontWeight: router.pathname === href ? 600 : 400,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex space-x-5">
          {SOCIALS.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E2D609")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <FontAwesomeIcon icon={icon} size="lg" />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(226,214,9,0.2), transparent)" }} />

      {/* Copyright */}
      <div className="py-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} FilmQuest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;