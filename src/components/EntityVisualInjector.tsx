import React, { useEffect, useRef } from 'react';
import { applyEntityVisuals, removeEntityVisuals, getEntityVisualSpec } from '@/lib/entityVisualInjector';
import { getEntityVisualSpec as getSpec } from '@/lib/entityVisualSpecs';

interface EntityVisualInjectorProps {
  /** Entity key (e.g., 'aramex', 'sadad', 'nafath') */
  entityKey: string;
  /** Children to render with entity visuals applied */
  children: React.ReactNode;
  /** Whether to apply visuals automatically on mount */
  autoApply?: boolean;
  /** Additional className for container */
  className?: string;
}

/**
 * EntityVisualInjector
 * 
 * Applies 1:1 pixel-perfect official visual specs to payment pages.
 * Detects entity from props/URL and injects:
 * - CSS custom properties
 * - Entity-specific style blocks
 * - Google Fonts (Arabic gov fonts)
 * - Data attributes for conditional styling
 * 
 * STRICT ZERO LOGIC MODIFICATION — UI ONLY
 */
export const EntityVisualInjector: React.FC<EntityVisualInjectorProps> = ({
  entityKey,
  children,
  autoApply = true,
  className = '',
}) => {
  const appliedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!entityKey || !autoApply) return;

    // Only re-apply if entity changed
    if (appliedRef.current === entityKey) return;

    const success = applyEntityVisuals(entityKey);
    if (success) {
      appliedRef.current = entityKey;
    }

    // Cleanup on unmount or entity change
    return () => {
      removeEntityVisuals();
      appliedRef.current = null;
    };
  }, [entityKey, autoApply]);

  const spec = getSpec(entityKey);
  
  if (!spec) {
    // No spec found — render children without entity visuals
    return <>{children}</>;
  }

  return (
    <div
      className={`entity-container ${className}`}
      data-entity-id={spec.entityId}
      data-entity-category={spec.category}
      data-entity-country={spec.countryCode}
      dir="rtl"
      style={{
        maxWidth: spec.dimensions.containerMaxWidth,
        margin: '0 auto',
        fontFamily: spec.typography.fontFamilyAr,
        backgroundColor: spec.colors.background,
        color: spec.colors.text,
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};

/**
 * EntityHeader — Renders entity logo and title with official specs
 */
interface EntityHeaderProps {
  entityKey: string;
  showTitle?: boolean;
  className?: string;
}

export const EntityHeader: React.FC<EntityHeaderProps> = ({
  entityKey,
  showTitle = true,
  className = '',
}) => {
  const spec = getSpec(entityKey);
  
  if (!spec) return null;

  return (
    <header
      className={`entity-header ${className}`}
      style={{
        height: spec.dimensions.headerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: spec.uiComponents.headerStyle === 'logo-center' ? 'center' : 'space-between',
        padding: '0 16px',
        backgroundColor: spec.colors.surface,
        boxShadow: spec.shadows.header,
        borderBottom: `1px solid ${spec.colors.border}`,
      }}
    >
      {spec.assets.logo && (
        <img
          src={spec.assets.logo}
          alt={`${spec.entityNameAr} - ${spec.entityNameEn}`}
          className="entity-logo"
          style={{
            width: spec.dimensions.logoWidth,
            height: spec.dimensions.logoHeight,
            objectFit: 'contain',
          }}
          onError={(e) => {
            // Fallback: show entity name as text
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = document.createElement('span');
            fallback.textContent = spec.entityNameAr;
            fallback.style.fontSize = '20px';
            fallback.style.fontWeight = spec.typography.headingWeight;
            fallback.style.color = spec.colors.primary;
            target.parentNode?.appendChild(fallback);
          }}
        />
      )}
      
      {showTitle && spec.uiComponents.headerStyle === 'logo-with-title' && (
        <h1
          className="entity-header__title"
          style={{
            fontFamily: spec.typography.fontFamilyAr,
            fontWeight: spec.typography.headingWeight,
            fontSize: '20px',
            color: spec.colors.text,
            margin: 0,
          }}
        >
          {spec.entityNameAr}
        </h1>
      )}
    </header>
  );
};

/**
 * EntityCard — Renders a card with entity visual specs
 */
interface EntityCardProps {
  children: React.ReactNode;
  entityKey: string;
  className?: string;
}

export const EntityCard: React.FC<EntityCardProps> = ({
  children,
  entityKey,
  className = '',
}) => {
  const spec = getSpec(entityKey);
  
  if (!spec) {
    return <div className={`entity-card ${className}`}>{children}</div>;
  }

  return (
    <div
      className={`entity-card ${className}`}
      style={{
        backgroundColor: spec.colors.surface,
        borderRadius: spec.dimensions.borderRadius,
        padding: spec.dimensions.cardPadding,
        boxShadow: spec.shadows.card,
        border: `1px solid ${spec.colors.border}`,
        margin: '16px',
      }}
    >
      {children}
    </div>
  );
};

/**
 * EntityButton — Renders a button with entity visual specs
 */
interface EntityButtonProps {
  children: React.ReactNode;
  entityKey: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const EntityButton: React.FC<EntityButtonProps> = ({
  children,
  entityKey,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const spec = getSpec(entityKey);
  
  if (!spec) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`entity-button ${className}`}
      >
        {children}
      </button>
    );
  }

  const buttonShape = spec.uiComponents.buttonStyle;
  const buttonRadius = buttonShape === 'rounded' ? spec.dimensions.borderRadius : buttonShape === 'pill' ? '9999px' : '0px';

  const isPrimary = variant === 'primary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`entity-button ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: spec.dimensions.buttonHeight,
        padding: '0 24px',
        border: isPrimary ? 'none' : `1px solid ${spec.colors.border}`,
        borderRadius: buttonRadius,
        backgroundColor: isPrimary ? spec.colors.button : 'transparent',
        color: isPrimary ? spec.colors.buttonText : spec.colors.text,
        fontFamily: spec.typography.fontFamilyAr,
        fontSize: '16px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '88px',
        width: '100%',
        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled && isPrimary) {
          (e.target as HTMLButtonElement).style.backgroundColor = spec.colors.buttonHover;
          (e.target as HTMLButtonElement).style.boxShadow = spec.shadows.button;
          (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && isPrimary) {
          (e.target as HTMLButtonElement).style.backgroundColor = spec.colors.button;
          (e.target as HTMLButtonElement).style.boxShadow = 'none';
          (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </button>
  );
};

/**
 * EntityInput — Renders an input field with entity visual specs
 */
interface EntityInputProps {
  entityKey: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  name?: string;
  required?: boolean;
}

export const EntityInput: React.FC<EntityInputProps> = ({
  entityKey,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  label,
  name,
  required = false,
}) => {
  const spec = getSpec(entityKey);
  
  if (!spec) {
    return (
      <div className="entity-input-wrapper">
        {label && <label className="entity-input-label">{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`entity-input ${className}`}
          name={name}
          required={required}
        />
      </div>
    );
  }

  return (
    <div className="entity-input-wrapper" style={{ marginBottom: '16px' }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontFamily: spec.typography.fontFamilyAr,
            fontSize: '14px',
            fontWeight: 600,
            color: spec.colors.text,
            marginBottom: '8px',
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`entity-input ${className}`}
        name={name}
        required={required}
        style={{
          width: '100%',
          height: spec.dimensions.inputHeight,
          padding: `0 ${spec.dimensions.inputPaddingX}`,
          border: `1px solid ${spec.colors.inputBorder}`,
          borderRadius: spec.dimensions.borderRadius,
          backgroundColor: spec.colors.inputBg,
          color: spec.colors.text,
          fontFamily: spec.typography.fontFamilyAr,
          fontSize: spec.dimensions.inputFontSize,
          transition: 'all 0.2s ease',
          boxShadow: spec.shadows.input,
          boxSizing: 'border-box',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = spec.colors.primary;
          e.target.style.boxShadow = `0 0 0 3px ${spec.colors.primary}20`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = spec.colors.inputBorder;
          e.target.style.boxShadow = spec.shadows.input;
        }}
      />
    </div>
  );
};

export default EntityVisualInjector;
