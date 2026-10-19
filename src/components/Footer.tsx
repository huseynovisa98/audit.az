import React, { useState } from 'react';
import { Mail, MapPin, Phone, Shield, ArrowUpRight, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ServiceKey } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectService: (service: ServiceKey) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onSelectService,
}) => {
  const t = translations[currentLang];
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [legalModalContent, setLegalModalContent] = useState<{ title: string; body: string } | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  const openLegalModal = (type: 'privacy' | 'terms' | 'compliance') => {
    const titles = {
      privacy: t.footer.legal.privacy,
      terms: t.footer.legal.terms,
      compliance: t.footer.legal.compliance,
    };

    const bodies = {
      privacy:
        currentLang === 'az'
          ? 'audit.az istifadəçilərin məxfiliyinə tam hörmət edir. Saytda toplanan korporativ əlaqə məlumatları yalnız xidmət təklifinin hazırlanması məqsədilə istifadə olunur və üçüncü tərəflərə ötürülmür. Bütün audit məlumatları ciddi NDA şərtləri ilə qorunur.'
          : currentLang === 'en'
          ? 'audit.az respects enterprise confidentiality. Data captured via this platform is used solely to prepare bespoke advisory scopes and is never sold to third parties. All operational materials are shielded by strict non-disclosure obligations.'
          : 'audit.az уважает конфиденциальность корпоративных клиентов. Собранные контактные данные используются исключительно для формирования коммерческих предложений и не передаются третьим лицам. Действует строгий режим NDA.',
      terms:
        currentLang === 'az'
          ? 'audit.az platformasındakı bütün vizualizasiyalar, risk kalkulyatorları və nümunəvi göstəricilər məlumat xarakteri daşıyır. Rəsmi audit xidmətləri yalnız tərəflər arasında imzalanmış ikitərəfli müqavilə əsasında icra edilir.'
          : currentLang === 'en'
          ? 'All visualizations, metrics, and risk simulations on audit.az serve informational benchmarking purposes. Official financial audit reports are delivered exclusively under signed bilateral service contracts.'
          : 'Все симуляции и расчеты на audit.az носят информационный характер. Официальные аудиторские услуги предоставляются исключительно на основании заключенного договора.',
      compliance:
        currentLang === 'az'
          ? 'audit.az audit metodologiyasında Beynəlxalq Audit Standartları (ISA), Maliyyə Hesabatlarının Beynəlxalq Standartları (IFRS) və AR Vergi Məcəlləsinin qanuni tələblərinə riayət olunur.'
          : currentLang === 'en'
          ? 'The audit.az governance methodology complies with International Standards on Auditing (ISA), IFRS financial reporting principles, and the statutory requirements of the Republic of Azerbaijan Tax Code.'
          : 'Методология audit.az соответствует Международным стандартам аудита (МСА), МСФО и нормам Налогового кодекса Азербайджанской Республики.',
    };

    setLegalModalContent({
      title: titles[type],
      body: bodies[type],
    });
  };

  const handleServiceClick = (key: ServiceKey) => {
    onSelectService(key);
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#090D14] border-t border-[rgba(120,170,200,0.16)] pt-16 pb-12 text-[#9BAABD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[rgba(120,170,200,0.12)]">
          
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#hero" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-[#131B26] border border-[#D4AF37]/40 flex items-center justify-center transition-colors group-hover:border-[#F4D36B]">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
              </span>
              <span className="font-editorial text-2xl tracking-tight text-[#F5F7FA]">
                audit<span className="text-[#D4AF37] font-sans font-semibold text-lg">.az</span>
              </span>
            </a>
            
            <p className="text-xs sm:text-sm text-[#9BAABD] leading-relaxed max-w-sm">
              {t.footer.positioning}
            </p>

            <div className="pt-2">
              <div className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider">
                IFRS · ISA · AR Qanunvericiliyi
              </div>
            </div>
          </div>

          {/* Col 2: Services Anchors */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7FA]">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleServiceClick('audit')}
                  className="hover:text-[#F4D36B] transition-colors text-left"
                >
                  {t.services.items.audit.title}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleServiceClick('tax')}
                  className="hover:text-[#F4D36B] transition-colors text-left"
                >
                  {t.services.items.tax.title}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleServiceClick('accounting')}
                  className="hover:text-[#F4D36B] transition-colors text-left"
                >
                  {t.services.items.accounting.title}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleServiceClick('law')}
                  className="hover:text-[#F4D36B] transition-colors text-left"
                >
                  {t.services.items.law.title}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleServiceClick('valuation')}
                  className="hover:text-[#F4D36B] transition-colors text-left"
                >
                  {t.services.items.valuation.title}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Contact Placeholders */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7FA]">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{t.footer.location} · {t.footer.addressPlaceholder}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="font-mono">{t.footer.emailPlaceholder}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="font-mono">{t.footer.phonePlaceholder}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter Signup Interface (Demo) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7FA]">
              {t.footer.newsletterTitle}
            </h4>
            <p className="text-xs text-[#9BAABD] leading-relaxed">
              {t.footer.newsletterDesc}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex items-center gap-1.5">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t.footer.newsletterPlaceholder}
                  className="w-full px-3 py-2 rounded-lg bg-[#131B26] text-xs text-[#F5F7FA] border border-[rgba(120,170,200,0.2)] focus:border-[#D4AF37] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#F4D36B] text-[#090D14] font-semibold text-xs whitespace-nowrap transition-colors"
                >
                  {t.footer.newsletterBtn}
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="text-[11px] text-[#36D6A0] flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>{t.footer.newsletterSuccess}</span>
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Language Selector, Legal Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} audit.az · {t.footer.rights}</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => openLegalModal('privacy')}
                className="hover:text-[#F4D36B] transition-colors"
              >
                {t.footer.legal.privacy}
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => openLegalModal('terms')}
                className="hover:text-[#F4D36B] transition-colors"
              >
                {t.footer.legal.terms}
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => openLegalModal('compliance')}
                className="hover:text-[#F4D36B] transition-colors"
              >
                {t.footer.legal.compliance}
              </button>
            </div>
          </div>

          {/* Language Switcher in Footer */}
          <div className="flex items-center gap-2">
            <span className="text-[#9BAABD]/60 text-[11px]">Dil / Language:</span>
            <div className="flex items-center p-0.5 rounded bg-[#131B26] border border-[rgba(120,170,200,0.18)]">
              {(['az', 'en', 'ru'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                    currentLang === lang ? 'bg-[#D4AF37] text-[#090D14] font-bold' : 'text-[#9BAABD] hover:text-[#F5F7FA]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Statutory Notice */}
        <div className="mt-6 text-center text-[11px] text-[#9BAABD]/60">
          {t.footer.disclaimer}
        </div>

      </div>

      {/* Legal Information Modal */}
      <AnimatePresence>
        {legalModalContent && (
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
              className="glass-panel-elevated rounded-2xl max-w-lg w-full p-6 sm:p-8 relative border border-[#D4AF37]/35 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLegalModalContent(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#090D14] border border-[rgba(120,170,200,0.2)] text-[#9BAABD] hover:text-[#F5F7FA]"
                aria-label="Close legal modal"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-editorial text-2xl text-[#F5F7FA] mb-4">
                {legalModalContent.title}
              </h3>

              <p className="text-sm text-[#9BAABD] leading-relaxed mb-6">
                {legalModalContent.body}
              </p>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setLegalModalContent(null)}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#090D14] bg-[#D4AF37] rounded-lg hover:bg-[#F4D36B]"
                >
                  {currentLang === 'az' ? 'Bağla' : currentLang === 'en' ? 'Close' : 'Закрыть'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
