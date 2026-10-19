import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface TrustStatsProps {
  currentLang: Language;
}

export const TrustStats: React.FC<TrustStatsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="py-24 bg-[#0C131D] border-y border-[rgba(120,170,200,0.14)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>{t.trust.tag}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F7FA]">
              {t.trust.title}
            </h2>
          </div>
          <p className="text-xs text-[#9BAABD] max-w-md leading-relaxed">
            {t.trust.disclaimerNote}
          </p>
        </motion.div>

        {/* Horizontal Statistics Grid with Large Serif Numerals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.trust.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-6 sm:p-7 rounded-xl bg-[#090D14]/85 border border-[rgba(120,170,200,0.15)] flex flex-col justify-between hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-[#D4AF37]/5 transition-all duration-200 group"
            >
              <div>
                <div className="font-editorial text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D36B] to-[#D4AF37] font-normal tracking-tight tabular-nums">
                  {stat.num}
                </div>
                <h3 className="text-sm font-semibold text-[#F5F7FA] mt-3 group-hover:text-[#F4D36B] transition-colors">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs text-[#9BAABD] mt-2.5 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
