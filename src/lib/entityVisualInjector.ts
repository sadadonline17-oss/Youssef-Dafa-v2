// GCC Absolute Visual Executor V1 — Dynamic CSS Injection Engine
// Injects entity-specific CSS variables and style blocks into <head>
// STRICT ZERO LOGIC MODIFICATION — UI ONLY

import { EntityVisualSpec, getEntityVisualSpec, specToCSSVariables } from './entityVisualSpecs';

const STYLE_BLOCK_ID = 'gcc-entity-visual-injector';
const FONT_STYLE_ID = 'gcc-font-injection';

/**
 * Apply entity visual specs via CSS variable injection
 */
export const applyEntityVisuals = (entityKey: string): boolean => {
  const spec = getEntityVisualSpec(entityKey);
  if (!spec) {
    console.warn(`[GCC Visual Executor] No visual spec found for entity: ${entityKey}`);
    return false;
  }

  const cssVars = specToCSSVariables(spec);
  
  // Apply CSS variables to :root
  const root = document.documentElement;
  Object.entries(cssVars).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Inject entity-specific style block
  injectEntityStyleBlock(spec);
  
  // Load entity-specific fonts
  injectEntityFonts(spec);
  
  // Set entity data attributes
  root.setAttribute('data-entity-id', spec.entityId);
  root.setAttribute('data-entity-category', spec.category);
  root.setAttribute('data-entity-country', spec.countryCode);
  root.setAttribute('data-button-shape', spec.uiComponents.buttonStyle);
  root.setAttribute('data-input-style', spec.uiComponents.inputStyle);
  
  // Set body attributes
  document.body.setAttribute('data-entity', spec.entityId);
  document.body.setAttribute('data-entity-category', spec.category);
  
  // Apply RTL for Arabic entities
  if (spec.countryCode === 'SA' || spec.countryCode === 'AE' || 
      spec.countryCode === 'KW' || spec.countryCode === 'QA' || 
      spec.countryCode === 'BH' || spec.countryCode === 'OM') {
    root.setAttribute('dir', 'rtl');
    document.body.setAttribute('dir', 'rtl');
  }

  console.log(`[GCC Visual Executor] Applied visuals for: ${spec.entityNameAr} (${spec.entityNameEn})`);
  return true;
};

/**
 * Inject entity-specific style block into <head>
 */
