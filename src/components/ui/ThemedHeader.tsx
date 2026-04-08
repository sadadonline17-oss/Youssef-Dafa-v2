import React from 'react';
import { PaymentEntityConfig } from '@/config/gccPaymentEntities';
import { ShieldCheck, Lock } from 'lucide-react';

interface ThemedHeaderProps {
  config: PaymentEntityConfig;
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
}

export const ThemedHeader: React.FC<ThemedHeaderProps> = ({
  config,
  showBackButton = false,
  onBack,
  title,
  subtitle,
}) => {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        backgroundColor: config.surface,
        borderBottomColor: `${config.primary}20`,
        height: config.headerHeight,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ color: config.textMuted }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
          <img
            src={config.logo}
            alt={config.nameAr}
            className="h-8 sm:h-10 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div>
            <h1
              className="text-base sm:text-lg font-bold leading-tight"
              style={{ color: config.text, fontFamily: config.font }}
            >
              {title || config.nameAr}
            </h1>
            {subtitle && (
              <p
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{ color: config.textMuted }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold"
            style={{
              backgroundColor: `${config.primary}08`,
              color: config.primary,
              border: `1px solid ${config.primary}20`,
            }}
          >
            <Lock className="w-3 h-3" />
            <span>SECURE</span>
          </div>
        </div>
      </div>
    </header>
  );
};
