/**
 * useGCCChameleon Hook
 * 
 * Detects GCC entity from URL and applies visual theme via CSS variables + body class.
 * STRICT NON-INVASIVE: Only DOM/CSS injection. Zero logic modification.
 * 
 * Usage:
 *   const { theme, isApplied, entityKey } = useGCCChameleon();
 * 
 * Detection sources (priority order):
 *   1. URL params: ?entity=sadad, ?type=nafath, ?company=knet, ?service=benefit
 *   2. Path segments: /gov/sa/, /pay/knet/, /bank/alrajhi/
 *   3. Link data payload: linkData?.payload?.payment_system
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ChameleonTheme,
  resolveChameleonTheme,
  themeToCSSVariables,
  gccChameleonThemes,
} from '@/lib/gccChameleonThemes';

interface UseGCCChameleonReturn {
  theme: ChameleonTheme | null;
  isApplied: boolean;
  entityKey: string | null;
  country: string | null;
  category: string | null;
  applyTheme: (themeKey: string) => void;
  removeTheme: () => void;
}

const CSS_STYLE_ID = 'gcc-chameleon-styles';
const BODY_CLASS_PREFIX = 'gcc-entity-';

/**
 * Inject CSS variables into a <style> tag in <head>
 */
const injectCSS = (theme: ChameleonTheme): void => {
  // Remove existing style tag if present
  const existing = document.getElementById(CSS_STYLE_ID);
  if (existing) existing.remove();

  const style = document.createElement('style');
  style.id = CSS_STYLE_ID;
  style.setAttribute('data-chameleon', 'true');
  style.textContent = `
    :root {
      ${themeToCSSVariables(theme)}
    }

    /* Entity body class */
    body.${theme.bodyClass} {
      background-color: ${theme.colors.background} !important;
      font-family: ${theme.typography.arabic} !important;
      color: ${theme.colors.text} !important;
    }

    /* ── Global Payment Icon Purge ── */
    /* Hide Apple Pay, Google Pay, and other global payment visuals */
    ${theme.hideGlobalIcons.map(icon => `
      [class*="${icon}"],
      [id*="${icon}"],
      [data-testid*="${icon}"],
      img[alt*="${icon}" i],
      svg[aria-label*="${icon}" i] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `).join('\n')}

    /* ── Button Styling ── */
    body.${theme.bodyClass} button,
    body.${theme.bodyClass} [role="button"],
    body.${theme.bodyClass} input[type="submit"],
    body.${theme.bodyClass} input[type="button"] {
      font-family: ${theme.typography.arabic} !important;
      border-radius: ${theme.borderRadius.button} !important;
      height: ${theme.spacing.buttonHeight} !important;
      box-shadow: ${theme.shadows.button} !important;
      transition: all 0.2s ease !important;
    }

    body.${theme.bodyClass} button:hover,
    body.${theme.bodyClass} [role="button"]:hover {
      box-shadow: ${theme.shadows.buttonHover} !important;
      transform: translateY(-1px) !important;
    }

    body.${theme.bodyClass} button:active,
    body.${theme.bodyClass} [role="button"]:active {
      transform: translateY(0) !important;
    }

    /* Primary buttons get entity primary color */
    body.${theme.bodyClass} button[class*="primary"],
    body.${theme.bodyClass} button[class*="default"],
    body.${theme.bodyClass} button[class*="submit"],
    body.${theme.bodyClass} [data-variant="primary"] {
      background: ${theme.colors.primary} !important;
      color: ${theme.colors.textOnPrimary} !important;
      font-weight: ${theme.typography.weights.semibold} !important;
    }

    /* ── Input/Field Styling ── */
    body.${theme.bodyClass} input,
    body.${theme.bodyClass} textarea,
    body.${theme.bodyClass} select {
      font-family: ${theme.typography.arabic} !important;
      border-radius: ${theme.borderRadius.input} !important;
      padding: ${theme.spacing.fieldPadding} !important;
      border-color: ${theme.colors.inputBorder} !important;
      box-shadow: ${theme.shadows.input} !important;
    }

    body.${theme.bodyClass} input:focus,
    body.${theme.bodyClass} textarea:focus,
    body.${theme.bodyClass} select:focus {
      border-color: ${theme.colors.primary} !important;
      box-shadow: 0 0 0 3px ${theme.colors.inputFocusRing} !important;
      outline: none !important;
    }

    /* ── Card Styling ── */
    body.${theme.bodyClass} [class*="card"],
    body.${theme.bodyClass} [data-variant="elevated"],
    body.${theme.bodyClass} [role="region"] {
      border-radius: ${theme.borderRadius.card} !important;
      box-shadow: ${theme.shadows.card} !important;
      background: ${theme.colors.surface} !important;
      border-color: ${theme.colors.border} !important;
    }

    /* ── Header/TopBar Styling ── */
    body.${theme.bodyClass} header,
    body.${theme.bodyClass} [class*="header"],
    body.${theme.bodyClass} [class*="topbar"],
    body.${theme.bodyClass} [class*="top-bar"] {
      box-shadow: ${theme.shadows.header} !important;
      background: ${theme.colors.surface} !important;
      border-bottom-color: ${theme.colors.border} !important;
    }

    /* ── Typography ── */
    body.${theme.bodyClass} h1,
    body.${theme.bodyClass} h2,
    body.${theme.bodyClass} h3,
    body.${theme.bodyClass} h4,
    body.${theme.bodyClass} h5,
    body.${theme.bodyClass} h6 {
      font-family: ${theme.typography.primary} !important;
      color: ${theme.colors.text} !important;
    }

    body.${theme.bodyClass} p,
    body.${theme.bodyClass} span,
    body.${theme.bodyClass} label,
    body.${theme.bodyClass} a {
      font-family: ${theme.typography.secondary} !important;
      color: ${theme.colors.text} !important;
    }

    body.${theme.bodyClass} a {
      color: ${theme.colors.primary} !important;
    }

    /* ── Logo Container ── */
    body.${theme.bodyClass} [class*="logo"],
    body.${theme.bodyClass} [class*="brand-logo"],
    body.${theme.bodyClass} [class*="entity-logo"] {
      filter: none !important;
    }

    /* ── Link/Anchor Colors ── */
    body.${theme.bodyClass} a:hover {
      color: ${theme.colors.secondary} !important;
    }

    /* ── Divider Colors ── */
    body.${theme.bodyClass} hr,
    body.${theme.bodyClass} [class*="divider"],
    body.${theme.bodyClass} [class*="separator"] {
      border-color: ${theme.colors.border} !important;
    }

    /* ── Badge/Tag Colors ── */
    body.${theme.bodyClass} [class*="badge"],
    body.${theme.bodyClass} [class*="tag"],
    body.${theme.bodyClass} [class*="chip"] {
      background: ${theme.colors.primary}15 !important;
      color: ${theme.colors.primary} !important;
      border-color: ${theme.colors.border} !important;
    }

    /* ── Modal/Dialog ── */
    body.${theme.bodyClass} [role="dialog"],
    body.${theme.bodyClass} [class*="modal"],
    body.${theme.bodyClass} [class*="dialog"] {
      box-shadow: ${theme.shadows.modal} !important;
      border-radius: ${theme.borderRadius.lg} !important;
    }

    /* ── Loading Spinner ── */
    body.${theme.bodyClass} [class*="spinner"],
    body.${theme.bodyClass} [class*="loader"] {
      color: ${theme.colors.primary} !important;
    }

    /* ── Success/Error States ── */
    body.${theme.bodyClass} [class*="success"] {
      color: ${theme.colors.success} !important;
    }

    body.${theme.bodyClass} [class*="error"],
    body.${theme.bodyClass} [class*="danger"] {
      color: ${theme.colors.error} !important;
    }

    body.${theme.bodyClass} [class*="warning"] {
      color: ${theme.colors.warning} !important;
    }
  `;

  document.head.appendChild(style);
};