const injectEntityStyleBlock = (spec: EntityVisualSpec): void => {
  // Remove existing style block
  const existing = document.getElementById(STYLE_BLOCK_ID);
  if (existing) {
    existing.remove();
  }

  const styleBlock = document.createElement('style');
  styleBlock.id = STYLE_BLOCK_ID;
  
  const borderRadius = spec.dimensions.borderRadius;
  const buttonHeight = spec.dimensions.buttonHeight;
  const inputHeight = spec.dimensions.inputHeight;
  const inputPaddingX = spec.dimensions.inputPaddingX;
  const inputFontSize = spec.dimensions.inputFontSize;
  const containerMaxWidth = spec.dimensions.containerMaxWidth;
  const logoWidth = spec.dimensions.logoWidth;
  const logoHeight = spec.dimensions.logoHeight;
  const cardPadding = spec.dimensions.cardPadding;
  const headerHeight = spec.dimensions.headerHeight;
  
  const primary = spec.colors.primary;
  const secondary = spec.colors.secondary;
  const accent = spec.colors.accent;
  const background = spec.colors.background;
  const surface = spec.colors.surface;
  const text = spec.colors.text;
  const textLight = spec.colors.textLight;
  const textOnPrimary = spec.colors.textOnPrimary;
  const border = spec.colors.border;
  const inputBg = spec.colors.inputBg;
  const inputBorder = spec.colors.inputBorder;
  const button = spec.colors.button;
  const buttonHover = spec.colors.buttonHover;
  const buttonText = spec.colors.buttonText;
  
  const fontFamily = spec.typography.fontFamilyAr;
  const headingWeight = spec.typography.headingWeight;
  const bodyWeight = spec.typography.bodyWeight;
  
  const shadowCard = spec.shadows.card;
  const shadowButton = spec.shadows.button;
  const shadowInput = spec.shadows.input;
  const shadowHeader = spec.shadows.header;
  
  const buttonShape = spec.uiComponents.buttonStyle;
  const buttonRadius = buttonShape === 'rounded' ? borderRadius : buttonShape === 'pill' ? '9999px' : '0px';
  
  const hasGradient = spec.uiComponents.hasGradient;
  const gradientDirection = spec.uiComponents.gradientDirection;
  const gradientDir = gradientDirection === 'diagonal' ? '135deg' : gradientDirection === 'vertical' ? '180deg' : '90deg';

  styleBlock.textContent = `
/* GCC Entity Visual Injector — ${spec.entityNameEn} */
:root {
  --entity-primary: ${primary};
  --entity-secondary: ${secondary};
  --entity-accent: ${accent};
  --entity-background: ${background};
  --entity-surface: ${surface};
  --entity-text: ${text};
  --entity-text-light: ${textLight};
  --entity-text-on-primary: ${textOnPrimary};
  --entity-border: ${border};
  --entity-input-bg: ${inputBg};
  --entity-input-border: ${inputBorder};
  --entity-button: ${button};
  --entity-button-hover: ${buttonHover};
  --entity-button-text: ${buttonText};
  --entity-font: ${fontFamily};
  --entity-border-radius: ${borderRadius};
  --entity-button-radius: ${buttonRadius};
  --entity-button-height: ${buttonHeight};
  --entity-input-height: ${inputHeight};
  --entity-input-padding-x: ${inputPaddingX};
  --entity-input-font-size: ${inputFontSize};
  --entity-container-max-width: ${containerMaxWidth};
  --entity-logo-width: ${logoWidth};
  --entity-logo-height: ${logoHeight};
  --entity-card-padding: ${cardPadding};
  --entity-header-height: ${headerHeight};
  --entity-shadow-card: ${shadowCard};
  --entity-shadow-button: ${shadowButton};
  --entity-shadow-input: ${shadowInput};
  --entity-shadow-header: ${shadowHeader};
}

/* Entity Container */
.entity-container {
  max-width: ${containerMaxWidth};
  margin: 0 auto;
  font-family: ${fontFamily};
  background-color: ${background};
  color: ${text};
}

/* Entity Header */
.entity-header {
  height: ${headerHeight};
  display: flex;
  align-items: center;
  justify-content: ${spec.uiComponents.headerStyle === 'logo-center' ? 'center' : 'space-between'};
  padding: 0 16px;
  background-color: ${surface};
  box-shadow: ${shadowHeader};
  border-bottom: 1px solid ${border};
}

.entity-header__logo {
  width: ${logoWidth};
  height: ${logoHeight};
  object-fit: contain;
}

.entity-header__title {
  font-family: ${fontFamily};
  font-weight: ${headingWeight};
  font-size: 20px;
  color: ${text};
  margin: 0;
}

/* Entity Card */
.entity-card {
  background-color: ${surface};
  border-radius: ${borderRadius};
  padding: ${cardPadding};
  box-shadow: ${shadowCard};
  border: 1px solid ${border};
  margin: 16px;
}

.entity-card__title {
  font-family: ${fontFamily};
  font-weight: ${headingWeight};
  font-size: 20px;
  color: ${text};
  margin: 0 0 16px 0;
}

.entity-card__body {
  color: ${textLight};
  font-size: 14px;
}

/* Entity Button */
.entity-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${buttonHeight};
  padding: 0 24px;
  border: none;
  border-radius: ${buttonRadius};
  background-color: ${button};
  color: ${buttonText};
  font-family: ${fontFamily};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 88px;
  width: 100%;
}

.entity-button:hover {
  background-color: ${buttonHover};
  box-shadow: ${shadowButton};
  transform: translateY(-1px);
}

.entity-button:active {
  transform: translateY(0);
}

.entity-button--secondary {
  background-color: transparent;
  color: ${text};
  border: 1px solid ${border};
}

.entity-button--secondary:hover {
  background-color: ${background};
}

/* Entity Input */
.entity-input {
  width: 100%;
  height: ${inputHeight};
  padding: 0 ${inputPaddingX};
  border: 1px solid ${inputBorder};
  border-radius: ${borderRadius};
  background-color: ${inputBg};
  color: ${text};
  font-family: ${fontFamily};
  font-size: ${inputFontSize};
  transition: all 0.2s ease;
  box-shadow: ${shadowInput};
}

.entity-input:focus {
  outline: none;
  border-color: ${primary};
  box-shadow: 0 0 0 3px ${primary}20;
}

.entity-input::placeholder {
  color: ${textLight};
}

/* Entity Background */
.entity-background {
  background-color: ${background};
  min-height: 100vh;
}

.entity-surface {
  background-color: ${surface};
}

/* Entity Typography */
.entity-heading {
  font-family: ${fontFamily};
  font-weight: ${headingWeight};
  color: ${text};
}

.entity-body {
  font-family: ${fontFamily};
  font-weight: ${bodyWeight};
  color: ${textLight};
}

/* Entity Gradient (if enabled) */
${hasGradient ? `
.entity-gradient {
  background: linear-gradient(${gradientDir}, ${primary}, ${secondary});
}
` : ''}

/* Entity Logo */
.entity-logo {
  width: ${logoWidth};
  height: ${logoHeight};
  object-fit: contain;
}

/* Entity Footer */
.entity-footer {
  padding: 24px 16px;
  text-align: center;
  color: ${textLight};
  font-size: 12px;
  border-top: 1px solid ${border};
  background-color: ${surface};
}

/* Entity-specific body attributes */
body[data-entity="${spec.entityId}"] {
  background-color: ${background};
  font-family: ${fontFamily};
}

/* Mobile-first responsive */
@media (max-width: 428px) {
  .entity-container {
    max-width: 100%;
    padding: 0 16px;
  }
  
  .entity-card {
    margin: 12px;
    padding: 20px;
  }
  
  .entity-header {
    height: 56px;
  }
}

@media (min-width: 600px) and (max-width: 768px) {
  .entity-container {
    max-width: ${containerMaxWidth};
  }
  
  .entity-card {
    margin: 16px auto;
    max-width: 560px;
  }
}
`;

  document.head.appendChild(styleBlock);
};

