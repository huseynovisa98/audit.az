import React, { useState } from 'react';
import { BookOpen, ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ArticleItem } from '../types';
import { translations } from '../i18n/translations';

interface ArticlesSectionProps {
  currentLang: Language;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  return (
    <section id="insights" className="py-28 bg-[#0C131D] border-t border-[rgba(120,170,200,0.14)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.insights.tag}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F7FA] tracking-tight">
            {t.insights.title}
          </h2>
          <p className="mt-4 text-base text-[#9BAABD] leading-relaxed">
            {t.insights.subtitle}
          </p>
        </motion.div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.insights.items.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-300"
            >
              <div>
                {/* Zero-Pill Unboxed Metadata with Typographic Separator */}
                <div className="flex items-center gap-2 text-xs text-[#D4AF37] mb-4 font-mono font-medium">
                  <span>{item.category}</span>
                  <span aria-hidden="true" className="text-[#9BAABD]/40">·</span>
                  <span className="text-[#9BAABD]">{item.date}</span>
                  <span aria-hidden="true" className="text-[#9BAABD]/40">·</span>
                  <span className="text-[#9BAABD]">{item.readTime}</span>
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl text-[#F5F7FA] group-hover:text-[#F4D36B] transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9BAABD] leading-relaxed mb-6">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(120,170,200,0.12)]">
                <button
                  type="button"
                  onClick={() => setActiveArticle(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] group-hover:text-[#F4D36B] transition-colors"
                >
                  <span>{t.insights.readMore}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {activeArticle && (
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
              className="glass-panel-elevated rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-[#D4AF37]/40 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#090D14] border border-[rgba(120,170,200,0.2)] text-[#9BAABD] hover:text-[#F5F7FA]"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-mono mb-4">
                <span>{activeArticle.category}</span>
                <span>·</span>
                <span className="text-[#9BAABD]">{activeArticle.date}</span>
                <span>·</span>
                <span className="text-[#9BAABD]">{activeArticle.readTime}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F7FA] mb-4 leading-tight">
                {activeArticle.title}
              </h3>

              <div className="prose prose-invert text-sm text-[#9BAABD] space-y-4 leading-relaxed">
                <p className="text-base text-[#F5F7FA]/90">
                  {activeArticle.excerpt}
                </p>
                <p>
                  {currentLang === 'az'
                    ? 'Audit və maliyyə uçotu sahəsində aparıcı tələblərdən biri qanunvericilik dəyişikliklərinə vaxtında adaptasiyadır. audit.az ekspertləri korporativ müştərilərə yalnız hesabat dövründə deyil, il ərzində bütün əməliyyatların optimal uçot qaydalarına uyğunlaşdırılması üçün metodoloji dəstək göstərirlər.'
                    : currentLang === 'en'
                    ? 'A paramount challenge in financial governance is the timely adaptation to fiscal policy amendments. The audit.az advisory team provides end-to-end guidance to maintain robust books throughout the fiscal year, preventing retrospective reporting penalties.'
                    : 'Своевременная адаптация к изменениям в фискальном законодательстве является ключевым фактором финансовой стабильности. Эксперты audit.az оказывают методологическую поддержку клиентам на всех этапах ведения учета и подготовки отчетности.'}
                </p>
                <div className="p-4 rounded-xl bg-[#090D14] border border-[#D4AF37]/35 text-xs text-[#D4AF37]">
                  {currentLang === 'az'
                    ? 'Tam analitik tədqiqat və fərdi şirkət auditi üçün "Təklif Alın" bölməsindən müraciət edin.'
                    : currentLang === 'en'
                    ? 'For bespoke corporate tax structuring and statutory audit reviews, please submit a proposal request.'
                    : 'Для проведения комплексного аудита вашей организации оформите заявку в форме обратной связи.'}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(120,170,200,0.14)] flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#090D14] bg-[#D4AF37] rounded-lg hover:bg-[#F4D36B]"
                >
                  {currentLang === 'az' ? 'Bağla' : currentLang === 'en' ? 'Close' : 'Закрыть'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
