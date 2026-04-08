/**
 * GCCChameleonInjector — Visual-Only DOM Wrapper
 * 
 * Wraps the entire app with GCC Chameleon theme injection.
 * STRICT NON-INVASIVE: Only CSS/DOM injection. Zero logic modification.
 * 
 * This component:
 * 1. Detects the GCC entity from URL params or link data
 * 2. Injects CSS custom properties + entity body class
 * 3. Hides global payment icons (Apple/Google Pay)
 * 4. Applies 1:1 pixel-perfect visual mirroring
 * 
 * FORBIDDEN ZONES: /api/*, /backend/*, /logic/*, validation.js, routing_logic.js
 * ALLOWED ACTIONS: Dynamic CSS Variable Overrides, DOM Template Wrapping, Visual Asset Swapping
 */

import { useEffect, useRef } from 'react';
import { useGCCChameleon } from '@/hooks/useGCCChameleon';
import { useLinkData } from '@/hooks/useLinkData';
import { useParams } from 'react-router-dom';

interface GCCChameleonInjectorProps {
  children: React.ReactNode;
  /** Force a specific entity key, overriding URL detection */
  forceEntity?: string;
  /** Disable chameleon for this render */
  disabled?: boolean;
}

const GCCChameleonInjector = ({ children, forceEntity, disabled = false }: GCCChameleonInjectorProps) => {
  const { id } = useParams();
  const { data: linkData } = useLinkData(id || undefined);
  const { theme, isApplied, applyTheme, removeTheme } = useGCCChameleon(linkData);
  const initializedRef = useRef(false);

  // Force entity override
  useEffect(() => {
    if (forceEntity && !disabled) {
      applyTheme(forceEntity);
    }
  }, [forceEntity, disabled, applyTheme]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!initializedRef.current) return;
      // Don't remove on unmount — keep for SPA navigation
    };
  }, []);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div
      id="gcc-chameleon-root"
      data-entity={theme?.entityKey || 'default'}
      data-country={theme?.country || 'XX'}
      data-category={theme?.category || 'default'}
      data-theme-applied={isApplied ? 'true' : 'false'}
      className={theme?.bodyClass || ''}
      dir="rtl"
      lang="ar"
      style={{
        minHeight: '100vh',
        fontFamily: theme?.typography.arabic || 'inherit',
        backgroundColor: theme?.colors.background || 'inherit',
        color: theme?.colors.text || 'inherit',
      }}
    >
      {children}
    </div>
  );
};

export default GCCChameleonInjector;