/**
 * Inject entity-specific fonts
 */
const injectEntityFonts = (spec: EntityVisualSpec): void => {
  // Remove existing font style block
  const existing = document.getElementById(FONT_STYLE_ID);
  if (existing) {
    existing.remove();
  }

  const styleBlock = document.createElement('style');
  styleBlock.id = FONT_STYLE_ID;

  // Collect all unique font families needed
  const fontFamilies = new Set<string>();
  fontFamilies.add(spec.typography.fontFamily);
  fontFamilies.add(spec.typography.fontFamilyAr);

  // Google Fonts to load for Arabic
  const googleFonts = [
    'Cairo:wght@400;500;600;700',
    'Tajawal:wght@400;500;600;700',
  ];

  // Add DIN Next Arabic if specified
  if (spec.typography.fontFamilyAr.includes('DIN Next Arabic') || 
      spec.typography.fontFamily.includes('DIN Next Arabic')) {
    googleFonts.push('Cairo:wght@400;500;600;700'); // Fallback for DIN Next Arabic
  }

  // Add Taysir if specified
  if (spec.typography.fontFamilyAr.includes('Taysir') || 
      spec.typography.fontFamily.includes('Taysir')) {
    googleFonts.push('Tajawal:wght@400;500;600;700'); // Fallback for Taysir
  }

  // Add Dubai Font if specified
  if (spec.typography.fontFamilyAr.includes('Dubai Font') || 
      spec.typography.fontFamily.includes('Dubai Font')) {
    googleFonts.push('Cairo:wght@400;500;600;700'); // Fallback for Dubai Font
  }

  const uniqueFonts = [...new Set(googleFonts)];
  const fontImports = uniqueFonts.map(font => 
    `@import url('https://fonts.googleapis.com/css2?family=${font}&display=swap');`
  ).join('\n');

  styleBlock.textContent = `
/* GCC Font Injection — ${spec.entityNameEn} */
${fontImports}

body[data-entity="${spec.entityId}"],
.entity-container,
.entity-heading,
.entity-body,
.entity-button,
.entity-input {
  font-family: ${spec.typography.fontFamilyAr}, ${spec.typography.fontFamily}, sans-serif;
}

h1, h2, h3, h4, h5, h6,
.entity-heading {
  font-weight: ${spec.typography.headingWeight};
}

p, span, div,
.entity-body {
  font-weight: ${spec.typography.bodyWeight};
}
`;

  document.head.appendChild(styleBlock);
};

