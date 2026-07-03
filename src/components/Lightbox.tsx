import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, Calendar, Shield, MapPin } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  photoUrl: string;
  title: string;
  description: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, photoUrl, title, description, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
          />

          {/* Image viewer Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-navy-dark rounded-3xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-4xl relative z-10 flex flex-col md:flex-row max-h-[85vh] md:max-h-[70vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-black/50 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-accent-orange transition-all duration-200"
              aria-label="Close Lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Photo Section */}
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center overflow-hidden h-64 md:h-full relative">
              <img
                src={photoUrl}
                alt={title}
                className="w-full h-full object-cover max-h-[64vh]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-navy-dark/70 backdrop-blur-sm py-1 px-3 rounded-full text-white/95 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <ZoomIn className="h-3 w-3 text-accent-orange" />
                <span>Double-checked JRN Quality</span>
              </div>
            </div>

            {/* Project Details Section */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-white relative">
              <div className="space-y-4">
                <span className="text-xs font-bold text-accent-orange uppercase tracking-widest block">
                  JRN Project Log
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
                  {title}
                </h3>
                <div className="border-t border-white/10 pt-3" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Badges / metadata */}
              <div className="space-y-3 pt-6 md:pt-0 border-t border-white/10 md:border-0">
                <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-400 font-bold uppercase">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="h-4 w-4 text-accent-orange shrink-0" />
                    <span>Yorkshire Area</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Fully Certified</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="w-full bg-accent-orange hover:bg-white text-navy-dark font-extrabold text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all duration-300 shadow"
                >
                  Request Similar Service
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
