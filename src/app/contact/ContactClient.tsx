"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle, Mail, Github, Linkedin, MapPin, Clock } from "lucide-react";

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

  const scriptURL = "https://script.google.com/macros/s/AKfycbyqwV7NdSV01Je0qLcMOcKP9eN2XqjeYi5jl1NY-NgGE3ZfgUJOzm2CfqlJKhhWLImd/exec";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const body = new FormData();
    Object.entries(formData).forEach(([k, v]) => body.append(k, v));
    fetch(scriptURL, { method: "POST", body })
      .then(() => {
        setIsSubmitting(false);
        setPopup({ visible: true, message: "Message sent! I'll reply within 24 hours.", type: "success" });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 5000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setPopup({ visible: true, message: "Something went wrong. Try again.", type: "error" });
        setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 4000);
      });
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] grid-pattern pt-28 pb-24 px-6 md:px-12 lg:px-24">
      {/* Popup */}
      <AnimatePresence>
        {popup.visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 border-2 border-black paper-shadow flex items-center gap-3 font-mono text-sm font-bold ${
              popup.type === "success" ? "bg-emerald-50" : "bg-red-50"
            }`}
          >
            {popup.type === "success" ? <CheckCircle2 size={18} className="text-emerald-600" /> : <AlertCircle size={18} className="text-red-600" />}
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto">
        <div className="section-label mb-4">Contact</div>
        <h1 className="section-heading mb-4">Get In Touch</h1>
        <p className="text-slate-500 font-mono text-sm mb-14 max-w-xl">
          Whether it&apos;s a system design problem, an AI project, an internship, or just to talk tech — I&apos;m all ears.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info sidebar */}
          <div className="space-y-4">
            {[
              { icon: <Mail size={18} className="text-blue-600" />, label: "Email", val: "omavchar@gmail.com", href: "mailto:omavchar@gmail.com" },
              { icon: <Github size={18} className="text-slate-600" />, label: "GitHub", val: "github.com/omavcher", href: "https://github.com/omavcher" },
              { icon: <Linkedin size={18} className="text-blue-700" />, label: "LinkedIn", val: "linkedin.com/in/omawchar", href: "https://linkedin.com/in/omawchar" },
              { icon: <MapPin size={18} className="text-red-500" />, label: "Location", val: "Nagpur, Maharashtra, India", href: null },
              { icon: <Clock size={18} className="text-emerald-600" />, label: "Response Time", val: "Within 24 hours", href: null },
            ].map((item) => (
              <div key={item.label} className="paper-flat paper-shadow-sm p-4 flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-slate-50 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-mono text-[8px] text-slate-400 uppercase font-bold tracking-widest">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors">
                      {item.val}
                    </a>
                  ) : (
                    <div className="text-sm font-bold text-slate-800">{item.val}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="paper-flat bg-emerald-50 border-l-4 border-l-emerald-500 p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-mono text-[9px] font-black uppercase text-emerald-700">Available</span>
              </div>
              <p className="font-mono text-[10px] text-emerald-600">Open to internships, part-time roles, and collaborations.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="paper-sheet paper-shadow bg-white p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">Name *</label>
                    <input required type="text" placeholder="Jane Doe" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border-2 border-black bg-slate-50 px-4 py-3 font-mono text-sm focus:bg-blue-50 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">Email *</label>
                    <input required type="email" placeholder="jane@example.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border-2 border-black bg-slate-50 px-4 py-3 font-mono text-sm focus:bg-blue-50 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">Subject</label>
                  <input type="text" placeholder="Internship Opportunity / Collaboration / System Design Discussion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border-2 border-black bg-slate-50 px-4 py-3 font-mono text-sm focus:bg-blue-50 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">Message *</label>
                  <textarea required rows={6} placeholder="Describe your project, role, or question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border-2 border-black bg-slate-50 px-4 py-3 font-mono text-sm focus:bg-blue-50 focus:border-blue-600 outline-none transition-all resize-none placeholder:text-slate-300" />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 font-mono font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all paper-shadow disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none">
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send Message <Send size={16} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
