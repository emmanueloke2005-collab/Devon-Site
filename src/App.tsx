import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Phone, Calendar, ChevronUp, Hammer, Clock, Shield } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import ContactView from "./components/ContactView";
import QuoteModal from "./components/QuoteModal";
import Lightbox from "./components/Lightbox";
import { COMPANY_INFO } from "./data";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Lightbox State
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    url: "",
    title: "",
    description: ""
  });

  // Top Page Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Premium loading timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    // Scroll state tracking
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenLightbox = (url: string, title: string, description: string) => {
    setLightboxState({
      isOpen: true,
      url,
      title,
      description
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. PREMIUM SPLASH LOADING SCREEN */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-navy-dark z-[100] flex flex-col items-center justify-center text-white"
          >
            <div className="text-center space-y-6 max-w-sm px-4">
              {/* Spinning / Pulsing Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block bg-accent-orange p-4 rounded-2xl text-navy-dark mx-auto shadow-xl"
              >
                <Hammer className="h-10 w-10" />
              </motion.div>

              <div className="space-y-1">
                <motion.h1
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-display font-black text-2xl tracking-wider text-white"
                >
                  JRN ROOFING
                </motion.h1>
                <motion.span
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.8 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs uppercase tracking-widest text-accent-orange font-bold block"
                >
                  Premium Yorkshire Contractors
                </motion.span>
              </div>

              {/* Progress Indicator */}
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto mt-6">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-full bg-accent-orange"
                />
              </div>

              <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center space-x-1">
                <Shield className="h-3 w-3 text-emerald-500" />
                <span>Fully Insured &amp; Certified Roofing</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Wrapper */}
      <div className="relative min-h-screen bg-white">
        {/* 2. SCROLL PROGRESS BAR */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-accent-orange origin-left z-[101]"
          style={{ scaleX }}
        />

        {/* 3. PREMIUM NAVBAR */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          openQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* 4. ACTIVE PAGE SWITCHER (With Page transitions) */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {currentPage === "home" && (
                <HomeView
                  setCurrentPage={setCurrentPage}
                  openQuoteModal={() => setIsQuoteModalOpen(true)}
                  onOpenLightbox={handleOpenLightbox}
                />
              )}
              {currentPage === "services" && (
                <ServicesView openQuoteModal={() => setIsQuoteModalOpen(true)} />
              )}
              {currentPage === "contact" && <ContactView />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 5. FOOTER */}
        <Footer
          setCurrentPage={setCurrentPage}
          openQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* 6. FIXED CONVERSION FLOAT BUTTONS (Sticky call and quote) */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 pointer-events-none">
          {/* Back to top button */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                onClick={handleScrollToTop}
                className="bg-navy-dark hover:bg-accent-orange text-white hover:text-navy-dark p-3.5 rounded-full shadow-2xl border border-white/10 transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-none"
                title="Scroll back to top"
              >
                <ChevronUp className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Floating Call CTA - Pulsing Orange */}
          <motion.a
            href={`tel:${COMPANY_INFO.phone}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-accent-orange text-navy-dark p-4 rounded-full shadow-2xl border border-accent-orange/30 transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-110 flex items-center justify-center animate-pulse-orange"
            title="Call emergency hotline (24/7)"
          >
            <Phone className="h-6 w-6" />
          </motion.a>

          {/* Floating Quote CTA */}
          <motion.button
            onClick={() => setIsQuoteModalOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-navy-dark text-white hover:text-accent-orange p-4 rounded-full shadow-2xl border border-white/10 transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-110 flex items-center justify-center"
            title="Request Free Roofing Quote"
          >
            <Calendar className="h-6 w-6" />
          </motion.button>
        </div>

        {/* 7. PORTAL MODALS */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
        />

        <Lightbox
          isOpen={lightboxState.isOpen}
          photoUrl={lightboxState.url}
          title={lightboxState.title}
          description={lightboxState.description}
          onClose={handleCloseLightbox}
        />
      </div>
    </>
  );
}

