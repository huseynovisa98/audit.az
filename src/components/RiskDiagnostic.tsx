import React, { useState, useId } from 'react';
import { Sliders, AlertCircle, ArrowUpRight, CheckCircle2, ShieldAlert, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface RiskDiagnosticProps {
  currentLang: Language;
  onApplyToConsultation: (summaryText: string) => void;
}

export const RiskDiagnostic: React.FC<RiskDiagnosticProps> = ({
  currentLang,
  onApplyToConsultation,
}) => {
  const t = translations[currentLang];
  const [sensitivity, setSensitivity] = useState<number>(45);
  const sliderId = useId();

  // Mathematical model mapping sensitivity (0-100) to corporate risk indicators:
  const normalizedSensitivity = sensitivity / 100;

  // Financial Health Index (0-100)
  const healthIndex = Math.round(92 - normalizedSensitivity * 36);

  // Liquidity ratio (e.g. 2.2x down to 1.1x)
  const liquidityRatio = Number((2.2 - normalizedSensitivity * 1.1).toFixed(2));

  // Profitability margin (e.g. 24% down to 8.5%)
  const profitability = Number((24 - normalizedSensitivity * 15.5).toFixed(1));

  // Leverage ratio (e.g. 24% up to 76%)
  const leverage = Math.round(24 + normalizedSensitivity * 52);

  // Compliance score (99% down to 83%)
  const compliance = Math.round(99 - normalizedSensitivity * 16);

  // Risk Level Category
  let riskStatus: string = t.diagnostic.statusHigh;
  let riskColor: string = '#36D6A0'; // green
  let insightText: string = t.diagnostic.dynamicInsights.highStability;

  if (sensitivity > 65) {
    riskStatus = t.diagnostic.statusWarning;
    riskColor = '#F4D36B'; // gold/amber
    insightText = t.diagnostic.dynamicInsights.critical;
  } else if (sensitivity > 35) {
    riskStatus = t.diagnostic.statusModerate;
    riskColor = '#00E5FF'; // cyan
    insightText = t.diagnostic.dynamicInsights.moderate;
  }

  // Circular gauge calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthIndex / 100) * circumference;

  const handleConsultWithMetrics = () => {
    const summary = `${t.diagnostic.healthIndex}: ${healthIndex}/100, ${t.diagnostic.sensitivityLabel}: ${sensitivity}%, ${t.diagnostic.metrics.liquidity}: ${liquidityRatio}x, ${t.diagnostic.metrics.leverage}: ${leverage}%`;
    onApplyToConsultation(summary);
  };

  // Sparkline data generators based on current state
  const liquidityPoints = [1.9, 2.05, 1.85, 2.1, liquidityRatio];
  const profitabilityPoints = [19.5, 21.0, 20.2, 22.8, profitability];
  const leveragePoints = [30, 32, 28, 35, leverage];
  const compliancePoints = [97, 98, 97.5, 99, compliance];

  // Helper to convert array of numbers into SVG polyline points (scaled to 120 x 26)
  const generateSparklinePath = (data: number[], min: number, max: number) => {
    const range = max - min || 1;
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * 110 + 5;
      const normalized = (val - min) / range;
      const y = 22 - normalized * 18;
      return `${x},${y}`;
    });
    return points.join(' ');
  };

  return (
    <section id="diagnostic" className="relative py-28 bg-[#0C131D] border-y border-[rgba(120,170,200,0.14)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-[#00E5FF]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37] mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>{t.diagnostic.tag}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F7FA] tracking-tight">
            {t.diagnostic.title}
          </h2>
          <p className="mt-4 text-base text-[#9BAABD] leading-relaxed">
            {t.diagnostic.subtitle}
          </p>
        </motion.div>

        {/* Dashboard Terminal Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel-elevated rounded-2xl p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto relative overflow-hidden"
        >
          
          {/* Top indicator bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[rgba(120,170,200,0.14)] text-xs">
            <div className="flex items-center gap-2 text-[#9BAABD]">
              <Activity className="w-4 h-4 text-[#00E5FF]" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                {currentLang === 'az' ? 'Terminal: Risk & Likvidlik Analizatoru' : currentLang === 'en' ? 'Terminal: Corporate Risk & Liquidity Analyzer' : 'Терминал анализа корпоративных рисков'}
              </span>
            </div>
            <div className="font-mono text-[11px] text-[#D4AF37]">
              v2026.1 · IFRS / ISA Core
            </div>
          </div>

          {/* Top Control Bar: Sensitivity Slider and Presets */}
          <div className="bg-[#090D14]/90 rounded-xl p-5 sm:p-6 border border-[rgba(120,170,200,0.18)] mb-8 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <label htmlFor={sliderId} className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2.5">
                  <span>{t.diagnostic.sensitivityLabel}</span>
                  <span className="font-mono tabular-nums text-xs font-bold px-2.5 py-0.5 rounded bg-[#131B26] border border-[#D4AF37]/50 text-[#F4D36B] shadow-sm">
                    {sensitivity}%
                  </span>
                </label>
                <p className="text-xs text-[#9BAABD] mt-1">
                  {currentLang === 'az'
                    ? 'Stress dərəcəsini dəyişərək qısamüddətli öhdəliklər və kapital adekvatlığını test edin.'
                    : currentLang === 'en'
                    ? 'Adjust the stress testing factor to observe balance sheet resistance under external shocks.'
                    : 'Регулируйте стресс-фактор для оценки устойчивости баланса к внешним шокам.'}
                </p>
              </div>

              {/* Preset Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSensitivity(20)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    sensitivity <= 25
                      ? 'bg-[#131B26] text-[#36D6A0] border border-[#36D6A0]/60 font-semibold shadow-sm'
                      : 'bg-[#131B26]/60 text-[#9BAABD] border border-[rgba(120,170,200,0.15)] hover:text-[#F5F7FA]'
                  }`}
                >
                  {t.diagnostic.presets.conservative}
                </button>
                <button
                  type="button"
                  onClick={() => setSensitivity(50)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    sensitivity > 25 && sensitivity < 70
                      ? 'bg-[#131B26] text-[#00E5FF] border border-[#00E5FF]/60 font-semibold shadow-sm'
                      : 'bg-[#131B26]/60 text-[#9BAABD] border border-[rgba(120,170,200,0.15)] hover:text-[#F5F7FA]'
                  }`}
                >
                  {t.diagnostic.presets.balanced}
                </button>
                <button
                  type="button"
                  onClick={() => setSensitivity(85)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    sensitivity >= 70
                      ? 'bg-[#131B26] text-[#F4D36B] border border-[#F4D36B]/60 font-semibold shadow-sm'
                      : 'bg-[#131B26]/60 text-[#9BAABD] border border-[rgba(120,170,200,0.15)] hover:text-[#F5F7FA]'
                  }`}
                >
                  {t.diagnostic.presets.growth}
                </button>
              </div>
            </div>

            {/* Custom Gold Range Slider */}
            <div className="relative pt-2">
              <input
                id={sliderId}
                type="range"
                min="0"
                max="100"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="w-full range-gold cursor-pointer"
                aria-label={t.diagnostic.sensitivityLabel}
              />
              <div className="flex justify-between text-[11px] font-mono text-[#9BAABD] mt-2.5">
                <span>0% ({currentLang === 'az' ? 'Bazis / Stabil' : currentLang === 'en' ? 'Baseline' : 'Базовый'})</span>
                <span>50% ({currentLang === 'az' ? 'Orta Təzyiq' : currentLang === 'en' ? 'Moderate Stress' : 'Умеренный стресс'})</span>
                <span>100% ({currentLang === 'az' ? 'Maksimal Stress' : currentLang === 'en' ? 'High Shock' : 'Максимальный шок'})</span>
              </div>
            </div>
          </div>

          {/* Metric Outputs: Split Circular Gauge & Diagnostic Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Circular Gauge Card with Calibrated Ring & Motion stroke */}
            <div className="lg:col-span-5 bg-[#090D14]/85 rounded-xl p-6 sm:p-7 border border-[rgba(120,170,200,0.16)] flex flex-col items-center justify-center text-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 150 150">
                  {/* Concentric tick marks */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                    <line
                      key={idx}
                      x1="75"
                      y1="6"
                      x2="75"
                      y2="10"
                      stroke="rgba(120,170,200,0.25)"
                      strokeWidth="1.5"
                      transform={`rotate(${angle} 75 75)`}
                    />
                  ))}

                  {/* Background Track */}
                  <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    className="stroke-[#131B26]"
                    strokeWidth="11"
                    fill="transparent"
                  />

                  {/* Dynamic Progress Stroke with Motion */}
                  <motion.circle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke={riskColor}
                    strokeWidth="11"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Score Number in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-editorial text-5xl font-bold text-[#F5F7FA] tabular-nums">
                    {healthIndex}
                  </span>
                  <span className="text-[11px] font-mono text-[#9BAABD] uppercase tracking-wider mt-0.5">
                    / 100 İndeks
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div
                className="mt-4 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                style={{
                  backgroundColor: `${riskColor}18`,
                  color: riskColor,
                  border: `1px solid ${riskColor}50`,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: riskColor }} />
                <span>{riskStatus}</span>
              </div>

              <div className="text-xs text-[#9BAABD] mt-2 font-medium">
                {t.diagnostic.healthIndex}
              </div>
            </div>

            {/* Metrics Breakdown Grid with Miniature SVG Sparklines */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                
                {/* 1. Liquidity with Sparkline */}
                <div className="bg-[#090D14]/85 p-4 rounded-xl border border-[rgba(120,170,200,0.15)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#9BAABD]">
                      <span>{t.diagnostic.metrics.liquidity}</span>
                      <span className="text-[#00E5FF] font-mono text-[11px]">
                        {currentLang === 'az' ? 'Hədəf >1.5x' : currentLang === 'en' ? 'Target >1.5x' : 'Цель >1.5x'}
                      </span>
                    </div>
                    <div className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-[#F5F7FA] mt-1">
                      {liquidityRatio}x
                    </div>
                  </div>

                  {/* Miniature Sparkline Chart */}
                  <div className="mt-2 pt-2 border-t border-[rgba(120,170,200,0.1)]">
                    <div className="h-6 w-full">
                      <svg viewBox="0 0 120 26" className="w-full h-full overflow-visible">
                        <polyline
                          fill="none"
                          stroke="#00E5FF"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={generateSparklinePath(liquidityPoints, 1.0, 2.5)}
                        />
                        <circle
                          cx="115"
                          cy={22 - ((liquidityRatio - 1.0) / 1.5) * 18}
                          r="3"
                          fill="#00E5FF"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 2. Profitability with Sparkline */}
                <div className="bg-[#090D14]/85 p-4 rounded-xl border border-[rgba(120,170,200,0.15)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#9BAABD]">
                      <span>{t.diagnostic.metrics.profitability}</span>
                      <span className="text-[#36D6A0] font-mono text-[11px]">
                        {currentLang === 'az' ? 'Hədəf >15%' : currentLang === 'en' ? 'Target >15%' : 'Цель >15%'}
                      </span>
                    </div>
                    <div className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-[#F5F7FA] mt-1">
                      {profitability}%
                    </div>
                  </div>

                  {/* Miniature Sparkline Chart */}
                  <div className="mt-2 pt-2 border-t border-[rgba(120,170,200,0.1)]">
                    <div className="h-6 w-full">
                      <svg viewBox="0 0 120 26" className="w-full h-full overflow-visible">
                        <polyline
                          fill="none"
                          stroke="#36D6A0"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={generateSparklinePath(profitabilityPoints, 5, 26)}
                        />
                        <circle
                          cx="115"
                          cy={22 - ((profitability - 5) / 21) * 18}
                          r="3"
                          fill="#36D6A0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 3. Leverage with Sparkline */}
                <div className="bg-[#090D14]/85 p-4 rounded-xl border border-[rgba(120,170,200,0.15)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#9BAABD]">
                      <span>{t.diagnostic.metrics.leverage}</span>
                      <span className="text-[#F4D36B] font-mono text-[11px]">
                        {currentLang === 'az' ? 'Limit <50%' : currentLang === 'en' ? 'Limit <50%' : 'Лимит <50%'}
                      </span>
                    </div>
                    <div className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-[#F5F7FA] mt-1">
                      {leverage}%
                    </div>
                  </div>

                  {/* Miniature Sparkline Chart */}
                  <div className="mt-2 pt-2 border-t border-[rgba(120,170,200,0.1)]">
                    <div className="h-6 w-full">
                      <svg viewBox="0 0 120 26" className="w-full h-full overflow-visible">
                        <polyline
                          fill="none"
                          stroke="#F4D36B"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={generateSparklinePath(leveragePoints, 20, 80)}
                        />
                        <circle
                          cx="115"
                          cy={22 - ((leverage - 20) / 60) * 18}
                          r="3"
                          fill="#F4D36B"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 4. Compliance with Sparkline */}
                <div className="bg-[#090D14]/85 p-4 rounded-xl border border-[rgba(120,170,200,0.15)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#9BAABD]">
                      <span>{t.diagnostic.metrics.compliance}</span>
                      <span className="text-[#36D6A0] font-mono text-[11px]">ISA 100%</span>
                    </div>
                    <div className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-[#F5F7FA] mt-1">
                      {compliance}%
                    </div>
                  </div>

                  {/* Miniature Sparkline Chart */}
                  <div className="mt-2 pt-2 border-t border-[rgba(120,170,200,0.1)]">
                    <div className="h-6 w-full">
                      <svg viewBox="0 0 120 26" className="w-full h-full overflow-visible">
                        <polyline
                          fill="none"
                          stroke="#00E5FF"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={generateSparklinePath(compliancePoints, 80, 100)}
                        />
                        <circle
                          cx="115"
                          cy={22 - ((compliance - 80) / 20) * 18}
                          r="3"
                          fill="#00E5FF"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              {/* Dynamic Insight Banner with AnimatePresence */}
              <div className="p-4 rounded-xl bg-[#131B26]/80 border border-[rgba(120,170,200,0.18)] flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {sensitivity > 65 ? (
                    <ShieldAlert className="w-5 h-5 text-[#F4D36B]" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-[#00E5FF]" />
                  )}
                </div>
                <div className="text-xs text-[#9BAABD] leading-relaxed">
                  <span className="font-semibold text-[#F5F7FA] mr-1">
                    {currentLang === 'az' ? 'Ekspert Qiymətləndirməsi:' : currentLang === 'en' ? 'Expert Outlook:' : 'Экспертная оценка:'}
                  </span>
                  {insightText}
                </div>
              </div>

              {/* Diagnostic Consultation CTA */}
              <button
                type="button"
                onClick={handleConsultWithMetrics}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#F4D36B] border border-[#D4AF37]/50 hover:border-[#F4D36B] text-xs font-semibold uppercase tracking-wider transition-all duration-200"
              >
                <span>{t.diagnostic.ctaDiagnostic}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

            </div>

          </div>

          {/* Mandatory Explicit Disclaimer */}
          <div className="mt-8 pt-4 border-t border-[rgba(120,170,200,0.12)] flex items-center justify-center gap-2 text-center text-xs text-[#9BAABD]/80">
            <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{t.diagnostic.disclaimer}</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
