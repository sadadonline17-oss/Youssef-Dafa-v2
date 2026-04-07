import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface PaymentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-9 px-3 text-sm';
      case 'lg':
        return 'h-13 px-8 text-lg';
      default:
        return 'h-11 px-6 text-base';
    }
  };

  const getVariantClasses = () => {
    if (disabled || loading) {
      return 'bg-gray-400 text-white border-none cursor-not-allowed opacity-60';
    }

    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all';
      case 'secondary':
        return 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 transition-all';
      case 'outline':
        return 'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600 hover:border-blue-700 transition-all';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white border-none';
    }
  };

  return (
    <button
      className={`
        payment-button payment-button--${variant} payment-button--${size}
        inline-flex items-center justify-center gap-2
        rounded-lg font-medium
        transition-all duration-300
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${getSizeClasses()}
        ${getVariantClasses()}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={20} className="animate-spin" />}
      {!loading && icon && icon}
      <span>{children}</span>
    </button>
  );
};

export default PaymentButton;
