import { Hammer, Phone, Mail, Clock, MapPin, Star, Shield, CheckCircle } from "lucide-react";
import { COMPANY_INFO, SERVICES_DATA } from "../data";

interface FooterProps {
  setCurrentPage: (page: string) => void;
  openQuoteModal: () => void;
}

export default function Footer({ setCurrentPage, openQuoteModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handlePageClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-dark text-white border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative absolute glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-orange/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Ratings */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handlePageClick("home")}>
              <div className="bg-accent-orange p-2 rounded-lg text-navy-dark">
                <Hammer className="h-6 w-6" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white tracking-tight block">
                  JRN ROOFING
                </span>
                <span className="text-[10px] text-accent-orange font-bold uppercase tracking-widest block">
                  Contractors
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Premium roofing services built on local trust, elite craftsmanship, and prompt reliable response times. Serving homeowners and commercial clients across Yorkshire 24/7.
            </p>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-sm text-white">4.8 / 5</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Based on 32 verified Google reviews</p>
              <div className="mt-2 text-xs text-accent-orange font-bold flex items-center space-x-1">
                <CheckCircle className="h-3 w-3" />
                <span>100% Satisfied Customers</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-base text-white tracking-wide mb-6 uppercase border-b border-white/10 pb-2">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      setCurrentPage("services");
                      // Let scroll handle it
                      setTimeout(() => {
                        const element = document.getElementById(service.id);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }, 100);
                    }}
                    className="hover:text-accent-orange transition-colors duration-200 text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Coverage & Info */}
          <div>
            <h3 className="font-display font-semibold text-base text-white tracking-wide mb-6 uppercase border-b border-white/10 pb-2">
              Coverage Areas
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              We provide full insurance-approved support and roof restorations throughout:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              {COMPANY_INFO.coverageAreas.slice(0, 10).map((area) => (
                <div key={area} className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-accent-orange shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center space-x-2 text-xs text-slate-300">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Fully Insured up to £5M</span>
            </div>
          </div>

          {/* Column 4: Contact details */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-semibold text-base text-white tracking-wide mb-6 uppercase border-b border-white/10 pb-2">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-start space-x-3 group text-slate-300 hover:text-accent-orange transition-colors"
                >
                  <Phone className="h-5 w-5 text-accent-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block uppercase">24/7 Hotline</span>
                    <span className="text-base font-bold text-white group-hover:text-accent-orange transition-colors">
                      {COMPANY_INFO.phoneDisplay}
                    </span>
                  </div>
                </a>

                <div className="flex items-start space-x-3 text-slate-300">
                  <Clock className="h-5 w-5 text-accent-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block uppercase">Working Hours</span>
                    <span className="text-sm font-semibold text-white">Open 24 Hours / 7 Days</span>
                  </div>
                </div>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start space-x-3 group text-slate-300 hover:text-accent-orange transition-colors"
                >
                  <Mail className="h-5 w-5 text-accent-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block uppercase">Email Support</span>
                    <span className="text-sm font-semibold text-white group-hover:text-accent-orange">
                      {COMPANY_INFO.email}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <button
              onClick={openQuoteModal}
              className="w-full bg-accent-orange hover:bg-white text-navy-dark hover:text-navy-dark font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all duration-300"
            >
              Get Free Survey & Quote
            </button>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0">
          <div>
            &copy; {currentYear} {COMPANY_INFO.name}. All Rights Reserved. Fully Certified & Insured UK Contractors.
          </div>
          <div className="flex space-x-6">
            <button onClick={() => handlePageClick("home")} className="hover:text-accent-orange transition-colors">
              Home
            </button>
            <button onClick={() => handlePageClick("services")} className="hover:text-accent-orange transition-colors">
              Our Services
            </button>
            <button onClick={() => handlePageClick("contact")} className="hover:text-accent-orange transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
