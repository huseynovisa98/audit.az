import React, { useState } from 'react';
import { Award, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface WhyAuditProps {
  currentLang: Language;
}

export const WhyAudit: React.FC<WhyAuditProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activePillar, setActivePillar] = useState<string>('01');

  return (
    <section id="why-us" className="py-28 bg-[#090D14] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[420px] h-[420px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#00E5FF]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{t.whyUs.tag}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F7FA] tracking-tight">
            {t.whyUs.title}
          </h2>
          <p className="mt-4 text-base text-[#9BAABD] leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </motion.div>

        {/* 2-Column Split: Architectural Image & Editorial Advantage List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left: Architectural Visual Representation with Motion */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl shadow-black/80 group">
              <img
                src="/src/assets/images/corporate_boardroom_1792445195541.jpg"
                alt="audit.az institutional advisory boardroom"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-[#090D14]/40 to-transparent" />
              
              {/* Dynamic Overlay Label */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel-elevated border border-[rgba(120,170,200,0.22)]">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
                  <span>audit.az Advisory Council</span>
                  <span className="font-mono text-[#00E5FF]">Pillar {activePillar}</span>
                </div>
                <div className="text-sm text-[#F5F7FA] font-medium">
                  {currentLang === 'az'
                    ? 'İnstitusional idarəetmə və strateji maliyyə nəzarəti'
                    : currentLang === 'en'
                    ? 'Institutional governance & fiduciary oversight'
                    : 'Институциональное управление и фидуциарный контроль'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Vertical List of 5 Advantages with interactive click */}
          <div className="lg:col-span-7 space-y-4">
            {t.whyUs.pillars.map((pillar, idx) => {
              const isSelected = activePillar === pillar.num;
              return (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onClick={() => setActivePillar(pillar.num)}
                  className={`p-5 rounded-xl transition-all cursor-pointer border flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#131B26] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-[#0C131D]/80 border-[rgba(120,170,200,0.12)] hover:border-[rgba(120,170,200,0.28)]'
                  }`}
                >
                  {/* Number Badge */}
                  <span
                    className={`font-editorial text-2xl shrink-0 w-8 pt-0.5 transition-colors ${
                      isSelected ? 'text-[#F4D36B]' : 'text-[#D4AF37]'
                    }`}
                  >
                    {pillar.num}
                  </span>

                  <div className="space-y-1 w-full">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-base font-semibold transition-colors ${
                          isSelected ? 'text-[#F4D36B]' : 'text-[#F5F7FA]'
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#36D6A0] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#9BAABD] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
