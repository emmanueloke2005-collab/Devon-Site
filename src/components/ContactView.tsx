import { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Clock,
  MapPin,
  Mail,
  Shield,
  Star,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Calendar,
  Send,
  CornerRightDown
} from "lucide-react";
import { COMPANY_INFO, SERVICES_DATA } from "../data";
import { Inquiry } from "../types";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceNeeded: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submittedInquiry, setSubmittedInquiry] = useState<Inquiry | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.phone || !formData.serviceNeeded) {
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    // Simulate Server Post
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: "inq-" + Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        serviceNeeded: formData.serviceNeeded,
        message: formData.message,
        date: new Date().toLocaleDateString()
      };

      // Save to local storage for realistic persistence
      const currentInquiries: Inquiry[] = JSON.parse(localStorage.getItem("jrn_inquiries") || "[]");
      currentInquiries.push(newInquiry);
      localStorage.setItem("jrn_inquiries", JSON.stringify(currentInquiries));

      setSubmittedInquiry(newInquiry);
      setFormStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        serviceNeeded: "",
        message: ""
      });
    }, 1200);
  };

  return (
    <div className="overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative bg-navy-dark py-28 text-white">
        <div className="absolute inset-0 z-0 bg-navy-dark">
          <img
            src="/src/assets/images/aerial_roof_worker_1783040856910.jpg"
            alt="Drone Aerial Coverage Map Background"
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
            className="inline-flex items-center space-x-2 bg-accent-orange/15 border border-accent-orange/30 text-accent-orange px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>24/7 Immediate Site Survey Reservations</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight"
          >
            Get Your Free Roofing Quote
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-light"
          >
            Enter your details below and a Yorkshire roofing expert will contact you within minutes.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: CONTACT CARDS GRID */}
      <section className="py-12 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Phone className="h-6 w-6 text-accent-orange" />,
                title: "Call Our Office",
                value: COMPANY_INFO.phoneDisplay,
                desc: "24 Hours Direct Line",
                link: `tel:${COMPANY_INFO.phone}`
              },
              {
                icon: <Clock className="h-6 w-6 text-accent-orange" />,
                title: "Opening Hours",
                value: "Open 24/7",
                desc: "Including Bank Holidays",
                link: null
              },
              {
                icon: <AlertTriangle className="h-6 w-6 text-accent-orange" />,
                title: "Emergency Response",
                value: "Leeds & Surrounding",
                desc: "On-site under 2 hours",
                link: `tel:${COMPANY_INFO.phone}`
              },
              {
                icon: <MapPin className="h-6 w-6 text-accent-orange" />,
                title: "Coverage Area",
                value: "Yorkshire Wide",
                desc: "Fully Mobile Crew",
                link: null
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4 hover:border-accent-orange/30 transition-colors"
              >
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">{card.icon}</div>
                <div>
                  <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider">{card.title}</h3>
                  {card.link ? (
                    <a
                      href={card.link}
                      className="text-lg font-extrabold text-navy-dark hover:text-accent-orange block mt-1 transition-colors"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <span className="text-lg font-extrabold text-navy-dark block mt-1">{card.value}</span>
                  )}
                  <p className="text-xs text-slate-500 mt-1">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FORM & LOCALIZATION GRID */}
      <section className="py-12 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left side: Premium Contact Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
              <div className="mb-8 space-y-2">
                <span className="text-xs font-bold text-accent-orange uppercase tracking-widest block">
                  Interactive Request Form
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-dark">
                  Request Your Free physical Survey & Quote
                </h2>
                <p className="text-slate-500 text-sm">
                  Provide your telephone details and select your required roofing service. We never share your data.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-bold text-navy-dark uppercase tracking-wide">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Smith"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 bg-slate-50/50 text-navy-dark font-medium transition-all text-sm"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-bold text-navy-dark uppercase tracking-wide">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 07835 375466"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 bg-slate-50/50 text-navy-dark font-medium transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email Input */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-navy-dark uppercase tracking-wide">
                      Email Address <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@outlook.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 bg-slate-50/50 text-navy-dark font-medium transition-all text-sm"
                    />
                  </div>

                  {/* Service needed Dropdown */}
                  <div className="space-y-1">
                    <label htmlFor="serviceNeeded" className="text-xs font-bold text-navy-dark uppercase tracking-wide">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="serviceNeeded"
                      name="serviceNeeded"
                      required
                      value={formData.serviceNeeded}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 bg-slate-50/50 text-navy-dark font-medium transition-all text-sm cursor-pointer"
                    >
                      <option value="">Select service...</option>
                      {SERVICES_DATA.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                      <option value="Other / Free Drone Survey">Other / Free Drone Survey</option>
                    </select>
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-bold text-navy-dark uppercase tracking-wide">
                    Project Details / Message <span className="text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details of your leak, damage, or required replacement roof style..."
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/10 bg-slate-50/50 text-navy-dark font-medium transition-all text-sm resize-none"
                  />
                </div>

                {/* Error/Notice state */}
                {formStatus === "error" && (
                  <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-xs flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>Please fill in all mandatory fields marked with an asterisk (*).</span>
                  </div>
                )}

                {/* Success feedback state */}
                <AnimatePresence>
                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-5 rounded-2xl space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                        <span className="font-bold text-sm">Quote Request Received Safely!</span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        Thank you <strong>{submittedInquiry?.name}</strong>. Your inquiry for <strong>{submittedInquiry?.serviceNeeded}</strong> was successfully persisted. A roofing advisor will call you shortly on <strong>{submittedInquiry?.phone}</strong>.
                      </p>
                      <div className="text-[10px] text-slate-400">
                        Reference Number: {submittedInquiry?.id}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full bg-navy-dark hover:bg-accent-orange text-white hover:text-navy-dark font-extrabold text-sm uppercase tracking-wider py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting details...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Quote Proposal</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right side: Map and coverage information */}
            <div className="lg:col-span-5 space-y-6">
              {/* Custom SVG Service map */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
                <span className="text-xs font-bold text-accent-orange uppercase tracking-widest block mb-1">
                  Our Service Region
                </span>
                <h3 className="text-lg font-display font-extrabold text-navy-dark mb-4">
                  Yorkshire Wide Coverage Map
                </h3>

                {/* Styled Vector Map representing Yorkshire cities */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl h-64 relative flex items-center justify-center overflow-hidden">
                  {/* Decorative geographic grid lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

                  {/* Active Radar Rings around Leeds */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="absolute inline-flex h-16 w-16 rounded-full bg-accent-orange/10 animate-ping" />
                    <span className="absolute inline-flex h-24 w-24 rounded-full bg-accent-orange/5 animate-pulse" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-orange" />
                  </div>

                  {/* Location Pin Nodes */}
                  <div className="absolute top-[40%] left-[30%] flex flex-col items-center">
                    <span className="w-2.5 h-2.5 bg-navy-dark rounded-full shadow border border-white" />
                    <span className="text-[10px] font-bold text-slate-500 mt-1">Harrogate</span>
                  </div>

                  <div className="absolute top-[35%] left-[65%] flex flex-col items-center">
                    <span className="w-2.5 h-2.5 bg-navy-dark rounded-full shadow border border-white" />
                    <span className="text-[10px] font-bold text-slate-500 mt-1">York</span>
                  </div>

                  <div className="absolute top-[52%] left-[48%] flex flex-col items-center">
                    <span className="text-[11px] font-black text-navy-dark">Leeds (HQ)</span>
                  </div>

                  <div className="absolute top-[70%] left-[35%] flex flex-col items-center">
                    <span className="w-2.5 h-2.5 bg-navy-dark rounded-full shadow border border-white" />
                    <span className="text-[10px] font-bold text-slate-500 mt-1">Bradford</span>
                  </div>

                  <div className="absolute top-[65%] left-[58%] flex flex-col items-center">
                    <span className="w-2.5 h-2.5 bg-navy-dark rounded-full shadow border border-white" />
                    <span className="text-[10px] font-bold text-slate-500 mt-1">Wakefield</span>
                  </div>

                  {/* Watermark text */}
                  <div className="absolute bottom-3 right-4 text-[9px] font-bold uppercase tracking-widest text-slate-300">
                    Map not to scale
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 rounded-full bg-accent-orange inline-block" />
                    <span>HQ/Primary Depot</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="h-2 w-2 rounded-full bg-navy-dark inline-block" />
                    <span>Regional Response Node</span>
                  </div>
                </div>
              </div>

              {/* Service Areas Card */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <h3 className="font-display font-bold text-navy-dark text-base border-b border-slate-100 pb-2 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-accent-orange" />
                  <span>Local Coverage Areas</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We maintain multiple rapid-response trucks dispatched from Leeds and York daily to cover all areas below:
                </p>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-600">
                  {COMPANY_INFO.coverageAreas.map((area) => (
                    <div key={area} className="flex items-center space-x-1 p-1 bg-slate-50 rounded border border-slate-100">
                      <span className="text-emerald-600">&bull;</span>
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business operating hours details */}
              <div className="bg-navy-dark p-6 rounded-3xl text-white space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl" />
                <h3 className="font-display font-bold text-white text-base border-b border-white/10 pb-2 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-accent-orange" />
                  <span>Business Working Hours</span>
                </h3>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-bold text-white">Open 24 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturdays & Sundays</span>
                    <span className="font-bold text-white">Open 24 Hours</span>
                  </div>
                  <div className="flex justify-between text-accent-orange">
                    <span>Bank Holidays / Storms</span>
                    <span className="font-bold">Active 24/7 Hotline</span>
                  </div>
                </div>
                <div className="pt-2 text-[10px] text-slate-400 flex items-center space-x-2 border-t border-white/10">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  <span>Public Liability fully approved.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: REVIEW CTA (Leave us a Google Review) */}
      <section className="py-16 bg-white relative z-10 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <div className="flex justify-center text-yellow-400 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-dark leading-tight">
            Had Work Done By JRN Roofing Contractors?
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Your reviews are vital to supporting our local family business. Click below to leave your honest Google rating.
          </p>
          <div className="pt-2">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-navy-dark font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors shadow"
            >
              <Star className="h-4 w-4 fill-current" />
              <span>Leave a Google Review</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="bg-navy-dark text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/95 to-slate-grey opacity-95" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-display font-extrabold tracking-tight">
            Need Roofing Repairs or Quote Today?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Reach out to our emergency line directly or send your inquiry details above.
          </p>
          <div className="pt-4">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center space-x-2 bg-accent-orange text-navy-dark font-extrabold text-sm uppercase tracking-wider py-4 px-8 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300"
            >
              <Phone className="h-4 w-4" />
              <span>Call +44 7835 375466 Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