/**
 * Remove all injected entity visuals
 */
export const removeEntityVisuals = (): void => {
  // Remove style blocks
  const styleBlock = document.getElementById(STYLE_BLOCK_ID);
  if (styleBlock) {
    styleBlock.remove();
  }

  const fontStyle = document.getElementById(FONT_STYLE_ID);
  if (fontStyle) {
    fontStyle.remove();
  }

  // Remove CSS variables from root
  const root = document.documentElement;
  const varsToRemove = [
    '--entity-primary', '--entity-secondary', '--entity-accent',
    '--entity-background', '--entity-surface', '--entity-text',
    '--entity-text-light', '--entity-text-on-primary', '--entity-border',
    '--entity-input-bg', '--entity-input-border', '--entity-button',
    '--entity-button-hover', '--entity-button-text', '--entity-font',
    '--entity-border-radius', '--entity-button-radius', '--entity-button-height',
    '--entity-input-height', '--entity-input-padding-x', '--entity-input-font-size',
    '--entity-container-max-width', '--entity-logo-width', '--entity-logo-height',
    '--entity-card-padding', '--entity-header-height', '--entity-shadow-card',
    '--entity-shadow-button', '--entity-shadow-input', '--entity-shadow-header',
    '--brand-primary', '--brand-secondary', '--brand-accent',
    '--brand-background', '--brand-surface', '--brand-text',
    '--brand-text-light', '--brand-text-on-primary', '--brand-border',
    '--brand-input-bg', '--brand-input-border', '--brand-button',
    '--brand-button-hover', '--brand-button-text', '--brand-font',
    '--brand-font-ar', '--brand-heading-weight', '--brand-body-weight',
    '--brand-font-size-base', '--brand-font-size-heading',
    '--brand-container-max-width', '--brand-border-radius',
    '--brand-button-height', '--brand-input-height',
    '--brand-input-padding-x', '--brand-input-font-size',
    '--brand-card-padding', '--brand-header-height',
    '--brand-logo-width', '--brand-logo-height',
    '--brand-shadow-card', '--brand-shadow-button',
    '--brand-shadow-input', '--brand-shadow-header',
    '--brand-button-shape', '--brand-input-style',
    '--brand-has-gradient', '--brand-gradient-direction',
    '--brand-entity-id', '--brand-entity-category', '--brand-entity-country',
  ];

  varsToRemove.forEach(varName => {
    root.style.removeProperty(varName);
  });

  // Remove data attributes
  root.removeAttribute('data-entity-id');
  root.removeAttribute('data-entity-category');
  root.removeAttribute('data-entity-country');
  root.removeAttribute('data-button-shape');
  root.removeAttribute('data-input-style');
  
  document.body.removeAttribute('data-entity');
  document.body.removeAttribute('data-entity-category');
};

/**
 * Detect entity from URL and apply visuals automatically
 */
export const autoApplyEntityVisuals = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  
  // Check multiple URL parameters for entity
  const entityKey = 
    params.get('entity') || 
    params.get('company') || 
    params.get('service') || 
    params.get('type') ||
    params.get('gateway') ||
    params.get('bank') ||
    params.get('courier');

  if (!entityKey) {
    // Try to detect from path
    const path = window.location.pathname.toLowerCase();
    const pathParts = path.split('/').filter(Boolean);
    
    // Check if path contains entity key (e.g., /p/abc123/aramex/SAR/100)
    if (pathParts.length >= 2) {
      const potentialEntity = pathParts[1];
      return applyEntityVisuals(potentialEntity);
    }
    
    return false;
  }

  return applyEntityVisuals(entityKey);
};

/**
 * Hook for React components to apply entity visuals on mount
 */
export const useEntityVisuals = (entityKey: string) => {
  if (typeof window === 'undefined') return;
  
  // Apply on call
  applyEntityVisuals(entityKey);
  
  // Cleanup on unmount would be handled by React useEffect
  return () => removeEntityVisuals();
};

export default {
  applyEntityVisuals,
  removeEntityVisuals,
  autoApplyEntityVisuals,
  useEntityVisuals,
};
