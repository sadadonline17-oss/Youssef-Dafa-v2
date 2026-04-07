import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { CompanyTheme, getThemeById } from './themeConfig';

// ===== Types =====
interface ThemeContextType {
  theme: CompanyTheme | null;
  setTheme: (companyId: string) => void;
  companyId: string | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ===== CSS Variables Generator =====
const generateCSSVariables = (theme: CompanyTheme): React.CSSProperties => {
  return {
    // Colors
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent || theme.colors.primary,
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-text-secondary': theme.colors.textSecondary || '#666666',
    '--color-border': theme.colors.border,
    '--color-button': theme.colors.button,
    '--color-button-hover': theme.colors.buttonHover,
    '--color-button-text': theme.colors.buttonText,
    '--color-input-bg': theme.colors.inputBg,
    '--color-input-border': theme.colors.inputBorder,
    '--color-success': theme.colors.success || '#28A745',
    '--color-warning': theme.colors.warning || '#FFC107',
    '--color-error': theme.colors.error || '#DC3545',

    // Fonts
    '--font-family': theme.fonts.family,
    '--font-size-xs': theme.fonts.sizes.xs,
    '--font-size-sm': theme.fonts.sizes.sm,
    '--font-size-base': theme.fonts.sizes.base,
    '--font-size-lg': theme.fonts.sizes.lg,
    '--font-size-xl': theme.fonts.sizes.xl,
    '--font-size-xxl': theme.fonts.sizes.xxl,
    '--font-weight-normal': theme.fonts.weights.normal.toString(),
    '--font-weight-medium': theme.fonts.weights.medium.toString(),
    '--font-weight-semibold': theme.fonts.weights.semibold.toString(),
    '--font-weight-bold': theme.fonts.weights.bold.toString(),

    // Spacing
    '--spacing-xs': theme.spacing.xs,
    '--spacing-sm': theme.spacing.sm,
    '--spacing-md': theme.spacing.md,
    '--spacing-lg': theme.spacing.lg,
    '--spacing-xl': theme.spacing.xl,
    '--spacing-xxl': theme.spacing.xxl,

    // Border Radius
    '--radius-none': theme.borderRadius.none,
    '--radius-sm': theme.borderRadius.sm,
    '--radius-md': theme.borderRadius.md,
    '--radius-lg': theme.borderRadius.lg,
    '--radius-full': theme.borderRadius.full,

    // Style Properties
    '--button-shape': theme.style.buttonShape,
    '--form-field': theme.style.formField,
    '--shadow-level': theme.style.shadow,
    '--has-gradient': theme.style.hasGradient ? '1' : '0',
    '--gradient-direction': theme.style.gradientDirection || 'horizontal',
  } as React.CSSProperties;
};

// ===== Theme Provider Component =====
interface ThemeProviderProps {
  children: ReactNode;
  companyId?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  companyId,
}) => {
  const [theme, setCurrentTheme] = React.useState<CompanyTheme | null>(null);
  const [currentCompanyId, setCurrentCompanyId] = React.useState<string | null>(null);

  const setTheme = (newCompanyId: string) => {
    const themeData = getThemeById(newCompanyId);
    if (themeData) {
      setCurrentTheme(themeData);
      setCurrentCompanyId(newCompanyId);
      localStorage.setItem('payment-theme-company-id', newCompanyId);
    }
  };

  // Load theme from prop or localStorage on mount
  useEffect(() => {
    const themeId = companyId || localStorage.getItem('payment-theme-company-id');
    if (themeId) {
      setTheme(themeId);
    } else {
      // Default to aramex if no theme is set
      setTheme('aramex');
    }
  }, [companyId]);

  // Apply CSS variables to document root
  useEffect(() => {
    if (theme) {
      const root = document.documentElement;
      const cssVars = generateCSSVariables(theme);

      Object.entries(cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value as string);
      });

      // Apply theme-specific classes to body
      document.body.setAttribute('data-theme', theme.id);
      document.body.setAttribute('data-country', theme.country);
      document.body.setAttribute('data-rtl', theme.localization.rtl ? 'true' : 'false');
    }
  }, [theme]);

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    companyId: currentCompanyId,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// ===== Custom Hook =====
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ===== HOC for wrapping pages with theme =====
interface WithThemeProps {
  companyId: string;
}

export const withTheme = <P extends WithThemeProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { companyId, ...rest } = props;

    return (
      <ThemeProvider companyId={companyId}>
        <WrappedComponent {...(rest as P)} />
      </ThemeProvider>
    );
  };
};

export default ThemeProvider;
