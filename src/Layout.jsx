import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Menu, X, Phone, Mail, Facebook, Instagram } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = useMemo(
    () => [
      { name: "Home", path: "Home" },
      { name: "Trips", path: "Trips" },
      { name: "Captains", path: "Captains" },
      { name: "Gallery", path: "Gallery" },
      { name: "Where We Launch", path: "Locations" },
      { name: "Book Now", path: "Contact", highlight: true },
    ],
    []
  );

  // Works on localhost + production (even if you ever change base later)
  const BASE = import.meta.env.BASE_URL || "/";
  const img = (p) => `${BASE}${p.replace(/^\//, "")}`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696666cb8b0ce9b9ee0be45f/578cab6ba_background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>{`
        :root {
          --brand-navy: #205090;
          --brand-sky: #5898E8;
          --brand-sky-soft: #5098D0;
          --brand-gold: #D8A860;
          --brand-gold-deep: #D89848;
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-slate-900 text-white sticky top-0 z-[1000] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3">
              <img
                src={img("/images/logo-icon-no-words.png")}
                alt="North South Charters logo"
                className="h-12 w-12"
              />
              <div className="hidden sm:block">
                <img
                  src={img("/images/logo-text.png")}
                  alt="North South Charters"
                  className="h-10"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = currentPageName === link.path;
                const classes = link.highlight
                  ? "text-slate-900 font-semibold"
                  : isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white";

                return (
                  <Link
                    key={link.path}
                    to={createPageUrl(link.path)}
                    className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${classes}`}
                    style={link.highlight ? { backgroundColor: "var(--brand-gold)" } : {}}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = currentPageName === link.path;
                const classes = link.highlight
                  ? "text-slate-900 font-semibold text-center"
                  : isActive
                  ? "bg-slate-700 text-white"
                  : "text-slate-300 hover:bg-slate-700";

                return (
                  <Link
                    key={link.path}
                    to={createPageUrl(link.path)}
                    className={`block px-4 py-3 rounded-lg transition-all ${classes}`}
                    style={link.highlight ? { backgroundColor: "var(--brand-gold)" } : {}}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696666cb8b0ce9b9ee0be45f/0a3cc0b7c_logo-horizontal.png"
                alt="North South Charters"
                className="h-16 mb-4"
              />
              <p className="text-sm">
                Nature Coast Charters. Family-friendly trips, inshore,
                nearshore, scalloping, and island hopping adventures.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-2 text-sm">
                <a
                  href="tel:+18139093901"
                  className="flex items-center space-x-2 hover:opacity-80 transition"
                >
                  <Phone size={16} />
                  <span>(813) 909-3901</span>
                </a>
                <a
                  href="mailto:captfern@nscharters.com"
                  className="flex items-center space-x-2 hover:opacity-80 transition"
                >
                  <Mail size={16} />
                  <span>captfern@nscharters.com</span>
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4 mb-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <Facebook size={24} />
                </a>
              </div>
              <p className="text-sm text-slate-400">Military & First Responder Discounts Available</p>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} North South Charters. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}