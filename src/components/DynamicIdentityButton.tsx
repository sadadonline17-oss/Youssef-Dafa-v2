import React, { useState } from 'react';
import { getEntityIdentity } from '@/lib/dynamicIdentity';
import { useDynamicIdentity } from './DynamicIdentityProvider';

interface DynamicIdentityButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  entityKey?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  children: React.ReactNode;
}

export const DynamicIdentityButton: React.FC<DynamicIdentityButtonProps> = ({
  entityKey,
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { identity } = useDynamicIdentity();

  const currentIdentity = identity || (entityKey ? getEntityIdentity(entityKey) : null);

  if (!currentIdentity) {
    return (
      <button className={`px-6 py-3 rounded-lg font-semibold ${className}`} {...props}>
        {children}
      </button>
    );
  }

  const getBackground = () => {
    if (variant === 'primary') return currentIdentity.colors.primary;
    if (variant === 'secondary') return currentIdentity.colors.secondary;
    if (variant === 'gradient') return currentIdentity.gradients.primary;
    return 'transparent';
  };

  const getHoverFilter = () => {
    const hoverHsl = `brightness(0.92)`;
    return hoverHsl;
  };

  const buttonStyles: React.CSSProperties = {
    background: variant === 'outline' ? 'transparent' : getBackground(),
    color: variant === 'outline' ? currentIdentity.colors.primary : currentIdentity.colors.textOnPrimary,
    border: variant === 'outline' ? `2px solid ${currentIdentity.colors.primary}` : 'none',
    borderRadius: variant === 'outline' ? currentIdentity.borderRadius.sm : currentIdentity.borderRadius.md,
    padding: '12px 24px',
    fontFamily: currentIdentity.fonts.primary,
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: variant !== 'outline' ? currentIdentity.shadows.sm : 'none',
    ...(isHovered && variant !== 'outline' && {
      filter: getHoverFilter(),
      transform: 'translateY(-1px)',
      boxShadow: currentIdentity.shadows.md,
    }),
  };

  return (
    <button
      className={className}
      style={buttonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default DynamicIdentityButton;
