import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/themes/ThemeContext';

interface PaymentHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  className?: string;
  logoPosition?: 'left' | 'center' | 'right';
}

export const PaymentHeader: React.FC<PaymentHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackClick,
  className = '',
  logoPosition = 'left'
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const getLogoPosition = () => {
    switch (logoPosition) {
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  };

  return (
    <header
      className={`payment-header bg-white border-b border-gray-200 ${className}`}
    >
      <div className={`flex items-center gap-4 w-full`}>
        {/* Back Button */}
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            className="text-gray-700 hover:bg-gray-100 rounded-lg"
            aria-label="العودة"
          >
            <ArrowLeft size={20} />
          </Button>
        )}

        {/* Logo - Using theme logo */}
        <div className={`flex ${getLogoPosition()} items-center ${logoPosition === 'center' ? 'flex-1' : ''}`}>
          {theme?.logo ? (
            <img
              src={theme.logo}
              alt={theme?.name || 'Company Logo'}
              className="payment-header__logo h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/120x48?text=Logo';
              }}
            />
          ) : (
            <img
              src="https://via.placeholder.com/120x48?text=Logo"
              alt="Company Logo"
              className="payment-header__logo h-12 w-auto"
            />
          )}
        </div>

        {/* Title and Subtitle */}
        <div className={`flex flex-col gap-1 ${logoPosition === 'center' ? 'flex-1' : ''}`}>
          <h1 className="payment-header__title text-lg font-semibold text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* Company Badge */}
        <div className="ml-auto flex items-center">
          <span className="text-xs font-medium text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
            {theme?.name || 'Company'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default PaymentHeader;
