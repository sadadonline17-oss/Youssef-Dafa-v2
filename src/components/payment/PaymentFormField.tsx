import React, { InputHTMLAttributes, ReactNode } from 'react';

interface PaymentFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'flat';
}

export const PaymentFormField: React.FC<PaymentFormFieldProps> = ({
  label,
  error,
  helpText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  variant = 'outlined',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      className={`
        payment-form__field payment-form__field--${variant}
        ${fullWidth ? 'w-full' : 'w-auto'}
        mb-4
        ${className}
      `}
    >
      <label className="payment-form__label block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div className="payment-form__input-wrapper relative flex items-center">
        {leftIcon && (
          <div className="payment-form__left-icon absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          className={`
            payment-form__input
            w-full h-12 px-4
            ${leftIcon ? 'pl-10' : 'pl-4'}
            ${rightIcon ? 'pr-10' : 'pr-4'}
            text-gray-900
            border rounded-lg
            bg-white
            transition-all duration-300
            focus:outline-none focus:ring-2
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && (
          <div className="payment-form__right-icon absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="payment-form__error text-red-500 text-xs mt-1">
          {error}
        </p>
      )}

      {!error && helpText && (
        <p className="payment-form__help-text text-gray-500 text-xs mt-1">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default PaymentFormField;
