// GCC Sovereign Design System - V13
// Exact Mobile UI Specifications for Government & Banking Apps

export interface SovereignDesignSpecs {
  // Official mobile app dimensions (in px)
  mobileGrid: {
    containerMaxWidth: number;  // Max width for mobile content
    safeAreaTop: number;        // Safe area top padding
    safeAreaBottom: number;     // Safe area bottom padding
    horizontalPadding: number;  // Standard horizontal padding
  };
  
  // Input field specifications (exact match to official apps)
  inputFields: {
    height: number;             // Exact height in pixels
    paddingHorizontal: number;  // Horizontal padding
    fontSize: number;           // Font size
    lineHeight: number;         // Line height
    borderRadius: number;       // Border radius
    borderWidth: number;        // Border width
    focusRingWidth: number;     // Focus indicator width
    iconSize: number;           // Input icon size
    clearButtonSize: number;    // Clear/X button size
  };
  
  // Button specifications
  buttons: {
    height: number;
    paddingHorizontal: number;
    fontSize: number;
    fontWeight: number;
    borderRadius: number;
    minWidth: number;           // Minimum touch target
    iconSpacing: number;        // Spacing between icon and text
  };
  
  // Typography scale (official weights)
  typography: {
    h1: { fontSize: number; lineHeight: number; weight: number };
    h2: { fontSize: number; lineHeight: number; weight: number };
    h3: { fontSize: number; lineHeight: number; weight: number };
    body: { fontSize: number; lineHeight: number; weight: number };
    small: { fontSize: number; lineHeight: number; weight: number };
    caption: { fontSize: number; lineHeight: number; weight: number };
  };
  
  // Spacing system (4px baseline)
  spacing: {
    xs: number;   // 4px
    sm: number;   // 8px
    md: number;   // 16px
    lg: number;   // 24px
    xl: number;   // 32px
    xxl: number;  // 48px
  };
  
  // Shadows and elevation
  elevation: {
    flat: string;      // No shadow
    low: string;       // Subtle shadow
    medium: string;    // Medium shadow
    high: string;      // Strong shadow
    modal: string;     // Modal/dialog shadow
  };
  
  // Transitions
  transitions: {
    fast: number;      // 150ms - micro-interactions
    normal: number;    // 250ms - standard
    slow: number;      // 350ms - page transitions
    easing: string;    // Official easing function
  };
}

// Saudi Arabian Government Design Specs (Nafath, Absher, Tawakkalna)
export const SAUDI_GOV_SPECS: SovereignDesignSpecs = {
  mobileGrid: {
    containerMaxWidth: 414,  // iPhone Max width
    safeAreaTop: 44,
    safeAreaBottom: 34,
    horizontalPadding: 16,
  },
  
  inputFields: {
    height: 56,               // Official Saudi gov input height
    paddingHorizontal: 16,
    fontSize: 17,             // iOS standard readability
    lineHeight: 24,
    borderRadius: 8,
    borderWidth: 1,
    focusRingWidth: 2,
    iconSize: 24,
    clearButtonSize: 20,
  },
  
  buttons: {
    height: 52,
    paddingHorizontal: 24,
    fontSize: 17,
    fontWeight: 600,
    borderRadius: 8,
    minWidth: 88,             // Minimum touch target (44px * 2)
    iconSpacing: 12,
  },
  
  typography: {
    h1: { fontSize: 28, lineHeight: 36, weight: 700 },
    h2: { fontSize: 24, lineHeight: 32, weight: 600 },
    h3: { fontSize: 20, lineHeight: 28, weight: 600 },
    body: { fontSize: 17, lineHeight: 24, weight: 400 },
    small: { fontSize: 15, lineHeight: 20, weight: 400 },
    caption: { fontSize: 13, lineHeight: 18, weight: 400 },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  elevation: {
    flat: 'none',
    low: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
    medium: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
    high: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.1)',
    modal: '0 25px 50px rgba(0,0,0,0.25)',
  },
  
  transitions: {
    fast: 150,
    normal: 250,
    slow: 350,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design standard
  },
};

