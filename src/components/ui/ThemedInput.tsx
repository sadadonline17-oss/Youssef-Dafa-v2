import React, { forwardRef } from 'react';
import { PaymentEntityConfig } from '@/config/gccPaymentEntities';

interface ThemedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  config: PaymentEntityConfig;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const ThemedInput = forwardRef<HTMLInputElement, ThemedInputProps>(
  ({ config, label, error, icon, className = '', style, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            className="block text-sm font-medium"
            style={{
              color: config.textMuted,
              fontFamily: config.font,
              marginBottom: '6px',
            }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={className}
            style={{
              width: '100%',
              padding: icon ? '16px 48px 16px 20px' : config.inputPadding,
              borderRadius: config.inputRadius,
              border: `1.5px solid ${error ? '#EF4444' : config.inputBorder}`,
              backgroundColor: '#FFFFFF',
              color: config.text,
              fontSize: '16px',
              fontFamily: config.font,
              transition: 'all 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box',
              ...style,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = config.primary;
              e.target.style.boxShadow = `0 0 0 3px ${config.inputFocusRing}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = config.inputBorder;
              e.target.style.boxShadow = 'none';
            }}
            {...props}
          />
          {icon && (
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: config.textMuted }}
            >
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium" style={{ color: '#EF4444' }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

ThemedInput.displayName = 'ThemedInput';
