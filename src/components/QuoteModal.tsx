import { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, Shield, AlertTriangle, Phone, Clock } from "lucide-react";
import { SERVICES_DATA, COMPANY_INFO } from "../data";
import { Inquiry } from "../types";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
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

    if (!formData.name || !formData.phone || !formData.serviceNeeded) {
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

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
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop glass blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg relative z-10 border border-slate-100 flex flex-col max-h-[90vh]"
          >
            {/* Header branding block */}
            <div className="bg-navy-dark p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close quote modal"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="text-[10px] text-accent-orange font-bold uppercase tracking-widest block mb-1">
                JRN Fast Response Survey
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
                Request Your Free Quote
              </h3>
              <p className="text-slate-300 text-xs mt-1">
                No deposit needed. Average adviser call-back: 10 minutes.
              </p>
            </div>

            {/* Content area */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="mx-auto bg-emerald-50 text-emerald-600 p-4 rounded-full w-16 h-16 flex items-center justify-center border border-emerald-100">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-display font-extrabold text-navy-dark">
                    Submission Successful!
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                    Excellent, <strong>{submittedInquiry?.name}</strong>. Your request for <strong>{submittedInquiry?.serviceNeeded}</strong> has been logged. Our surveyor will call you shortly on:
                  </p>
                  <p className="text-lg font-bold text-navy-dark tracking-tight bg-slate-50 p-3 rounded-xl border border-slate-100 max-w-xs mx-auto">
                    {submittedInquiry?.phone}
                  </p>
                  <div className="pt-4 flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        setFormStatus("idle");
                        onClose();
                      }}
                      className="bg-navy-dark hover:bg-accent-orange text-white hover:text-navy-dark text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-full transition-colors"
                    >
                      Close Window
                    </button>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-xs font-bold text-accent-orange hover:underline flex items-center justify-center space-x-1"
                    >
                      <Phone className="h-3 w-3" />
                      <span>Or call immediately: {COMPANY_INFO.phoneDisplay}</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="modal-name" className="text-xs font-bold text-navy-dark uppercase tracking-wide">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. David Thompson"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent-orange bg-slate-50/50 text-sm font-medium text-navy-dark"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="modal-phone" className="text-xs font-bold text-navy-dark uppercase tracking-wide">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 07835 375466"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent-orange bg-slate-50/50 text-sm font-medium text-navy-dark"
                    />
                  </div>

                  {/* Service */}
                  <div className="space-y-1">
                    <label htmlFor="modal-service" className="text-xs font-bold text-navy-dark uppercase tracking-wide">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="modal-service"
                      name="serviceNeeded"
                      required
                      value={formData.serviceNeeded}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent-orange bg-slate-50/50 text-sm font-medium text-navy-dark cursor-pointer"
                    >
                      <option value="">Select service...</option>
                      {SERVICES_DATA.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                      <option value="Other / Multi-Service Quote">Other / Multi-Service Quote</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label htmlFor="modal-message" className="text-xs font-bold text-navy-dark uppercase tracking-wide">
                      Message details <span className="text-slate-400">(Optional)</span>
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Specify slate types, leaks, or roof size details..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent-orange bg-slate-50/50 text-sm font-medium text-navy-dark resize-none"
                    />
                  </div>

                  {formStatus === "error" && (
                    <div className="bg-red-50 text-red-700 p-3.5 rounded-xl text-xs flex items-center space-x-2 border border-red-100">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>Please complete all mandatory * fields.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full bg-navy-dark hover:bg-accent-orange text-white hover:text-navy-dark font-extrabold text-sm uppercase tracking-wider py-3.5 px-6 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 shadow"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting details...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Details</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Footer Trust Bar */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 text-[10px] text-slate-500 flex justify-between items-center">
              <div className="flex items-center space-x-1.5">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span>Fully Insured & Certified</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="h-4 w-4 text-accent-orange" />
                <span>Active Hotline: Open 24/7</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
