import React, { ReactNode } from 'react';
import { Shield } from 'lucide-react';

interface PaymentCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  noPadding?: boolean;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  headerAction,
  noPadding = false,
}) => {
  return (
    <div
      className={`
        payment-card bg-white rounded-xl border border-gray-200
        transition-all duration-300 flex flex-col min-h-[400px]
        ${noPadding ? 'p-0' : 'p-6'}
        ${className}
      `}
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      {(title || subtitle || headerAction) && (
        <div
          className={`
            payment-card__header flex items-center justify-between
            ${noPadding ? 'border-none pb-0 mb-0' : 'border-b border-gray-200 pb-4 mb-6'}
          `}
        >
          <div>
            {title && (
              <h2 className="payment-card__title text-gray-900 text-lg font-semibold m-0">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="payment-card__subtitle text-gray-500 text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && (
            <div className="payment-card__header-action">
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div className="payment-card__body flex-1">
        {children}
      </div>

      <div className="payment-card__footer mt-auto pt-6 border-t border-gray-200 flex items-center justify-center gap-2">
        <Shield size={16} className="text-emerald-500" />
        <span className="text-emerald-500 text-sm font-medium">
          SSL 256-bit Secure
        </span>
      </div>
    </div>
  );
};

export default PaymentCard;
