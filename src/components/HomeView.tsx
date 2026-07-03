import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Hammer,
  Shield,
  Clock,
  Phone,
  Home as HomeIcon,
  CheckCircle,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  AlertCircle,
  TrendingUp,
  Award,
  Users
} from "lucide-react";
import { COMPANY_INFO, SERVICES_DATA, REVIEWS_DATA, PROJECTS_DATA } from "../data";

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
  openQuoteModal: () => void;
  onOpenLightbox: (photoUrl: string, title: string, desc: string) => void;
}

// Letter reveal animation config
const sentenceContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    }
  }
};

const letterVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Counter helper component
function StatCounter({ value, suffix = "", text }: { value: number; suffix?: string; text: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 1500;
          const stepTime = Math.max(Math.floor(duration / end), 15);
          const timer = setInterval(() => {
            start += Math.ceil(end / 40);
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, stepTime);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={elementRef} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
      <div className="text-4xl md:text-5xl font-display font-extrabold text-navy-dark tracking-tight mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-xs md:text-sm text-slate-500 font-medium tracking-wide uppercase">{text}</div>
    </div>
  );
}

export default function HomeView({ setCurrentPage, openQuoteModal, onOpenLightbox }: HomeViewProps) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect for hero background
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  const headlineText = "Protecting Homes With Roofing Built To Last";

  // Map service card icons
  const renderIcon = (name: string, colorClass: string) => {
    const props = { className: `h-6 w-6 ${colorClass}` };
    switch (name) {
      case "Hammer":
        return <Hammer {...props} />;
      case "Home":
        return <HomeIcon {...props} />;
      case "Shield":
        return <Shield {...props} />;
      case "Clock":
        return <Clock {...props} />;
      case "CheckCircle":
        return <CheckCircle {...props} />;
      default:
        return <Hammer {...props} />;
    }
  };

  return (
    <div className="overflow-hidden">
      {/* SECTION 1: HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Cinematic slowly-zooming roofing backdrop */}
        <motion.div
          style={{ y: heroBgY, scale: heroBgScale }}
          className="absolute inset-0 z-0 bg-navy-dark"
        >
          <img
            src="/src/assets/images/hero_roof_install_1783040819790.jpg"
            alt="Premium Roofing Craftsmen"
            className="w-full h-full object-cover opacity-50 select-none"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Deep Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-navy-dark/40 to-navy-dark/95 z-1" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-accent-orange/90 backdrop-blur-sm text-navy-dark font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6 shadow-lg border border-accent-orange/25"
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>⭐⭐⭐⭐⭐ 4.8 Google Rated</span>
          </motion.div>

          {/* Letter Reveal Headline */}
          <motion.h1
            variants={sentenceContainer}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto"
          >
            {headlineText.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-3 sm:mr-4">
                {word.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariant} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Animated Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-base sm:text-xl text-slate-200/90 leading-relaxed max-w-3xl mx-auto font-light"
          >
            Professional roof repairs, complete roof replacements, 24/7 emergency services, and premium gutter installations across Yorkshire.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full sm:w-auto bg-accent-orange text-navy-dark font-extrabold text-sm uppercase tracking-wider py-4 px-8 rounded-full shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 animate-pulse-orange"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now (24/7 Support)</span>
            </a>
            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm uppercase tracking-wider py-4 px-8 rounded-full border border-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Get A Free Quote</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Scrolling indicator animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer"
            onClick={() => {
              const element = document.getElementById("trust-bar");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-accent-orange rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ANIMATED TRUST BAR */}
      <div id="trust-bar" className="bg-navy-dark border-y border-white/10 py-6 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center">
            {[
              { text: "⭐⭐⭐⭐⭐ 4.8 Rating", label: "Google Verified" },
              { text: "32+ Happy Customers", label: "Local Reviews" },
              { text: "Open 24 Hours", label: "All Day Support" },
              { text: "Emergency Response", label: "Within 2 Hours" },
              { text: "Fully Insured", label: "£5m Public Liability" },
              { text: "Fast Free Quotes", label: "Zero Obligation" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-2"
              >
                <span className="text-sm sm:text-base font-bold text-white font-display">{item.text}</span>
                <span className="text-[10px] text-accent-orange font-bold uppercase tracking-wider mt-0.5">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: ABOUT SECTION */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Split Layout Image: Slightly floats */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-accent-orange rounded-3xl transform translate-x-3 translate-y-3 -z-10 opacity-10" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="overflow-hidden rounded-3xl shadow-xl border border-slate-100"
              >
                <img
                  src="/src/assets/images/roof_inspection_1783040833637.jpg"
                  alt="Roof Inspection Process"
                  className="w-full h-auto object-cover object-center max-h-[480px]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              {/* Overlay Badge */}
              <div className="absolute -bottom-6 -right-4 bg-navy-dark text-white p-4 rounded-2xl shadow-xl border border-white/10 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-accent-orange p-2.5 rounded-xl text-navy-dark">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Workmanship</p>
                    <p className="text-sm font-bold text-white">Fully Guaranteed Work</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Split Layout Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center space-x-2 text-accent-orange font-bold uppercase text-xs tracking-wider">
                <span className="h-1 w-8 bg-accent-orange" />
                <span>About JRN Roofing Contractors</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark leading-tight">
                Trusted Roofing Specialists You Can Rely On
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                With deep family-run values and seasoned industrial experience, JRN Roofing Contractors provides the ultimate peace of mind. We specialize in fast-response roof repairs, complete slate re-roofing, flat roofing membranes, and high-capacity gutter drainage installations.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Our approach is transparent: we visit your site, perform a meticulous diagnostic inspection, and deliver an itemized fixed written quotation with no hidden fees and zero obligation. Every job is completed with maximum safety compliance and structural workmanship guarantees.
              </p>

              {/* Icon Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { text: "Fully Insured (£5m)", desc: "Full peace of mind" },
                  { text: "Open 24/7", desc: "Always there for emergencies" },
                  { text: "Local Yorkshire Experts", desc: "Reliable & fast response" },
                  { text: "Family Business Feel", desc: "Friendly, humble service" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-2.5">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-navy-dark">{item.text}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setCurrentPage("services")}
                  className="bg-navy-dark hover:bg-accent-orange text-white hover:text-navy-dark font-bold text-sm uppercase tracking-wider py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2 group"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES GRID */}
      <section className="py-20 bg-section-bg border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 text-accent-orange font-bold uppercase text-xs tracking-wider">
              <span className="h-1 w-8 bg-accent-orange" />
              <span>What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark leading-tight">
              Six Premium Services Built For Complete Weatherproofing
            </h2>
            <p className="text-slate-600">
              We employ state-of-the-art diagnostic testing, natural roofing slates, heavy-duty uPVC frameworks, and waterproof membranes to ensure your property remains perfectly secure.
            </p>
          </div>

          {/* Service Cards Grid (Elevate on Hover, Animate Icons) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between group transition-shadow hover:shadow-xl relative overflow-hidden"
              >
                {/* Accent glow line inside */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy-dark to-accent-orange opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-navy-dark/5 group-hover:bg-accent-orange/10 p-3 rounded-xl text-navy-dark group-hover:text-accent-orange transform group-hover:scale-110 transition-all duration-300">
                      {renderIcon(service.iconName, "text-navy-dark group-hover:text-accent-orange")}
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-accent-orange uppercase tracking-widest transition-colors">
                      JRN Quality
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-extrabold text-navy-dark mb-3 group-hover:text-accent-orange transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCurrentPage("services");
                      setTimeout(() => {
                        const el = document.getElementById(service.id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }, 100);
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-navy-dark group-hover:text-accent-orange flex items-center space-x-1 transition-colors"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={openQuoteModal}
                    className="text-xs font-bold text-slate-400 group-hover:text-navy-dark hover:underline transition-colors"
                  >
                    Get Quote
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                setCurrentPage("services");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center space-x-2 border-2 border-navy-dark hover:border-accent-orange text-navy-dark hover:text-accent-orange font-bold text-sm uppercase tracking-wider py-3.5 px-8 rounded-full transition-colors"
            >
              <span>View All Detailed Services</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE US */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 text-accent-orange font-bold uppercase text-xs tracking-wider">
                <span className="h-1 w-8 bg-accent-orange" />
                <span>Why Choose JRN Roofing</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark leading-tight">
                Premier Craftsmanship Backed By Ironclad Guarantees
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                As a family-oriented roofing crew, we approach your home with extreme dedication and attention to detail. Here are the core values we bring to every job site.
              </p>

              {/* Animated Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: "Free Quotes & Surveys", desc: "No upfront deposit required" },
                  { title: "Fast Urgent Response", desc: "Usually within 1 to 2 hours" },
                  { title: "Guaranteed Workmanship", desc: "Guarantees up to 20 years" },
                  { title: "Affordable Pricing", desc: "Honest quotes, zero hidden extras" },
                  { title: "Experienced Roofers", desc: "Fully accredited & safe crew" },
                  { title: "Quality Materials Only", desc: "Natural slates and EPDM systems" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-navy-dark text-sm leading-tight">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side Image with subtle float/depth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-4 flex justify-center"
            >
              <div className="absolute inset-0 bg-navy-dark/5 rounded-3xl transform -rotate-2 -z-10" />
              <img
                src="/src/assets/images/aerial_roof_worker_1783040856910.jpg"
                alt="Finishing Slate Roof Details"
                className="rounded-2xl shadow-lg border border-slate-100 w-full object-cover max-h-[440px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-accent-orange text-navy-dark font-extrabold text-xs uppercase tracking-wider py-1.5 px-3 rounded-full shadow">
                Local Reputation
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: STATISTICS SECTION */}
      <section className="py-16 bg-gradient-to-r from-navy-dark to-slate-grey text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value={32} suffix="+" text="Google Reviews" />
            <StatCounter value={1000} suffix="+" text="Roofs Completed" />
            <StatCounter value={24} suffix="/7" text="Emergency Service" />
            <StatCounter value={100} suffix="%" text="Satisfaction Guaranteed" />
          </div>
        </div>
      </section>

      {/* SECTION 7: CUSTOMER REVIEWS (Carousel) */}
      <section className="py-20 bg-section-bg relative z-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 text-accent-orange font-bold uppercase text-xs tracking-wider">
              <span className="h-1 w-8 bg-accent-orange" />
              <span>Google Verified Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark leading-tight">
              Loved By Yorkshire Homeowners & Businesses
            </h2>
            <p className="text-slate-600">
              Read how JRN Roofing Contractors delivers top-tier prompt support, reliable diagnostic repair, and immaculate site tidy-ups.
            </p>
          </div>

          {/* Interactive Carousel */}
          <div className="relative max-w-4xl mx-auto px-4">
            <div className="overflow-hidden bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-slate-100 relative">
              {/* Double quotation icon overlay */}
              <span className="absolute top-4 right-8 text-slate-100 text-8xl font-serif select-none pointer-events-none font-bold">”</span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-400 p-2.5 rounded-xl text-white">
                      <Star className="h-6 w-6 fill-current" />
                    </div>
                    <div>
                      <div className="flex text-yellow-400 mb-0.5">
                        {[...Array(REVIEWS_DATA[activeReviewIndex].rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current shrink-0" />
                        ))}
                      </div>
                      <p className="text-sm font-bold text-navy-dark">{REVIEWS_DATA[activeReviewIndex].author}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-base sm:text-lg italic leading-relaxed">
                    "{REVIEWS_DATA[activeReviewIndex].text}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-accent-orange bg-accent-orange/10 px-3 py-1 rounded-full">
                      {REVIEWS_DATA[activeReviewIndex].service}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      Verified Client &bull; {REVIEWS_DATA[activeReviewIndex].date}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={handlePrevReview}
                className="bg-navy-dark text-white hover:bg-accent-orange hover:text-navy-dark p-3.5 rounded-full shadow-md transition-colors focus:outline-none"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextReview}
                className="bg-navy-dark text-white hover:bg-accent-orange hover:text-navy-dark p-3.5 rounded-full shadow-md transition-colors focus:outline-none"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: GALLERY PREVIEW */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-accent-orange font-bold uppercase text-xs tracking-wider">
                <span className="h-1 w-8 bg-accent-orange" />
                <span>Our Finished Projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark leading-tight">
                Witness Premium Craftsmanship In Action
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentPage("services");
                setTimeout(() => {
                  const el = document.getElementById("process-timeline");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
              }}
              className="inline-flex items-center space-x-2 bg-navy-dark hover:bg-accent-orange text-white hover:text-navy-dark font-bold text-sm uppercase tracking-wider py-3 px-6 rounded-full transition-colors shrink-0"
            >
              <span>See Our Working Process</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Project Cards Grid with Hover Zoom & Lightbox Trigger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS_DATA.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-dark cursor-pointer shadow-sm border border-slate-100"
                onClick={() => onOpenLightbox(project.url, project.title, project.description)}
              >
                <img
                  src={project.url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-70"
                  referrerPolicy="no-referrer"
                />
                {/* Visual Hover Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent-orange bg-accent-orange/10 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                    <ZoomIn className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-bold text-sm tracking-tight">{project.title}</h4>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: CTA BANNER */}
      <section className="relative py-20 text-white text-center overflow-hidden">
        {/* Background Overlay image */}
        <div className="absolute inset-0 z-0 bg-navy-dark">
          <img
            src="/src/assets/images/aerial_roof_worker_1783040856910.jpg"
            alt="Roofing Help CTA Background"
            className="w-full h-full object-cover opacity-20 select-none"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/95 to-slate-grey z-1 opacity-90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-accent-orange/10 inline-flex p-3 rounded-full text-accent-orange border border-accent-orange/20 animate-pulse">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            Need Expert Roofing Help Today?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Whether you have a storm-damaged emergency leak, require professional gutter installation, or would like a fully certified re-roof quotation, our Yorkshire team is available 24/7.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full sm:w-auto bg-accent-orange text-navy-dark font-extrabold text-sm uppercase tracking-wider py-4 px-8 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call JRN Roofing Now</span>
            </a>
            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-navy-dark text-white font-extrabold text-sm uppercase tracking-wider py-4 px-8 rounded-full transition-all duration-300"
            >
              Request Free Written Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
