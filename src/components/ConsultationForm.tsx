import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertTriangle, Info, X, Building2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ServiceKey, ConsultationFormData } from '../types';
import { translations } from '../i18n/translations';

interface ConsultationFormProps {
  currentLang: Language;
  selectedService: ServiceKey;
  prefilledMessage?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  currentLang,
  selectedService: initialSelectedService,
  prefilledMessage = '',
}) => {
  const t = translations[currentLang];

  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceType: initialSelectedService,
    message: prefilledMessage,
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<ConsultationFormData | null>(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceType: initialSelectedService,
      message: prefilledMessage || prev.message,
    }));
  }, [initialSelectedService, prefilledMessage]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ConsultationFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = t.consultation.errors.fullName;
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = t.consultation.errors.companyName;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = t.consultation.errors.email;
    }

    // Phone validation: at least 7 digits
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      newErrors.phone = t.consultation.errors.phone;
    }

    if (!formData.consent) {
      newErrors.consent = t.consultation.errors.consent;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      setShowSuccessModal(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        serviceType: initialSelectedService,
        message: '',
        consent: false,
      });
      setErrors({});
    }, 450);
  };

  return (
    <section id="consultation" className="py-28 bg-[#090D14] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#00E5FF]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] mb-3">
            <Send className="w-3.5 h-3.5" />
            <span>{t.consultation.tag}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F7FA] tracking-tight">
            {t.consultation.title}
          </h2>
          <p className="mt-4 text-base text-[#9BAABD] leading-relaxed max-w-2xl mx-auto">
            {t.consultation.subtitle}
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel-elevated rounded-2xl p-6 sm:p-10 border border-[#D4AF37]/35 shadow-2xl"
        >
          
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.consultation.labels.fullName}</span>
                  <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder={t.consultation.placeholders.fullName}
                  className={`w-full px-4 py-3 rounded-lg bg-[#090D14] text-[#F5F7FA] text-sm border transition-all focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                    errors.fullName
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-[rgba(120,170,200,0.22)] focus:border-[#D4AF37]'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.consultation.labels.companyName}</span>
                  <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => {
                    setFormData({ ...formData, companyName: e.target.value });
                    if (errors.companyName) setErrors({ ...errors, companyName: undefined });
                  }}
                  placeholder={t.consultation.placeholders.companyName}
                  className={`w-full px-4 py-3 rounded-lg bg-[#090D14] text-[#F5F7FA] text-sm border transition-all focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                    errors.companyName
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-[rgba(120,170,200,0.22)] focus:border-[#D4AF37]'
                  }`}
                />
                {errors.companyName && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>{errors.companyName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.consultation.labels.email}</span>
                  <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder={t.consultation.placeholders.email}
                  className={`w-full px-4 py-3 rounded-lg bg-[#090D14] text-[#F5F7FA] text-sm border transition-all focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                    errors.email
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-[rgba(120,170,200,0.22)] focus:border-[#D4AF37]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone with Country Prefix Badge */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.consultation.labels.phone}</span>
                  <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg bg-[#131B26] border border-r-0 border-[rgba(120,170,200,0.22)] text-xs font-mono text-[#D4AF37]">
                    +994
                  </span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="50 000 00 00"
                    className={`w-full px-4 py-3 rounded-r-lg bg-[#090D14] text-[#F5F7FA] text-sm border font-mono transition-all focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                      errors.phone
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-[rgba(120,170,200,0.22)] focus:border-[#D4AF37]'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

            </div>

            {/* Service Type Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-2">
                {t.consultation.labels.serviceType} <span className="text-[#D4AF37]">*</span>
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as ServiceKey })}
                className="w-full px-4 py-3 rounded-lg bg-[#090D14] text-[#F5F7FA] text-sm border border-[rgba(120,170,200,0.22)] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
              >
                <option value="audit">{t.consultation.servicesDropdown.audit}</option>
                <option value="tax">{t.consultation.servicesDropdown.tax}</option>
                <option value="accounting">{t.consultation.servicesDropdown.accounting}</option>
                <option value="law">{t.consultation.servicesDropdown.law}</option>
                <option value="valuation">{t.consultation.servicesDropdown.valuation}</option>
              </select>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{t.consultation.labels.message}</span>
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.consultation.placeholders.message}
                className="w-full px-4 py-3 rounded-lg bg-[#090D14] text-[#F5F7FA] text-sm border border-[rgba(120,170,200,0.22)] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Privacy Consent Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => {
                    setFormData({ ...formData, consent: e.target.checked });
                    if (errors.consent) setErrors({ ...errors, consent: undefined });
                  }}
                  className="mt-1 w-4 h-4 rounded bg-[#090D14] border-[rgba(120,170,200,0.3)] text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0"
                />
                <span className="text-xs text-[#9BAABD] leading-relaxed select-none">
                  {t.consultation.labels.consent}
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  <span>{errors.consent}</span>
                </p>
              )}
            </div>

            {/* Action Buttons & Demo Notice */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F4D36B] to-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/20 text-[#090D14] font-semibold text-xs uppercase tracking-wider transition-all duration-200 disabled:opacity-50"
              >
                <span>{isSubmitting ? t.consultation.submitting : t.consultation.submitButton}</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#9BAABD]/80">
                <Info className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{t.consultation.demoNotice}</span>
              </div>
            </div>

          </form>

        </motion.div>

      </div>

      {/* Demo Confirmation Modal with AnimatePresence */}
      <AnimatePresence>
        {showSuccessModal && submittedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel-elevated rounded-2xl max-w-lg w-full p-6 sm:p-8 relative border border-[#36D6A0]/45 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#090D14] border border-[rgba(120,170,200,0.2)] text-[#9BAABD] hover:text-[#F5F7FA]"
                aria-label="Close confirmation"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-xl bg-[#36D6A0]/10 border border-[#36D6A0]/40 flex items-center justify-center text-[#36D6A0] mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F7FA] mb-2">
                {t.consultation.modalTitle}
              </h3>

              <p className="text-xs sm:text-sm text-[#9BAABD] leading-relaxed mb-6">
                {t.consultation.modalDesc}
              </p>

              {/* Echo submitted parameters */}
              <div className="p-4 rounded-xl bg-[#090D14] border border-[rgba(120,170,200,0.14)] space-y-2 text-xs font-mono text-[#F5F7FA] mb-6">
                <div className="flex justify-between border-b border-[rgba(120,170,200,0.08)] pb-1.5">
                  <span className="text-[#9BAABD]">{t.consultation.labels.fullName}:</span>
                  <span>{submittedData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-[rgba(120,170,200,0.08)] pb-1.5">
                  <span className="text-[#9BAABD]">{t.consultation.labels.companyName}:</span>
                  <span>{submittedData.companyName}</span>
                </div>
                <div className="flex justify-between border-b border-[rgba(120,170,200,0.08)] pb-1.5">
                  <span className="text-[#9BAABD]">{t.consultation.labels.email}:</span>
                  <span>{submittedData.email}</span>
                </div>
                <div className="flex justify-between border-b border-[rgba(120,170,200,0.08)] pb-1.5">
                  <span className="text-[#9BAABD]">{t.consultation.labels.phone}:</span>
                  <span>+994 {submittedData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9BAABD]">{t.consultation.labels.serviceType}:</span>
                  <span className="text-[#F4D36B] uppercase font-bold">{submittedData.serviceType}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#090D14] bg-[#D4AF37] rounded-lg hover:bg-[#F4D36B] transition-colors"
                >
                  {t.consultation.modalClose}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
