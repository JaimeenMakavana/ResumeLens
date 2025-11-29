/**
 * Soft Minimal Neutrals Design Tokens
 * 
 * Centralized design system tokens for the Soft Minimalism design language.
 * These tokens define colors, spacing, typography, shadows, and transitions
 * that create a calm, sophisticated, and accessible interface.
 */

// ============================================================================
// COLOR TOKENS: Soft Minimal Neutrals
// ============================================================================

export const colors = {
  // Base Neutrals (Warm Grays with Stone/Taupe undertones)
  neutral: {
    50: '#fafaf9',   // Warm off-white
    100: '#f5f5f4',  // Very light warm gray
    200: '#e7e5e4',  // Light warm gray
    300: '#d6d3d1',  // Medium-light warm gray
    400: '#a8a29e',  // Medium warm gray
    500: '#78716c',  // Base warm gray
    600: '#57534e',  // Dark warm gray
    700: '#44403c',  // Darker warm gray
    800: '#292524',  // Very dark warm gray
    900: '#1c1917',  // Near black (warm)
  },

  // Muted Accents (Desaturated, Low Saturation)
  accent: {
    blue: {
      50: '#f0f4f8',   // Very light muted blue
      100: '#dbe4ed',  // Light muted blue
      200: '#b8c9d9',  // Medium-light muted blue
      500: '#6b8ca8',  // Base muted blue (replaces blue-600)
      600: '#5a7a94',  // Darker muted blue
      700: '#4a6679',  // Dark muted blue
    },
    green: {
      50: '#f4f6f3',   // Very light muted green
      500: '#8b9a7f',  // Base muted green (success states)
      600: '#7a8770',  // Darker muted green
    },
    amber: {
      50: '#faf8f4',   // Very light muted amber
      500: '#c4a882',  // Base muted amber (warnings)
      600: '#b0976f',  // Darker muted amber
    },
  },

  // Semantic Colors (Soft, Purpose-Driven)
  semantic: {
    text: {
      primary: '#292524',      // neutral-800
      secondary: '#57534e',    // neutral-600
      tertiary: '#78716c',     // neutral-500
      disabled: '#a8a29e',     // neutral-400
    },
    background: {
      base: '#fafaf9',         // neutral-50
      elevated: '#ffffff',     // Pure white for cards
      overlay: 'rgba(28, 25, 23, 0.4)', // neutral-900 with opacity
    },
    border: {
      subtle: 'rgba(120, 113, 108, 0.12)', // neutral-500, 12% opacity
      default: 'rgba(120, 113, 108, 0.2)',  // neutral-500, 20% opacity
      emphasis: 'rgba(120, 113, 108, 0.3)', // neutral-500, 30% opacity
    },
  },
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Fira Mono", "Droid Sans Mono", "Courier New", monospace',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,    // Use sparingly
  },
  lineHeight: {
    tight: 1.4,
    normal: 1.6,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',
  },
} as const;

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  // Base unit: 4px
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
  '2xl': '4rem',  // 64px
} as const;

// ============================================================================
// SHADOW TOKENS (Soft, Diffused)
// ============================================================================

export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(28, 25, 23, 0.04)',      // Subtle
  sm: '0 1px 3px 0 rgba(28, 25, 23, 0.06)',       // Card elevation
  md: '0 4px 6px -1px rgba(28, 25, 23, 0.08)',   // Hover states
  lg: '0 10px 15px -3px rgba(28, 25, 23, 0.1)',  // Modals
  // All shadows use neutral-900 with low opacity for softness
} as const;

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================

export const radius = {
  none: '0',
  sm: '0.375rem',   // 6px - subtle rounding
  md: '0.5rem',     // 8px - default
  lg: '0.75rem',    // 12px - cards
  xl: '1rem',       // 16px - large containers
  '2xl': '1.5rem',  // 24px - extra large
  full: '9999px',   // Pills, avatars
} as const;

// ============================================================================
// TRANSITION TOKENS (Gentle, Calm)
// ============================================================================

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  slower: '400ms ease-in-out',
} as const;

// ============================================================================
// COMPONENT-SPECIFIC STYLE CONSTANTS
// ============================================================================

export const componentStyles = {
  // Chat Container
  chatContainer: {
    background: colors.semantic.background.base,
    border: `1px solid ${colors.semantic.border.subtle}`,
    borderRadius: radius['2xl'],
    padding: spacing.md,
    shadow: shadows.sm,
  },

  // Chat Message - User
  messageUser: {
    background: colors.accent.blue[500],
    text: 'white',
    borderRadius: `${radius['2xl']} ${radius['2xl']} ${radius.sm} ${radius['2xl']}`,
    padding: `${spacing.sm} ${spacing.md}`,
    shadow: shadows.sm,
  },

  // Chat Message - AI
  messageAI: {
    background: colors.semantic.background.elevated,
    text: colors.semantic.text.primary,
    border: `1px solid ${colors.semantic.border.subtle}`,
    borderRadius: `${radius['2xl']} ${radius['2xl']} ${radius['2xl']} ${radius.sm}`,
    padding: `${spacing.sm} ${spacing.md}`,
    shadow: shadows.xs,
  },

  // Chat Input
  chatInput: {
    background: colors.semantic.background.elevated,
    border: `1px solid ${colors.semantic.border.subtle}`,
    borderRadius: radius.xl,
    padding: `${spacing.sm} ${spacing.md}`,
    focusBorder: colors.semantic.border.default,
    focusShadow: shadows.sm,
  },

  // Button - Primary
  buttonPrimary: {
    background: colors.accent.blue[500],
    text: 'white',
    borderRadius: radius.lg,
    padding: `${spacing.xs} ${spacing.md}`,
    hoverBackground: colors.accent.blue[600],
    shadow: shadows.sm,
    transition: transitions.base,
  },

  // Button - Secondary
  buttonSecondary: {
    background: colors.neutral[100],
    text: colors.semantic.text.primary,
    borderRadius: radius.lg,
    padding: `${spacing.xs} ${spacing.md}`,
    hoverBackground: colors.neutral[200],
    shadow: shadows.xs,
    transition: transitions.base,
  },

  // Card
  card: {
    background: colors.semantic.background.elevated,
    border: `1px solid ${colors.semantic.border.subtle}`,
    borderRadius: radius['2xl'],
    padding: spacing.md,
    shadow: shadows.sm,
  },

  // Empty State
  emptyState: {
    background: 'transparent',
    text: colors.semantic.text.secondary,
    suggestionCard: {
      background: colors.neutral[100],
      border: `1px solid ${colors.semantic.border.subtle}`,
      borderRadius: radius.lg,
      padding: spacing.sm,
      hoverShadow: shadows.sm,
    },
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get Tailwind class name for a color token
 * Note: These will need to be added to Tailwind config or used as CSS variables
 */
export function getColorClass(colorPath: string): string {
  // This is a helper for future use when we add these to Tailwind config
  return colorPath;
}

/**
 * Get transition class for a component
 */
export function getTransitionClass(speed: keyof typeof transitions = 'base'): string {
  return `transition-all duration-${speed === 'fast' ? 150 : speed === 'slow' ? 300 : speed === 'slower' ? 400 : 200} ease-in-out`;
}