// UAE Government Design Specs (UAE Pass, Dubai Now)
export const UAE_GOV_SPECS: SovereignDesignSpecs = {
  mobileGrid: {
    containerMaxWidth: 428,  // iPhone 14 Pro Max width
    safeAreaTop: 47,
    safeAreaBottom: 34,
    horizontalPadding: 20,
  },
  
  inputFields: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 4,          // Sharper corners (Dubai style)
    borderWidth: 1,
    focusRingWidth: 2,
    iconSize: 20,
    clearButtonSize: 18,
  },
  
  buttons: {
    height: 48,
    paddingHorizontal: 28,
    fontSize: 16,
    fontWeight: 500,
    borderRadius: 4,
    minWidth: 88,
    iconSpacing: 10,
  },
  
  typography: {
    h1: { fontSize: 32, lineHeight: 40, weight: 700 },
    h2: { fontSize: 28, lineHeight: 36, weight: 600 },
    h3: { fontSize: 24, lineHeight: 32, weight: 600 },
    body: { fontSize: 16, lineHeight: 24, weight: 400 },
    small: { fontSize: 14, lineHeight: 20, weight: 400 },
    caption: { fontSize: 12, lineHeight: 16, weight: 400 },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  elevation: {
    flat: 'none',
    low: '0 2px 4px rgba(0,0,0,0.08)',
    medium: '0 4px 8px rgba(0,0,0,0.12)',
    high: '0 8px 16px rgba(0,0,0,0.16)',
    modal: '0 20px 40px rgba(0,0,0,0.3)',
  },
  
  transitions: {
    fast: 100,
    normal: 200,
    slow: 300,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // iOS easing
  },
};

