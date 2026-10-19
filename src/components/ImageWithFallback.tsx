import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  priority?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  containerClassName = '',
  fallbackTitle = 'audit.az Institutional Advisory',
  fallbackSubtitle = 'IFRS · ISA · AR Qanunvericiliyi',
  priority = false,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [hasTriedFallback, setHasTriedFallback] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasFailed(false);
    setHasTriedFallback(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (fallbackSrc && !hasTriedFallback && currentSrc !== fallbackSrc) {
      setHasTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasFailed(true);
    }
  };

  if (hasFailed) {
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#131B26] via-[#0C131D] to-[#090D14] border border-[rgba(120,170,200,0.18)] ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-[#090D14] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-3 shadow-lg shadow-black/50">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-[#F5F7FA] font-editorial tracking-wide">
            {fallbackTitle}
          </span>
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider mt-1">
            {fallbackSubtitle}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      {...rest}
    />
  );
};