/**
 * Remove injected CSS and body classes
 */
const removeInjectedCSS = (): void => {
  const existing = document.getElementById(CSS_STYLE_ID);
  if (existing) existing.remove();

  // Remove all chameleon body classes
  document.body.className = document.body.className
    .split(' ')
    .filter(c => !c.startsWith(BODY_CLASS_PREFIX))
    .join(' ');

  document.documentElement.removeAttribute('data-gcc-entity');
  document.documentElement.removeAttribute('data-gcc-country');
  document.documentElement.removeAttribute('data-gcc-category');
};

export const useGCCChameleon = (linkData?: any): UseGCCChameleonReturn => {
  const [theme, setTheme] = useState<ChameleonTheme | null>(null);
  const [isApplied, setIsApplied] = useState(false);
  const appliedRef = useRef<string | null>(null);

  const applyTheme = useCallback((themeKey: string) => {
    const resolvedTheme = gccChameleonThemes[themeKey];
    if (!resolvedTheme) return;

    // Prevent re-applying same theme
    if (appliedRef.current === resolvedTheme.id) return;
    appliedRef.current = resolvedTheme.id;

    // Remove previous
    removeInjectedCSS();

    // Inject new
    injectCSS(resolvedTheme);

    // Apply body class
    document.body.classList.add(resolvedTheme.bodyClass);

    // Set data attributes on root
    document.documentElement.setAttribute('data-gcc-entity', resolvedTheme.entityKey);
    document.documentElement.setAttribute('data-gcc-country', resolvedTheme.country);
    document.documentElement.setAttribute('data-gcc-category', resolvedTheme.category);

    setTheme(resolvedTheme);
    setIsApplied(true);
  }, []);

  const removeTheme = useCallback(() => {
    removeInjectedCSS();
    setTheme(null);
    setIsApplied(false);
    appliedRef.current = null;
  }, []);

  useEffect(() => {
    // Priority 1: URL params
    const urlTheme = resolveChameleonTheme();
    if (urlTheme) {
      applyTheme(urlTheme.id);
      return;
    }

    // Priority 2: Link data payload
    if (linkData?.payload?.payment_system) {
      const psKey = linkData.payload.payment_system.toLowerCase();
      if (gccChameleonThemes[psKey]) {
        applyTheme(gccChameleonThemes[psKey].id);
        return;
      }
    }

    // Priority 3: Link data service_key
    if (linkData?.payload?.service_key) {
      const skKey = linkData.payload.service_key.toLowerCase();
      for (const [key, t] of Object.entries(gccChameleonThemes)) {
        if (skKey.includes(key) || key.includes(skKey)) {
          applyTheme(t.id);
          return;
        }
      }
    }

    // No theme detected — keep default
    removeTheme();
  }, [linkData, applyTheme, removeTheme]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Keep theme applied — don't remove on unmount for SPA navigation
    };
  }, []);

  return {
    theme,
    isApplied,
    entityKey: theme?.entityKey || null,
    country: theme?.country || null,
    category: theme?.category || null,
    applyTheme,
    removeTheme,
  };
};

export default useGCCChameleon;