// Qatar Government Specs (Metrash2)
export const QATAR_GOV_SPECS: SovereignDesignSpecs = {
  mobileGrid: {
    containerMaxWidth: 430,
    safeAreaTop: 47,
    safeAreaBottom: 34,
    horizontalPadding: 20,
  },
  
  inputFields: {
    height: 54,
    paddingHorizontal: 18,
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 6,
    borderWidth: 1,
    focusRingWidth: 2,
    iconSize: 22,
    clearButtonSize: 19,
  },
  
  buttons: {
    height: 50,
    paddingHorizontal: 26,
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 6,
    minWidth: 88,
    iconSpacing: 11,
  },
  
  typography: {
    h1: { fontSize: 30, lineHeight: 38, weight: 700 },
    h2: { fontSize: 26, lineHeight: 34, weight: 600 },
    h3: { fontSize: 22, lineHeight: 30, weight: 600 },
    body: { fontSize: 16, lineHeight: 24, weight: 400 },
    small: { fontSize: 14, lineHeight: 20, weight: 400 },
    caption: { fontSize: 12, lineHeight: 16, weight: 400 },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  elevation: {
    flat: 'none',
    low: '0 1px 2px rgba(0,0,0,0.06)',
    medium: '0 3px 6px rgba(0,0,0,0.1)',
    high: '0 6px 12px rgba(0,0,0,0.15)',
    modal: '0 15px 30px rgba(0,0,0,0.2)',
  },
  
  transitions: {
    fast: 120,
    normal: 220,
    slow: 320,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Kuwait Government Specs (Sahel)
export const KUWAIT_GOV_SPECS: SovereignDesignSpecs = {
  mobileGrid: {
    containerMaxWidth: 426,
    safeAreaTop: 47,
    safeAreaBottom: 34,
    horizontalPadding: 18,
  },
  
  inputFields: {
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 10,        // Rounded Kuwaiti style
    borderWidth: 1,
    focusRingWidth: 2,
    iconSize: 22,
    clearButtonSize: 19,
  },
  
  buttons: {
    height: 50,
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 10,
    minWidth: 88,
    iconSpacing: 11,
  },
  
  typography: {
    h1: { fontSize: 28, lineHeight: 36, weight: 700 },
    h2: { fontSize: 24, lineHeight: 32, weight: 600 },
    h3: { fontSize: 20, lineHeight: 28, weight: 600 },
    body: { fontSize: 16, lineHeight: 24, weight: 400 },
    small: { fontSize: 14, lineHeight: 20, weight: 400 },
    caption: { fontSize: 12, lineHeight: 16, weight: 400 },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  elevation: {
    flat: 'none',
    low: '0 2px 4px rgba(0,0,0,0.08)',
    medium: '0 4px 8px rgba(0,0,0,0.12)',
    high: '0 8px 16px rgba(0,0,0,0.16)',
    modal: '0 20px 40px rgba(0,0,0,0.25)',
  },
  
  transitions: {
    fast: 130,
    normal: 230,
    slow: 330,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Bahrain & Oman Specs (similar regional patterns)
export const REGIONAL_GOV_SPECS: SovereignDesignSpecs = {
  mobileGrid: {
    containerMaxWidth: 414,
    safeAreaTop: 44,
    safeAreaBottom: 34,
    horizontalPadding: 16,
  },
  
  inputFields: {
    height: 52,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 8,
    borderWidth: 1,
    focusRingWidth: 2,
    iconSize: 22,
    clearButtonSize: 19,
  },
  
  buttons: {
    height: 50,
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 8,
    minWidth: 88,
    iconSpacing: 11,
  },
  
  typography: {
    h1: { fontSize: 28, lineHeight: 36, weight: 700 },
    h2: { fontSize: 24, lineHeight: 32, weight: 600 },
    h3: { fontSize: 20, lineHeight: 28, weight: 600 },
    body: { fontSize: 16, lineHeight: 24, weight: 400 },
    small: { fontSize: 14, lineHeight: 20, weight: 400 },
    caption: { fontSize: 12, lineHeight: 16, weight: 400 },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  elevation: {
    flat: 'none',
    low: '0 1px 3px rgba(0,0,0,0.08)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    high: '0 8px 12px rgba(0,0,0,0.15)',
    modal: '0 20px 40px rgba(0,0,0,0.25)',
  },
  
  transitions: {
    fast: 150,
    normal: 250,
    slow: 350,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Get design specs by country code
export const getSovereignDesignSpecs = (countryCode: string): SovereignDesignSpecs => {
  switch (countryCode) {
    case 'SA':
      return SAUDI_GOV_SPECS;
    case 'AE':
      return UAE_GOV_SPECS;
    case 'QA':
      return QATAR_GOV_SPECS;
    case 'KW':
      return KUWAIT_GOV_SPECS;
    case 'BH':
    case 'OM':
      return REGIONAL_GOV_SPECS;
    default:
      return SAUDI_GOV_SPECS; // Default fallback
  }
};

// Get design specs by gateway ID
export const getGatewayDesignSpecs = (gatewayId: string): SovereignDesignSpecs => {
  const gateway = GOVERNMENT_GATEWAYS[gatewayId];
  if (!gateway) return SAUDI_GOV_SPECS;
  
  return getSovereignDesignSpecs(gateway.country);
};

// Convert design specs to CSS custom properties
export const designSpecsToCSS = (specs: SovereignDesignSpecs): Record<string, string> => {
  return {
    '--mobile-grid-max-width': `${specs.mobileGrid.containerMaxWidth}px`,
    '--safe-area-top': `${specs.mobileGrid.safeAreaTop}px`,
    '--safe-area-bottom': `${specs.mobileGrid.safeAreaBottom}px`,
    '--horizontal-padding': `${specs.mobileGrid.horizontalPadding}px`,
    
    '--input-height': `${specs.inputFields.height}px`,
    '--input-padding-horizontal': `${specs.inputFields.paddingHorizontal}px`,
    '--input-font-size': `${specs.inputFields.fontSize}px`,
    '--input-line-height': `${specs.inputFields.lineHeight}px`,
    '--input-border-radius': `${specs.inputFields.borderRadius}px`,
    '--input-border-width': `${specs.inputFields.borderWidth}px`,
    '--input-icon-size': `${specs.inputFields.iconSize}px`,
    
    '--button-height': `${specs.buttons.height}px`,
    '--button-padding-horizontal': `${specs.buttons.paddingHorizontal}px`,
    '--button-font-size': `${specs.buttons.fontSize}px`,
    '--button-font-weight': `${specs.buttons.fontWeight}`,
    '--button-border-radius': `${specs.buttons.borderRadius}px`,
    '--button-min-width': `${specs.buttons.minWidth}px`,
    
    '--spacing-xs': `${specs.spacing.xs}px`,
    '--spacing-sm': `${specs.spacing.sm}px`,
    '--spacing-md': `${specs.spacing.md}px`,
    '--spacing-lg': `${specs.spacing.lg}px`,
    '--spacing-xl': `${specs.spacing.xl}px`,
    '--spacing-xxl': `${specs.spacing.xxl}px`,
    
    '--elevation-flat': specs.elevation.flat,
    '--elevation-low': specs.elevation.low,
    '--elevation-medium': specs.elevation.medium,
    '--elevation-high': specs.elevation.high,
    '--elevation-modal': specs.elevation.modal,
    
    '--transition-fast': `${specs.transitions.fast}ms`,
    '--transition-normal': `${specs.transitions.normal}ms`,
    '--transition-slow': `${specs.transitions.slow}ms`,
    '--transition-easing': specs.transitions.easing,
  };
};

// Apply sovereign design specs to document root
export const applySovereignDesign = (countryCode: string): void => {
  const specs = getSovereignDesignSpecs(countryCode);
  const cssVars = designSpecsToCSS(specs);
  
  const root = document.documentElement;
  Object.entries(cssVars).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

// Remove sovereign design specs
export const removeSovereignDesign = (): void => {
  const root = document.documentElement;
  const cssVars = designSpecsToCSS(getSovereignDesignSpecs('SA')); // Get all properties
  
  Object.keys(cssVars).forEach((property) => {
    root.style.removeProperty(property);
  });
};