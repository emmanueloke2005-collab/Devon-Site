import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Hammer,
  Shield,
  Clock,
  Phone,
  Home as HomeIcon,
  Check,
  ChevronDown,
  ArrowRight,
  Droplets,
  Eye,
  CheckCircle,
  HelpCircle,
  Info
} from "lucide-react";
import { SERVICES_DATA, FAQS_DATA, COMPANY_INFO } from "../data";

interface ServicesViewProps {
  openQuoteModal: () => void;
}

export default function ServicesView({ openQuoteModal }: ServicesViewProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const renderServiceIcon = (name: string) => {
    const props = { className: "h-6 w-6 text-accent-orange" };
    switch (name) {
      case "Hammer":
        return <Hammer {...props} />;
      case "Home":
        return <HomeIcon {...props} />;
      case "Shield":
        return <Shield {...props} />;
      case "Clock":
        return <Clock {...props} />;
      case "Droplets":
        return <Droplets {...props} />;
      default:
        return <CheckCircle {...props} />;
    }
  };

  return (
    <div className="overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative bg-navy-dark py-28 text-white">
        <div className="absolute inset-0 z-0 bg-navy-dark">
          <img
            src="/src/assets/images/aerial_roof_worker_1783040856910.jpg"
            alt="Roofing Pattern Background"
            className="w-full h-full object-cover opacity-20 filter grayscale select-none"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/40 to-navy-dark z-1" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-accent-orange/10 border border-accent-orange/30 text-accent-orange px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Guaranteed Craftsmen & Fully Insured</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight"
          >
            Professional Roofing Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-light"
          >
            Reliable roofing solutions for Yorkshire homes and businesses. Built to safeguard your assets for decades.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: ALTERNATING DETAILED SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {SERVICES_DATA.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-slate-100 pb-16 last:border-0 last:pb-0 scroll-mt-24`}
              >
                {/* Image Section: Alternating left/right */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-5 relative ${!isEven ? "lg:order-2" : ""}`}
                >
                  <div className="absolute inset-0 bg-navy-dark rounded-3xl transform translate-x-2 translate-y-2 opacity-5 -z-10" />
                  <div className="overflow-hidden rounded-3xl shadow-lg border border-slate-100">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-auto object-cover max-h-[360px] hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Decorative badge on image corner */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-navy-dark p-2.5 rounded-2xl shadow-md border border-slate-100 font-bold flex items-center space-x-1">
                    {renderServiceIcon(service.iconName)}
                  </div>
                </motion.div>

                {/* Text Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-7 space-y-6 ${!isEven ? "lg:order-1" : ""}`}
                >
                  <div className="inline-flex items-center space-x-2 text-accent-orange font-bold uppercase text-xs tracking-wider">
                    <span className="h-1 w-6 bg-accent-orange" />
                    <span>Certified Solution</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-dark leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {service.details}
                  </p>

                  {/* Benefits Checklist */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-navy-dark uppercase tracking-widest block mb-1">
                      Key Service Benefits:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-start space-x-2 text-sm text-slate-600">
                          <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={openQuoteModal}
                      className="w-full sm:w-auto bg-navy-dark hover:bg-accent-orange text-white hover:text-navy-dark font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Request Free Quote</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="w-full sm:w-auto border border-slate-300 hover:border-navy-dark text-slate-700 hover:text-navy-dark font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors text-center block"
                    >
                      Call direct: {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: PROCESS SECTION (Beautiful Horizontal Timeline) */}
      <section id="process-timeline" className="py-20 bg-section-bg border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 text-accent-orange font-bold uppercase text-xs tracking-wider">
              <span className="h-1 w-8 bg-accent-orange" />
              <span>Transparent Project Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark leading-tight">
              Our Process: 4 Steps To Premium Quality
            </h2>
            <p className="text-slate-600 text-sm">
              From our initial zero-obligation photographic assessment to final meticulous site sweep, we prioritize speed, cleanliness, and communication.
            </p>
          </div>

          {/* Horizontal timeline cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "1",
                title: "Inspection",
                desc: "We conduct a complete high-resolution drone inspection or ladder survey to trace the exact source of any damage or wear."
              },
              {
                step: "2",
                title: "Free Quote",
                desc: "We present a comprehensive, itemized written estimate detailing roofing material specifications, costs, and timeline."
              },
              {
                step: "3",
                title: "Work Begins",
                desc: "Our highly experienced certified roofers complete the work under rigorous safety controls with daily site tidying."
              },
              {
                step: "4",
                title: "Final Inspection",
                desc: "We inspect every joint, valley, and tile alongside you. We hand over physical warranty papers only when you are 100% happy."
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative flex flex-col justify-between group hover:shadow-md transition-shadow"
              >
                {/* Connective line indicator for md screens and larger */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 left-[calc(100%-8px)] w-[calc(100%-16px)] h-0.5 bg-slate-200 group-hover:bg-accent-orange transition-colors z-0" />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-navy-dark text-white font-display font-bold text-xl rounded-full flex items-center justify-center mb-6 group-hover:bg-accent-orange group-hover:text-navy-dark transition-colors border-2 border-white shadow">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-display font-bold text-navy-dark mb-2 group-hover:text-accent-orange transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: EMERGENCY BANNER (24 Hour Emergency Roofing) */}
      <section className="py-12 bg-accent-orange text-navy-dark relative z-10 overflow-hidden shadow-lg">
        {/* Pulsing visual circles */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full filter blur-xl animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-navy-dark/5 rounded-full filter blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="bg-navy-dark p-3.5 rounded-full text-accent-orange animate-bounce">
              <Phone className="h-6 w-6 text-accent-orange" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-navy-dark block">
                Active Rain & Storm Leak Hotline
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-navy-dark leading-tight mt-0.5">
                24 Hour Emergency Roofing Repairs
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full sm:w-auto text-center bg-navy-dark hover:bg-white text-white hover:text-navy-dark font-extrabold text-sm uppercase tracking-wider py-3.5 px-8 rounded-full transition-colors flex items-center justify-center space-x-2 shadow-md"
            >
              <Phone className="h-4 w-4" />
              <span>Call +44 7835 375466</span>
            </a>
            <div className="hidden sm:block text-xs font-bold text-navy-dark/80 tracking-wide uppercase">
              Average On-Site Response: Under 2h
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ ACCORDION (With smooth transitions) */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 text-accent-orange font-bold uppercase text-xs tracking-wider">
              <span className="h-1 w-8 bg-accent-orange" />
              <span>Have Any Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark leading-tight">
              Roofing FAQs & Expert Clarification
            </h2>
            <p className="text-slate-600 text-sm">
              Read transparent answers regarding costs, insurance claims, work guarantees, and project lifecycles.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-shadow hover:shadow"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                  >
                    <span className="font-display font-bold text-navy-dark text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-400 p-1 bg-slate-50 rounded-lg group-hover:text-accent-orange shrink-0 ml-4"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-slate-50"
                      >
                        <div className="p-5 border-t border-slate-100 text-sm sm:text-base text-slate-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Friendly notice box */}
          <div className="bg-blue-50/50 rounded-2xl p-4 mt-8 border border-blue-100/40 flex items-start space-x-3 text-slate-600 text-xs">
            <Info className="h-4 w-4 text-sky-600 mt-0.5 shrink-0" />
            <p>
              Can't find what you are looking for? Our helpful team is on hand 24 hours a day to assist. Simply drop us an inquiry or phone our team direct.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section className="bg-navy-dark text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-navy-dark">
          <img
            src="/src/assets/images/hero_roof_install_1783040819790.jpg"
            alt="Beautiful Home Roof Replacement"
            className="w-full h-full object-cover opacity-10 select-none"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/70 to-navy-dark/90 z-1" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            Need Roofing Experts?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Book your 100% free physical site survey and itemized written quotation. Zero pressure, premium service.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              onClick={openQuoteModal}
              className="w-full sm:w-auto bg-accent-orange hover:bg-white text-navy-dark hover:text-navy-dark font-extrabold text-sm uppercase tracking-wider py-4 px-8 rounded-full shadow-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Request Free Quote</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full sm:w-auto border-2 border-white/50 hover:border-white text-white font-extrabold text-sm uppercase tracking-wider py-4 px-8 rounded-full transition-colors block text-center"
            >
              Call Hotline: {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
