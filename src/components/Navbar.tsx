import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Menu, X, Hammer, Star, Calendar } from "lucide-react";
import { COMPANY_INFO } from "../data";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  openQuoteModal: () => void;
}

export default function Navbar({ currentPage, setCurrentPage, openQuoteModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Our Services" },
    { id: "contact", label: "Get a Quote / Contact" }
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-navy-dark/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3"
            : "bg-gradient-to-b from-black/60 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div
              onClick={() => handleNavClick("home")}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="bg-accent-orange p-2 rounded-lg text-navy-dark transform group-hover:rotate-12 transition-transform duration-300">
                <Hammer className="h-6 w-6" />
              </div>
              <div>
                <span className="font-display font-bold text-lg sm:text-xl text-white tracking-tight block">
                  JRN ROOFING
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] text-accent-orange font-bold uppercase tracking-widest block">
                    Contractors
                  </span>
                  <div className="flex items-center text-yellow-400 text-[10px]">
                    <Star className="h-2 w-2 fill-current" />
                    <span className="text-white ml-0.5 font-sans">4.8 Rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                    currentPage === item.id
                      ? "text-accent-orange"
                      : "text-white/90 hover:text-accent-orange"
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-orange"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Actions Section */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full border border-white/20 transition-all duration-300"
              >
                <Phone className="h-4 w-4 text-accent-orange" />
                <span className="text-xs font-semibold">{COMPANY_INFO.phoneDisplay}</span>
              </a>
              <button
                onClick={openQuoteModal}
                className="bg-accent-orange hover:bg-accent-orange/90 text-navy-dark hover:text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center space-x-1.5"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Free Quote</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden space-x-3">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="bg-white/10 p-2 rounded-full text-white hover:text-accent-orange transition-colors"
                title="Call JRN Roofing"
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-accent-orange transition-colors p-1 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-navy-dark/98 backdrop-blur-lg border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-4">
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left py-2 px-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                        currentPage === item.id
                          ? "text-accent-orange bg-white/5"
                          : "text-white/80 hover:text-accent-orange hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-xl border border-white/10 transition-colors w-full"
                  >
                    <Phone className="h-4 w-4 text-accent-orange" />
                    <span className="text-sm font-bold">{COMPANY_INFO.phoneDisplay} (24/7)</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openQuoteModal();
                    }}
                    className="bg-accent-orange hover:bg-accent-orange/90 text-navy-dark hover:text-white py-3 px-4 rounded-xl text-sm font-bold text-center transition-colors w-full"
                  >
                    Request Free Quote
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
