import React from 'react';
import { PaymentEntityConfig } from '@/config/gccPaymentEntities';

interface ThemedCardProps {
  config: PaymentEntityConfig;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  config,
  children,
  className = '',
  variant = 'default',
}) => {
  const shadows: Record<string, string> = {
    default: '0 2px 8px rgba(0,0,0,0.06)',
    elevated: '0 8px 24px rgba(0,0,0,0.10)',
    outlined: 'none',
  };

  return (
    <div
      className={className}
      style={{
        backgroundColor: config.surface,
        borderRadius: config.cardRadius,
        boxShadow: shadows[variant],
        border: variant === 'outlined' ? `1.5px solid ${config.inputBorder}` : 'none',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};
