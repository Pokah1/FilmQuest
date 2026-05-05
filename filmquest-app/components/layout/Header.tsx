import Button from "@/components/commons/Button";
import { NAV_LINKS } from "@/constants/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-[#171D22] text-white" style={{ position: "relative", zIndex: 50 }}>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu { animation: slideDown 0.25s ease both; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 2px;
          background: #E2D609;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }
        .hamburger-line { transition: all 0.3s ease; }
      `}</style>

      {/* Main bar */}
      <div className="h-28 flex items-center px-4 md:px-16 lg:px-44">
        <div className="flex items-center justify-between w-full">

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <h2 className="text-xl md:text-4xl font-semibold text-white">
              Film<span className="text-[#E2D609]">Quest</span>
            </h2>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 justify-center space-x-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold ${router.pathname === href ? "text-[#E2D609] active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side — Sign in + hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button title="Sign in" />
            </div>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                className="hamburger-line block h-0.5 bg-white"
                style={{
                  width: 24,
                  transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none",
                }}
              />
              <span
                className="hamburger-line block h-0.5 bg-white"
                style={{
                  width: 24,
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="hamburger-line block h-0.5 bg-white"
                style={{
                  width: 24,
                  transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — slides down */}
      {menuOpen && (
        <div
          className="mobile-menu md:hidden"
          style={{
            background: "#171D22",
            borderTop: "1px solid rgba(226,214,9,0.15)",
            borderBottom: "1px solid rgba(226,214,9,0.15)",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "16px 24px",
                  textDecoration: "none",
                  fontSize: 18,
                  fontWeight: 600,
                  color: router.pathname === href ? "#E2D609" : "rgba(255,255,255,0.85)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                {label}
                {router.pathname === href && (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E2D609" }} />
                )}
              </Link>
            ))}

            {/* Sign in inside mobile menu */}
            <div style={{ padding: "20px 24px" }}>
              <Button title="Sign in" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;