import React from 'react';
import { PaymentEntityConfig } from '@/config/gccPaymentEntities';
import { Loader2 } from 'lucide-react';

interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  config: PaymentEntityConfig;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  config,
  variant = 'primary',
  fullWidth = true,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const isPrimary = variant === 'primary';

  return (
    <button
      className={className}
      disabled={disabled || loading}
      style={{
        width: fullWidth ? '100%' : undefined,
        height: config.btnHeight,
        borderRadius: config.btnRadius,
        fontWeight: config.btnTextWeight,
        fontSize: '16px',
        fontFamily: config.font,
        transition: 'all 0.2s ease',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        ...(isPrimary
          ? {
              background: `linear-gradient(135deg, ${config.primary}, ${config.accent})`,
              color: '#FFFFFF',
              border: 'none',
              boxShadow: config.btnShadow,
            }
          : {
              background: 'transparent',
              color: config.primary,
              border: `2px solid ${config.primary}`,
              boxShadow: 'none',
            }),
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading && isPrimary) {
          (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
          (e.target as HTMLButtonElement).style.filter = 'brightness(0.92)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading && isPrimary) {
          (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
          (e.target as HTMLButtonElement).style.filter = 'brightness(1)';
        }
      }}
      {...props}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
};
