import React, { useState } from 'react';
import { 
  FileCheck2, 
  Calculator, 
  Scale, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  Briefcase,
  Layers,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ServiceKey } from '../types';
import { translations } from '../i18n/translations';
import { ImageWithFallback } from './ImageWithFallback';
import structureImg from '../assets/images/financial_structure_1792445194427.jpg';

interface ServicesBentoProps {
  currentLang: Language;
  onSelectServiceAndConsult: (service: ServiceKey) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  currentLang,
  onSelectServiceAndConsult,
}) => {
  const t = translations[currentLang];
  const items = t.services.items;
  const [inspectedService, setInspectedService] = useState<ServiceKey | null>(null);

  const getMethodologyPhases = (key: ServiceKey) => {
    switch (key) {
      case 'audit':
        return [
          { phase: '01', title: 'Planlaşdırma və Risk Qiymətləndirməsi', desc: 'Müəssisənin daxili nəzarət mühitinin təhlili və materiallıq həddinin təyini.' },
          { phase: '02', title: 'Substantiv Audit Sınaqları', desc: 'Bank hesabları, debitor borclar, ehtiyatlar və əsas vəsaitlərin fiziki/sənəd yoxlanışı.' },
          { phase: '03', title: 'IFRS Standartlarına Transformasiya', desc: 'Maliyyə hesabatlarının beynəlxalq standartların tələblərinə tam uyğunlaşdırılması.' },
          { phase: '04', title: 'Müstəqil Auditor Rəyi', desc: 'Rəsmi auditor rəyinin verilməsi və Direktorlar Şurası üçün tövsiyə məktubu.' },
        ];
      case 'tax':
        return [
          { phase: '01', title: 'Fiskal Diaqnostika', desc: 'Keçmiş dövrlərin vergi bəyannamələrinin və risk zonalarının tam təhlili.' },
          { phase: '02', title: 'Qanunvericilik Uyğunluğu', desc: 'Vergi Məcəlləsinin son dəyişiklikləri və güzəştlərinin tətbiqi.' },
          { phase: '03', title: 'Transfer Qiymətləndirməsi', desc: 'Qarşılıqlı asılı şəxslər arasındakı əməliyyatların sənədləşdirilməsi.' },
          { phase: '04', title: 'DVX Təmsilçiliyi', desc: 'Səyyar və kameral vergi yoxlamalarında tam hüquqi və maliyyə müdafiəsi.' },
        ];
      case 'accounting':
        return [
          { phase: '01', title: 'Sənəd Dövriyyəsinin Quraşdırılması', desc: '1C / ERP sistemində ilkin mühasibat sənədlərinin uçot qaydaları.' },
          { phase: '02', title: 'DSMF və Statistika', desc: 'Məcburi dövlət sığortası, əmək haqqı və rəsmi statistik hesabatlar.' },
          { phase: '03', title: 'Bank və Tərəfdaş Üzləşmələri', desc: 'Dövriyyə vəsaitlərinin tam şəffaflığı və gündəlik kassa/bank nəzarəti.' },
          { phase: '04', title: 'İdarəetmə Hesabatlığı', desc: 'Rəhbərlik üçün aylıq mənfəət-zərər (P&L) və pul vəsaitlərinin hərəkəti (Cash Flow).' },
        ];
      case 'law':
        return [
          { phase: '01', title: 'Müqavilə Ekspertizası', desc: 'Kommersiya sazişlərində maliyyə və hüquqi risklərin neytrallaşdırılması.' },
          { phase: '02', title: 'Korporativ Nizamnamə', desc: 'Təsis sənədlərinin, təsisçilərin pay bölgüsünün və idarəetmə orqanlarının tənzimi.' },
          { phase: '03', title: 'M&A və Əqdlər', desc: 'Şirkət birləşmələri və aktivlərin ötürülməsində hüquqi due diligence.' },
          { phase: '04', title: 'Komplaens və AML', desc: 'Cinayət yolu ilə əldə edilmiş əmlakın leqallaşdırılmasına qarşı tələblər.' },
        ];
      case 'valuation':
        return [
          { phase: '01', title: 'İlkin İnventarizasiya', desc: 'Maddi və qeyri-maddi aktivlərin texniki və hüquqi vəziyyətinin təyini.' },
          { phase: '02', title: 'Bazar Təhlili', desc: 'Oxşar kommersiya obyektləri və sənaye sahələri üzrə cari qiymət konyunkturası.' },
          { phase: '03', title: 'DCF Modelləşdirməsi', desc: 'Gələcək pul vəsaitlərinin diskontlaşdırılması və risk faizinin hesablanması.' },
          { phase: '04', title: 'Rəsmi Qiymətləndirmə Hesabatı', desc: 'Bank girovu, investor cəlbi və M&A əqdləri üçün beynəlxalq standartlı rəy.' },
        ];
    }
  };

  return (
    <section id="services" className="relative py-28 bg-[#090D14] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[420px] h-[420px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t.services.tag}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F7FA] tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base text-[#9BAABD] leading-relaxed">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Maliyyə Auditi (Marquee Span 2 on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="lg:col-span-2 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-[#D4AF37]/60 hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background architectural geometric texture */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none mix-blend-luminosity overflow-hidden">
              <ImageWithFallback
                src="/images/financial_structure.jpg"
                fallbackSrc={structureImg}
                alt="Corporate audit geometry"
                className="w-full h-full object-cover object-right"
                containerClassName="w-full h-full"
                fallbackTitle="Corporate Audit Structure"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#090D14]/80 to-[#090D14]" />
            </div>

            {/* Corner ambient glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-all duration-300 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#131B26] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] group-hover:text-[#F4D36B] group-hover:border-[#F4D36B] transition-colors shadow-sm">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
                  IFRS & ISA Standards
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F7FA] mb-3 group-hover:text-[#F4D36B] transition-colors">
                {items.audit.title}
              </h3>
              
              <p className="text-sm text-[#9BAABD] leading-relaxed mb-6 max-w-xl">
                {items.audit.desc}
              </p>

              {/* Deliverables List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {items.audit.deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7FA]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#36D6A0] shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[rgba(120,170,200,0.14)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInspectedService('audit')}
                className="inline-flex items-center gap-1.5 text-xs text-[#9BAABD] hover:text-[#00E5FF] transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{currentLang === 'az' ? 'Metodologiya və Mərhələlər' : currentLang === 'en' ? 'Methodology & Phases' : 'Методология и этапы'}</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectServiceAndConsult('audit')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F4D36B] hover:text-white transition-colors group/btn"
              >
                <span>{t.services.requestProposal}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Vergi Konsaltinqi */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-[#00E5FF]/50 hover:shadow-xl hover:shadow-[#00E5FF]/5 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#131B26] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] group-hover:border-[#00E5FF] transition-colors shadow-sm">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider font-semibold">
                  AR Vergi Məcəlləsi
                </span>
              </div>

              <h3 className="font-editorial text-2xl text-[#F5F7FA] mb-3 group-hover:text-[#00E5FF] transition-colors">
                {items.tax.title}
              </h3>
              
              <p className="text-sm text-[#9BAABD] leading-relaxed mb-6">
                {items.tax.desc}
              </p>

              <div className="space-y-2 mb-6">
                {items.tax.deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7FA]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(120,170,200,0.14)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInspectedService('tax')}
                className="inline-flex items-center gap-1.5 text-xs text-[#9BAABD] hover:text-[#00E5FF] transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{currentLang === 'az' ? 'Mərhələlər' : currentLang === 'en' ? 'Phases' : 'Этапы'}</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectServiceAndConsult('tax')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00E5FF] hover:text-white transition-colors group/btn"
              >
                <span>{t.services.requestProposal}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Mühasibatlıq */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-[#36D6A0]/50 hover:shadow-xl hover:shadow-[#36D6A0]/5 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#131B26] border border-[#36D6A0]/30 flex items-center justify-center text-[#36D6A0] group-hover:border-[#36D6A0] transition-colors shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#36D6A0] uppercase tracking-wider font-semibold">
                  1C / ERP Systems
                </span>
              </div>

              <h3 className="font-editorial text-2xl text-[#F5F7FA] mb-3 group-hover:text-[#36D6A0] transition-colors">
                {items.accounting.title}
              </h3>
              
              <p className="text-sm text-[#9BAABD] leading-relaxed mb-6">
                {items.accounting.desc}
              </p>

              <div className="space-y-2 mb-6">
                {items.accounting.deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7FA]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#36D6A0] shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(120,170,200,0.14)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInspectedService('accounting')}
                className="inline-flex items-center gap-1.5 text-xs text-[#9BAABD] hover:text-[#00E5FF] transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{currentLang === 'az' ? 'Mərhələlər' : currentLang === 'en' ? 'Phases' : 'Этапы'}</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectServiceAndConsult('accounting')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#36D6A0] hover:text-white transition-colors group/btn"
              >
                <span>{t.services.requestProposal}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 4: Hüquq və Korporativ İdarəetmə */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#131B26] border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37] group-hover:text-[#F4D36B] transition-colors shadow-sm">
                  <Scale className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
                  Corporate Governance
                </span>
              </div>

              <h3 className="font-editorial text-2xl text-[#F5F7FA] mb-3 group-hover:text-[#F4D36B] transition-colors">
                {items.law.title}
              </h3>
              
              <p className="text-sm text-[#9BAABD] leading-relaxed mb-6">
                {items.law.desc}
              </p>

              <div className="space-y-2 mb-6">
                {items.law.deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7FA]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(120,170,200,0.14)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInspectedService('law')}
                className="inline-flex items-center gap-1.5 text-xs text-[#9BAABD] hover:text-[#00E5FF] transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{currentLang === 'az' ? 'Mərhələlər' : currentLang === 'en' ? 'Phases' : 'Этапы'}</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectServiceAndConsult('law')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F4D36B] hover:text-white transition-colors group/btn"
              >
                <span>{t.services.requestProposal}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 5: Biznesin Qiymətləndirilməsi */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-[#00E5FF]/50 hover:shadow-xl hover:shadow-[#00E5FF]/5 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#131B26] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] group-hover:border-[#00E5FF] transition-colors shadow-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider font-semibold">
                  Valuation & M&A
                </span>
              </div>

              <h3 className="font-editorial text-2xl text-[#F5F7FA] mb-3 group-hover:text-[#00E5FF] transition-colors">
                {items.valuation.title}
              </h3>
              
              <p className="text-sm text-[#9BAABD] leading-relaxed mb-6">
                {items.valuation.desc}
              </p>

              <div className="space-y-2 mb-6">
                {items.valuation.deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7FA]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(120,170,200,0.14)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInspectedService('valuation')}
                className="inline-flex items-center gap-1.5 text-xs text-[#9BAABD] hover:text-[#00E5FF] transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{currentLang === 'az' ? 'Mərhələlər' : currentLang === 'en' ? 'Phases' : 'Этапы'}</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectServiceAndConsult('valuation')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00E5FF] hover:text-white transition-colors group/btn"
              >
                <span>{t.services.requestProposal}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Methodology & Phases Modal */}
      <AnimatePresence>
        {inspectedService && (
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
              className="glass-panel-elevated rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative border border-[#D4AF37]/40 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setInspectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#090D14] border border-[rgba(120,170,200,0.2)] text-[#9BAABD] hover:text-[#F5F7FA]"
                aria-label="Close methodology modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{currentLang === 'az' ? 'Xidmət İcrası və Standartlar' : currentLang === 'en' ? 'Execution Framework' : 'Регламент оказания услуг'}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F7FA] mb-6">
                {items[inspectedService].title} — {currentLang === 'az' ? 'Metodoloji Mərhələlər' : currentLang === 'en' ? 'Methodological Phases' : 'Методологические этапы'}
              </h3>

              <div className="space-y-3.5 mb-8">
                {getMethodologyPhases(inspectedService).map((step) => (
                  <div
                    key={step.phase}
                    className="p-4 rounded-xl bg-[#090D14]/85 border border-[rgba(120,170,200,0.14)] flex items-start gap-4"
                  >
                    <span className="font-editorial text-2xl text-[#D4AF37] shrink-0 w-8 pt-0.5">
                      {step.phase}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#F5F7FA] mb-1">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#9BAABD] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[rgba(120,170,200,0.14)]">
                <button
                  type="button"
                  onClick={() => setInspectedService(null)}
                  className="px-4 py-2 text-xs font-medium text-[#9BAABD] hover:text-white"
                >
                  {currentLang === 'az' ? 'Bağla' : currentLang === 'en' ? 'Close' : 'Закрыть'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const s = inspectedService;
                    setInspectedService(null);
                    onSelectServiceAndConsult(s);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#090D14] bg-[#D4AF37] rounded-lg hover:bg-[#F4D36B]"
                >
                  <span>{t.services.requestProposal}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
