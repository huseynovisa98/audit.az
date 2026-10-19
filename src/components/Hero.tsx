import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Activity, 
  TrendingUp, 
  Play, 
  X, 
  Layers, 
  Sparkles,
  AlertCircle,
  Info,
  Settings2,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, ServiceKey } from '../types';
import { translations } from '../i18n/translations';
import { ImageWithFallback } from './ImageWithFallback';
import heroHqImg from '../assets/images/hero_financial_hq_1792445195843.jpg';

interface HeroProps {
  currentLang: Language;
  selectedService: ServiceKey;
  onSelectService: (service: ServiceKey) => void;
  onRequestQuote: () => void;
  onExploreServices: () => void;
  onOpenDiagnostic: () => void;
  videoUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  selectedService,
  onSelectService,
  onRequestQuote,
  onExploreServices,
  onOpenDiagnostic,
  videoUrl,
}) => {
  const t = translations[currentLang];
  const [activeDataPoint, setActiveDataPoint] = useState<number>(3);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [configuredVideoUrl, setConfiguredVideoUrl] = useState<string>(
    videoUrl || (import.meta.env.VITE_CLOUDINARY_VIDEO_URL as string) || ''
  );
  const [tempUrlInput, setTempUrlInput] = useState<string>('');
  const [showConfigInput, setShowConfigInput] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [notConfiguredNotice, setNotConfiguredNotice] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleCloseVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setVideoError(false);
    setNotConfiguredNotice(false);
    setShowVideoModal(false);
  };

  useEffect(() => {
    if (!showVideoModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseVideoModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showVideoModal]);

  const handlePlayClick = () => {
    if (!configuredVideoUrl || !configuredVideoUrl.trim()) {
      setNotConfiguredNotice(true);
      setIsPlaying(false);
      return;
    }
    setVideoError(false);
    setNotConfiguredNotice(false);
    setIsPlaying(true);
  };

  // Dynamic sample data for the interactive SVG chart based on selected service
  const serviceChartData: Record<
    ServiceKey,
    { values: number[]; labels: string[]; metricName: string; metricValue: string; details: string[] }
  > = {
    audit: {
      values: [68, 79, 87, 96, 99],
      labels: ['Q1 Təhlil', 'Q2 Test', 'Q3 İFRS', 'Q4 Rəy', 'Nəzarət'],
      metricName: currentLang === 'az' ? 'Daxili Nəzarət İndeksi' : currentLang === 'en' ? 'Internal Control Score' : 'Индекс контроля',
      metricValue: '99.1%',
      details: [
        'Q1: İlkin sənədləşmə və risk skanlanması (68%)',
        'Q2: Substantiv sınaqlar və bank üzləşmələri (79%)',
        'Q3: MHBS/IFRS standartlarına transformasiya (87%)',
        'Q4: Müstəqil auditor rəyinin tərtibi (96%)',
        'Final: Direktorlar Şurası üçün tövsiyələr (99%)',
      ],
    },
    tax: {
      values: [65, 76, 84, 92, 97],
      labels: ['Fiskal Audit', 'Qanunvericilik', 'Optimizasiya', 'Bəyannamə', 'Uyğunluq'],
      metricName: currentLang === 'az' ? 'Fiskal Risk Azalması' : currentLang === 'en' ? 'Fiscal Risk Mitigation' : 'Снижение фискальных рисков',
      metricValue: '-46%',
      details: [
        'Mərhələ 1: Vergi risklərinin təyini və yoxlanışı (65%)',
        'Mərhələ 2: Vergi Məcəlləsinin güzəşt analizləri (76%)',
        'Mərhələ 3: Transfer qiymətləndirmə mexanizmi (84%)',
        'Mərhələ 4: Elektron qaimə-faktura auditi (92%)',
        'Mərhələ 5: Qanuni vergi optimallaşdırması (97%)',
      ],
    },
    accounting: {
      values: [82, 88, 92, 96, 100],
      labels: ['1C/ERP', 'DSMF', 'Hesabat', 'Audit Hazırlığı', 'Bağlanış'],
      metricName: currentLang === 'az' ? 'Əməliyyat Dəqiqliyi' : currentLang === 'en' ? 'Operational Accuracy' : 'Операционная точность',
      metricValue: '99.8%',
      details: [
        'Gündəlik: 1C və ERP əsaslı sənəd dövriyyəsi (82%)',
        'Aylıq: DSMF və Statistika bəyannamələri (88%)',
        'Rüblük: Bank və debitor üzləşmələri (92%)',
        'İllik: İdarəetmə hesabatlarının auditi (96%)',
        'Yekun: 100% balans dəqiqliyi və bağlanış (100%)',
      ],
    },
    law: {
      values: [64, 78, 86, 94, 98],
      labels: ['Müqavilələr', 'Korporativ', 'Nizamnamə', 'AML/Audit', 'Təsdiq'],
      metricName: currentLang === 'az' ? 'Hüquqi Uyğunluq' : currentLang === 'en' ? 'Legal Compliance' : 'Юридический комплаенс',
      metricValue: '100%',
      details: [
        'Müqavilə bazasının hüquqi auditi (64%)',
        'Korporativ nizamnamə və təsis aktları (78%)',
        'M&A və tərəfdaşlıq sazişləri (86%)',
        'AML və tənzimləyici orqanlara uyğunluq (94%)',
        'Tam hüquqi qorunma və qeydiyyat (98%)',
      ],
    },
    valuation: {
      values: [58, 70, 81, 90, 96],
      labels: ['Aktivlər', 'Bazar Dəyəri', 'M&A', 'DCF Model', 'Rəy'],
      metricName: currentLang === 'az' ? 'Qiymətləndirmə Dəqiqliyi' : currentLang === 'en' ? 'Valuation Precision' : 'Точность оценки',
      metricValue: '96.4%',
      details: [
        'Aktivlərin fiziki və hüquqi inventarizasiyası (58%)',
        'Maddi və qeyri-maddi aktivlərin bazarı (70%)',
        'Gəlir və DCF modelləşdirməsi (81%)',
        'Risk diskont dərəcəsinin təyini (90%)',
        'Beynəlxalq standartlı rəsmi hesabat (96%)',
      ],
    },
  };

  const currentChart = serviceChartData[selectedService] || serviceChartData.audit;
  const activeDetailText = currentChart.details[activeDataPoint] || currentChart.details[0];

  return (
    <section id="hero" className="relative min-h-[94vh] pt-32 pb-24 flex items-center bg-[#090D14] bg-grid-subtle overflow-hidden">
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1300px] h-[680px] bg-radial-ambient pointer-events-none" />
      <div className="absolute top-1/4 -right-48 w-[420px] h-[420px] bg-[#00E5FF]/7 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-[#D4AF37]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Editorial & Value Proposition with Motion Stagger */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <span className="w-9 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
                {t.hero.eyebrow}
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F7FA] leading-[1.12] tracking-tight text-balance"
            >
              {t.hero.headlinePart1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D36B] to-[#D4AF37] italic font-normal">
                {t.hero.headlineHighlight}
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-base sm:text-lg text-[#9BAABD] max-w-2xl leading-relaxed font-normal"
            >
              {t.hero.supporting}
            </motion.p>

            {/* Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                type="button"
                onClick={onRequestQuote}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#090D14] bg-gradient-to-r from-[#D4AF37] via-[#F4D36B] to-[#D4AF37] rounded-lg hover:shadow-xl hover:shadow-[#D4AF37]/25 transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] bg-[#131B26]/90 hover:bg-[#131B26] border border-[rgba(120,170,200,0.24)] rounded-lg transition-all duration-200 whitespace-nowrap hover:border-[#D4AF37]/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
              >
                <span>{t.hero.secondaryCta}</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </motion.div>

            {/* Terminal Service Selector Chips */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="pt-6 border-t border-[rgba(120,170,200,0.14)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider text-[#9BAABD] font-semibold">
                  {currentLang === 'az' ? 'Maliyyə Sferası Seçimi' : currentLang === 'en' ? 'Select Advisory Focus' : 'Выбор направления аудита'}
                </span>
                <span className="text-[11px] font-mono text-[#D4AF37]">
                  [IFRS · ISA · AR Məcəlləsi]
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'audit' as ServiceKey, label: t.hero.serviceChips.audit },
                  { key: 'tax' as ServiceKey, label: t.hero.serviceChips.tax },
                  { key: 'accounting' as ServiceKey, label: t.hero.serviceChips.accounting },
                  { key: 'law' as ServiceKey, label: t.hero.serviceChips.law },
                ].map((chip) => {
                  const isActive = selectedService === chip.key;
                  return (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={() => onSelectService(chip.key)}
                      className={`px-3 py-2.5 text-xs font-medium rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'bg-[#131B26] text-[#F4D36B] border border-[#D4AF37] shadow-md shadow-[#D4AF37]/15'
                          : 'bg-[#0C131D] text-[#9BAABD] border border-[rgba(120,170,200,0.15)] hover:text-[#F5F7FA] hover:border-[rgba(120,170,200,0.3)]'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-[#F4D36B]' : 'bg-[#9BAABD]/40'}`} />
                      <span className="truncate">{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Layered Financial Visualization Panel with Motion */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl glass-panel-elevated p-5 sm:p-6 overflow-hidden">
              
              {/* Cyan Scanning Beam */}
              <div className="animate-scanline-cinematic" />

              {/* Background Architectural Poster Fallback (Cloudinary-ready) */}
              <div className="absolute inset-0 z-0 opacity-25 pointer-events-none mix-blend-luminosity">
                <ImageWithFallback
                  src="/images/hero_financial_hq.jpg"
                  fallbackSrc={heroHqImg}
                  alt="audit.az architectural headquarters"
                  className="w-full h-full object-cover scale-105"
                  priority={true}
                  containerClassName="w-full h-full"
                  fallbackTitle="audit.az Financial Architecture"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-[#090D14]/90 to-transparent" />
              </div>

              {/* Foreground Visual Content */}
              <div className="relative z-10 space-y-5">
                
                {/* Header row of Visualization Panel */}
                <div className="flex items-center justify-between border-b border-[rgba(120,170,200,0.16)] pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#131B26] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F5F7FA] tracking-tight">
                        audit.az Compliance Shield
                      </div>
                      <div className="text-[11px] font-mono text-[#9BAABD]">
                        IFRS & ISA · AR Vergi Məcəlləsi
                      </div>
                    </div>
                  </div>

                  {/* Video Overview / Cloudinary Container Preview Trigger */}
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#131B26] border border-[rgba(120,170,200,0.25)] hover:border-[#D4AF37] text-[11px] text-[#D4AF37] transition-colors"
                    title="Video overview"
                  >
                    <Play className="w-3 h-3 fill-[#D4AF37]" />
                    <span className="font-medium">Video</span>
                  </button>
                </div>

                {/* Performance Chart & Live Inspection Widget */}
                <div className="bg-[#090D14]/85 rounded-xl p-4 sm:p-5 border border-[rgba(120,170,200,0.16)] shadow-inner">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="text-[#9BAABD] font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>{currentChart.metricName}</span>
                    </span>
                    <span className="font-mono tabular-nums text-sm font-bold text-[#F4D36B]">
                      {currentChart.metricValue}
                    </span>
                  </div>

                  {/* Interactive SVG Area & Line Chart with motion path animation */}
                  <div className="h-32 w-full relative">
                    <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="cyanGoldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.30" />
                          <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.10" />
                          <stop offset="100%" stopColor="#090D14" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00E5FF" />
                          <stop offset="50%" stopColor="#D4AF37" />
                          <stop offset="100%" stopColor="#F4D36B" />
                        </linearGradient>
                      </defs>

                      {/* Hairline Grid Lines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(120,170,200,0.12)" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(120,170,200,0.12)" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(120,170,200,0.12)" strokeDasharray="3 3" />

                      {/* Area Fill */}
                      <path
                        d={`M 10 90 L 10 ${100 - currentChart.values[0] * 0.75} 
                           L 80 ${100 - currentChart.values[1] * 0.75} 
                           L 150 ${100 - currentChart.values[2] * 0.75} 
                           L 220 ${100 - currentChart.values[3] * 0.75} 
                           L 290 ${100 - currentChart.values[4] * 0.75} 
                           L 290 90 Z`}
                        fill="url(#cyanGoldGradient)"
                      />

                      {/* Animated Stroke Line */}
                      <motion.path
                        key={selectedService}
                        initial={{ pathLength: 0, opacity: 0.4 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        d={`M 10 ${100 - currentChart.values[0] * 0.75} 
                           Q 45 ${(100 - currentChart.values[0] * 0.75 + 100 - currentChart.values[1] * 0.75) / 2} 80 ${100 - currentChart.values[1] * 0.75}
                           Q 115 ${(100 - currentChart.values[1] * 0.75 + 100 - currentChart.values[2] * 0.75) / 2} 150 ${100 - currentChart.values[2] * 0.75}
                           Q 185 ${(100 - currentChart.values[2] * 0.75 + 100 - currentChart.values[3] * 0.75) / 2} 220 ${100 - currentChart.values[3] * 0.75}
                           Q 255 ${(100 - currentChart.values[3] * 0.75 + 100 - currentChart.values[4] * 0.75) / 2} 290 ${100 - currentChart.values[4] * 0.75}`}
                        fill="none"
                        stroke="url(#goldLineGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Interactive Data Points with pulse and hover ring */}
                      {currentChart.values.map((val, idx) => {
                        const cx = 10 + idx * 70;
                        const cy = 100 - val * 0.75;
                        const isSelected = activeDataPoint === idx;
                        return (
                          <g key={idx} className="cursor-pointer" onClick={() => setActiveDataPoint(idx)}>
                            <circle
                              cx={cx}
                              cy={cy}
                              r={isSelected ? 6 : 4}
                              fill={isSelected ? '#F4D36B' : '#090D14'}
                              stroke={isSelected ? '#D4AF37' : '#00E5FF'}
                              strokeWidth={isSelected ? '2.5' : '1.75'}
                              className="transition-all duration-150"
                            />
                            {isSelected && (
                              <circle cx={cx} cy={cy} r="11" fill="none" stroke="#F4D36B" strokeWidth="1" opacity="0.6" />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Horizontal Labels */}
                  <div className="flex justify-between items-center mt-2.5 text-[10px] text-[#9BAABD] font-mono">
                    {currentChart.labels.map((label, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveDataPoint(idx)}
                        className={`transition-colors hover:text-[#F4D36B] ${
                          activeDataPoint === idx ? 'text-[#F4D36B] font-bold' : ''
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Point Inspector */}
                  <div className="mt-3 pt-2.5 border-t border-[rgba(120,170,200,0.1)] text-[11px] text-[#9BAABD] flex items-center justify-between">
                    <span className="truncate pr-2">{activeDetailText}</span>
                    <span className="font-mono text-[#00E5FF] font-semibold shrink-0">
                      {currentChart.values[activeDataPoint]}%
                    </span>
                  </div>
                </div>

                {/* Sub-Metric Cards Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#0C131D]/90 p-3 rounded-lg border border-[rgba(120,170,200,0.14)]">
                    <div className="text-[11px] text-[#9BAABD]">{t.hero.complianceScore}</div>
                    <div className="font-mono tabular-nums text-base font-bold text-[#36D6A0] mt-0.5 flex items-center gap-1.5">
                      <span>99.2%</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#36D6A0]" />
                    </div>
                  </div>

                  <div className="bg-[#0C131D]/90 p-3 rounded-lg border border-[rgba(120,170,200,0.14)]">
                    <div className="text-[11px] text-[#9BAABD]">{t.hero.riskMatrix}</div>
                    <div className="font-mono tabular-nums text-base font-bold text-[#00E5FF] mt-0.5 flex items-center gap-1.5">
                      <span>AA+ Minimum</span>
                      <TrendingUp className="w-3.5 h-3.5 text-[#00E5FF]" />
                    </div>
                  </div>
                </div>

                {/* Diagnostic CTA Strip */}
                <button
                  type="button"
                  onClick={onOpenDiagnostic}
                  className="w-full flex items-center justify-between p-3.5 rounded-lg bg-[#131B26] hover:bg-[#131B26]/80 border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all text-xs group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#36D6A0]" />
                    <span className="text-[#F5F7FA] font-medium">{t.hero.viewDiagnostics}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>{currentLang === 'az' ? 'Hesabla' : currentLang === 'en' ? 'Launch' : 'Запуск'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>

              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Cloudinary-Ready Video Presentation Container Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseVideoModal();
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel-elevated rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative border border-[#D4AF37]/40 shadow-2xl"
            >
              <button
                type="button"
                onClick={handleCloseVideoModal}
                className="absolute top-5 right-5 p-2 rounded-lg bg-[#090D14] border border-[rgba(120,170,200,0.2)] text-[#9BAABD] hover:text-[#F5F7FA] transition-colors"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{t.hero.videoModal.tag}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F7FA] mb-4">
                {t.hero.videoModal.title}
              </h3>

              {/* Video Player Display Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[rgba(120,170,200,0.2)] mb-4 flex items-center justify-center group shadow-2xl">
                {isPlaying && configuredVideoUrl && !videoError ? (
                  <video
                    ref={videoRef}
                    src={configuredVideoUrl}
                    poster="/images/hero_financial_hq.jpg"
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                    onError={() => {
                      setVideoError(true);
                      setIsPlaying(false);
                    }}
                  >
                    Your browser does not support HTML5 video streaming.
                  </video>
                ) : (
                  <>
                    <ImageWithFallback
                      src="/images/hero_financial_hq.jpg"
                      fallbackSrc={heroHqImg}
                      alt="audit.az architectural headquarters"
                      className="w-full h-full object-cover opacity-75"
                      containerClassName="w-full h-full absolute inset-0"
                      fallbackTitle="audit.az Video Infrastructure"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                      {videoError ? (
                        <div className="max-w-md bg-[#090D14]/90 border border-red-500/40 p-4 rounded-xl flex flex-col items-center shadow-lg">
                          <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
                          <div className="text-sm font-semibold text-[#F5F7FA] mb-1">
                            {t.hero.videoModal.errorTitle}
                          </div>
                          <div className="text-xs text-[#9BAABD] mb-3">
                            {t.hero.videoModal.errorDesc}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setVideoError(false);
                              handlePlayClick();
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#F4D36B] text-[#090D14] text-xs font-semibold transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{t.hero.videoModal.retry}</span>
                          </button>
                        </div>
                      ) : notConfiguredNotice ? (
                        <div className="max-w-md bg-[#090D14]/90 border border-[#D4AF37]/50 p-5 rounded-xl flex flex-col items-center shadow-xl animate-fadeIn">
                          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F4D36B] mb-2.5">
                            <Info className="w-5 h-5" />
                          </div>
                          <div className="text-sm font-semibold text-[#F5F7FA] mb-1">
                            {t.hero.videoModal.notConfiguredTitle}
                          </div>
                          <div className="text-xs text-[#9BAABD] leading-relaxed mb-4">
                            {t.hero.videoModal.notConfiguredDesc}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setNotConfiguredNotice(false);
                                setShowConfigInput(true);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131B26] border border-[#D4AF37]/40 hover:border-[#F4D36B] text-[#F4D36B] text-xs font-medium transition-colors"
                            >
                              <Settings2 className="w-3.5 h-3.5" />
                              <span>{t.hero.videoModal.configureUrl}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setNotConfiguredNotice(false)}
                              className="px-3 py-1.5 rounded-lg text-xs text-[#9BAABD] hover:text-[#F5F7FA] transition-colors"
                            >
                              {t.hero.videoModal.close}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={handlePlayClick}
                            aria-label={t.hero.videoModal.playButton}
                            className="w-16 h-16 rounded-full bg-[#090D14]/85 border-2 border-[#D4AF37] hover:border-[#F4D36B] hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-[#F4D36B] mb-3 shadow-xl shadow-black/80 group/play cursor-pointer"
                          >
                            <Play className="w-6 h-6 fill-[#F4D36B] ml-1 group-hover/play:scale-110 transition-transform" />
                          </button>
                          <div className="text-sm font-semibold text-[#F5F7FA]">
                            {configuredVideoUrl ? t.hero.videoModal.playButton : t.hero.videoModal.readyForStream}
                          </div>
                          <div className="text-xs text-[#9BAABD] max-w-md mt-1">
                            {configuredVideoUrl 
                              ? 'Cloudinary stream endpoint verified and ready.' 
                              : t.hero.videoModal.staticPreviewBadge}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Status and Optional Stream Configuration Bar */}
              {showConfigInput ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4 p-3 bg-[#090D14]/85 rounded-xl border border-[rgba(120,170,200,0.18)]">
                  <input
                    type="url"
                    value={tempUrlInput}
                    onChange={(e) => setTempUrlInput(e.target.value)}
                    placeholder={t.hero.videoModal.urlPlaceholder}
                    className="flex-1 px-3 py-2 text-xs bg-[#131B26] border border-[rgba(120,170,200,0.2)] rounded-lg text-[#F5F7FA] placeholder-[#9BAABD]/60 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (tempUrlInput.trim()) {
                          setConfiguredVideoUrl(tempUrlInput.trim());
                          setNotConfiguredNotice(false);
                          setVideoError(false);
                          setIsPlaying(true);
                        }
                      }}
                      className="px-3 py-2 text-xs font-semibold bg-[#D4AF37] hover:bg-[#F4D36B] text-[#090D14] rounded-lg transition-colors whitespace-nowrap"
                    >
                      {t.hero.videoModal.applyUrl}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setConfiguredVideoUrl('');
                        setTempUrlInput('');
                        setIsPlaying(false);
                        setNotConfiguredNotice(false);
                        setShowConfigInput(false);
                      }}
                      className="px-3 py-2 text-xs text-[#9BAABD] hover:text-white transition-colors"
                    >
                      {t.hero.videoModal.clearUrl}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-4 text-[11px] text-[#9BAABD]">
                  <span className="flex items-center gap-2 font-mono">
                    <span className={`w-2 h-2 rounded-full ${configuredVideoUrl ? 'bg-[#36D6A0]' : 'bg-[#D4AF37]'}`} />
                    <span>
                      {configuredVideoUrl ? 'Video Stream Configured' : t.hero.videoModal.staticPreviewBadge}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setTempUrlInput(configuredVideoUrl);
                      setShowConfigInput(true);
                    }}
                    className="inline-flex items-center gap-1 text-[#D4AF37] hover:text-[#F4D36B] transition-colors font-medium text-[11px]"
                  >
                    <Settings2 className="w-3 h-3" />
                    <span>{t.hero.videoModal.configureUrl}</span>
                  </button>
                </div>
              )}

              <div className="flex justify-end pt-2 border-t border-[rgba(120,170,200,0.12)]">
                <button
                  type="button"
                  onClick={handleCloseVideoModal}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#090D14] bg-[#D4AF37] rounded-lg hover:bg-[#F4D36B] transition-colors"
                >
                  {t.hero.videoModal.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
