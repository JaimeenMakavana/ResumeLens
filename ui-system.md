# UI System Rules - ResumeLens

**Purpose**: This document defines the UI design system, component styling guidelines, and visual design principles for the ResumeLens application.

---

## Design Philosophy

### Core Principles

1. **Clean & Minimal**: Focus on clarity and usability, avoid visual clutter
2. **Privacy-First**: UI should communicate ephemeral nature and data privacy
3. **Learning-Friendly**: Clear visual feedback for RAG pipeline states
4. **Accessible**: WCAG 2.1 AA compliance for all interactive elements
5. **Responsive**: Mobile-first design that works on all screen sizes

---

## Color System

### Primary Palette

```typescript
// Tailwind color tokens (configure in tailwind.config.ts)
const colors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Primary brand color
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  secondary: {
    // Neutral grays for text and backgrounds
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  success: {
    500: "#10b981", // Green for success states
    600: "#059669",
  },
  warning: {
    500: "#f59e0b", // Amber for warnings
    600: "#d97706",
  },
  error: {
    500: "#ef4444", // Red for errors
    600: "#dc2626",
  },
  info: {
    500: "#3b82f6", // Blue for info messages
    600: "#2563eb",
  },
};
```

### Usage Guidelines

- **Primary colors**: Buttons, links, active states, brand elements
- **Secondary colors**: Text, borders, backgrounds, neutral elements
- **Semantic colors**: Use for status indicators (success, warning, error, info)
- **Contrast**: Ensure minimum 4.5:1 contrast ratio for text (WCAG AA)

---

## Typography

### Font Stack

```css
/* Use system fonts for performance */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

/* Monospace for code/snippets */
font-family: "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Fira Mono",
  "Droid Sans Mono", "Courier New", monospace;
```

### Type Scale

```typescript
// Tailwind typography classes
const typography = {
  // Headings
  h1: "text-4xl font-bold tracking-tight", // 36px
  h2: "text-3xl font-semibold tracking-tight", // 30px
  h3: "text-2xl font-semibold", // 24px
  h4: "text-xl font-semibold", // 20px
  h5: "text-lg font-medium", // 18px
  h6: "text-base font-medium", // 16px

  // Body text
  body: "text-base leading-relaxed", // 16px
  bodySmall: "text-sm leading-relaxed", // 14px
  bodyLarge: "text-lg leading-relaxed", // 18px

  // UI elements
  label: "text-sm font-medium text-gray-700",
  caption: "text-xs text-gray-500",
  code: "text-sm font-mono bg-gray-100 px-1.5 py-0.5 rounded",
};
```

### Typography Rules

- **Headings**: Use semantic HTML (`h1`-`h6`), maintain hierarchy
- **Body text**: 16px base size for readability, line-height 1.5-1.75
- **Labels**: 14px, medium weight, sufficient contrast
- **Code/Snippets**: Monospace font, background highlight, preserve formatting

---

## Spacing System

### Spacing Scale

Use Tailwind's default spacing scale (4px base unit):

```typescript
const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
};
```

### Spacing Guidelines

- **Component padding**: `p-4` (16px) for cards, `p-6` (24px) for containers
- **Component gaps**: `gap-4` (16px) for flex/grid layouts
- **Section spacing**: `mb-8` (32px) between major sections
- **Inline spacing**: `space-x-2` (8px) for button groups, `space-y-4` (16px) for vertical stacks

---

## Layout & Grid

### Container Widths

```typescript
const containers = {
  sm: "max-w-screen-sm", // 640px
  md: "max-w-screen-md", // 768px
  lg: "max-w-screen-lg", // 1024px
  xl: "max-w-screen-xl", // 1280px
  "2xl": "max-w-screen-2xl", // 1536px
  full: "w-full",
};
```

### Layout Patterns

- **Page containers**: `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`
- **Card layouts**: Use CSS Grid or Flexbox with responsive breakpoints
- **Chat interface**: Full-height container with flex column layout
- **Document upload**: Centered card, max-width 600px

---

## Component Styling Patterns

### Buttons

```typescript
// Base button styles
const buttonBase =
  "px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

// Button variants
const buttonVariants = {
  primary: `${buttonBase} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`,
  secondary: `${buttonBase} bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500`,
  outline: `${buttonBase} border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500`,
  danger: `${buttonBase} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`,
  ghost: `${buttonBase} text-gray-700 hover:bg-gray-100 focus:ring-gray-500`,
};

// Button sizes
const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
```

### Input Fields

```typescript
const inputBase =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

const inputVariants = {
  default: `${inputBase} bg-white`,
  error: `${inputBase} border-red-500 focus:ring-red-500`,
  disabled: `${inputBase} bg-gray-100 cursor-not-allowed opacity-60`,
};
```

### Cards

```typescript
const cardBase = "bg-white rounded-lg shadow-sm border border-gray-200 p-6";

const cardVariants = {
  default: cardBase,
  elevated: "bg-white rounded-lg shadow-md border border-gray-200 p-6",
  outlined: "bg-white rounded-lg border-2 border-gray-300 p-6",
  interactive: `${cardBase} hover:shadow-md transition-shadow cursor-pointer`,
};
```

### Loading States

```typescript
// Spinner component
const spinner =
  "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600";

// Skeleton loader
const skeleton = "animate-pulse bg-gray-200 rounded";
```

---

## UI States

### Loading States

- **Page loading**: Full-page spinner with message
- **Component loading**: Skeleton loaders or inline spinners
- **Button loading**: Disabled state with spinner icon
- **Chat loading**: Typing indicator animation

### Error States

- **Form errors**: Red border, error message below field
- **API errors**: Toast notification or inline error message
- **Empty states**: Friendly message with icon, optional action button

### Success States

- **Form submission**: Green checkmark, success message
- **File upload**: Progress indicator, success confirmation

### Empty States

- **No messages**: "Start a conversation" message with icon
- **No documents**: "Upload a document" prompt with upload button
- **No results**: "No results found" with search suggestions

---

## Animation & Transitions

### Transition Guidelines

```typescript
const transitions = {
  fast: "transition-all duration-150",
  base: "transition-all duration-200",
  slow: "transition-all duration-300",
  ease: "transition-all duration-200 ease-in-out",
};
```

### Animation Patterns

- **Hover effects**: Subtle scale, shadow, or color transitions
- **Page transitions**: Fade in/out (200-300ms)
- **Modal/Modal**: Slide + fade (300ms)
- **Toast notifications**: Slide in from top (300ms), auto-dismiss after 3-5s
- **Chat messages**: Fade in (200ms) when new message arrives

### Performance

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Use `will-change` sparingly, only for elements actively animating

---

## Responsive Design

### Breakpoints (Tailwind Default)

```typescript
const breakpoints = {
  sm: "640px", // Small devices (phones)
  md: "768px", // Medium devices (tablets)
  lg: "1024px", // Large devices (desktops)
  xl: "1280px", // Extra large devices
  "2xl": "1536px", // 2X large devices
};
```

### Mobile-First Approach

- Design for mobile first, enhance for larger screens
- Use responsive utilities: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on actual devices, not just browser dev tools

### Responsive Patterns

- **Navigation**: Hamburger menu on mobile, full nav on desktop
- **Chat interface**: Full-width on mobile, sidebar layout on desktop
- **Document upload**: Stack vertically on mobile, side-by-side on desktop
- **Typography**: Smaller text on mobile, larger on desktop

---

## Accessibility (a11y)

### WCAG 2.1 AA Compliance

1. **Color Contrast**

   - Text: Minimum 4.5:1 contrast ratio
   - Large text (18px+): Minimum 3:1 contrast ratio
   - Interactive elements: Minimum 3:1 contrast ratio

2. **Keyboard Navigation**

   - All interactive elements must be keyboard accessible
   - Visible focus indicators (ring-2, ring-offset-2)
   - Logical tab order

3. **Screen Readers**

   - Semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
   - ARIA labels where needed (`aria-label`, `aria-describedby`)
   - Alt text for images, icons with descriptive text

4. **Focus Management**
   - Focus trap in modals
   - Return focus to trigger after closing modal
   - Skip links for main content

### Accessibility Checklist

- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have descriptive text or aria-labels
- [ ] Color is not the only indicator (use icons, text)
- [ ] Focus indicators are visible
- [ ] Keyboard navigation works for all features
- [ ] Screen reader testing completed

---

## Component-Specific Guidelines

### Role Selection Screen

- **Layout**: Centered cards in grid (1 column mobile, 2 columns desktop)
- **Cards**: Large, clickable cards with icons and descriptions
- **Hover state**: Subtle shadow elevation, scale transform
- **Selected state**: Blue border, blue background tint

### Document Upload

- **Dropzone**: Large, dashed border, drag-and-drop feedback
- **File preview**: Show filename, file size, remove button
- **Progress**: Progress bar during upload/processing
- **Success**: Green checkmark, "Document processed" message

### Chat Interface

- **Message bubbles**: User messages (right, blue), AI messages (left, gray)
- **Snippet sources**: Collapsible section below AI messages
- **Input area**: Fixed at bottom, expandable textarea
- **Typing indicator**: Animated dots when AI is responding
- **Scroll behavior**: Auto-scroll to bottom on new messages

### Session Status

- **Indicator**: Small badge showing "Active" or "Expired"
- **Clear button**: Red/danger variant, confirmation dialog
- **Session info**: Display session ID (truncated), creation time

---

## Dark Mode (Future Enhancement)

### Implementation Strategy

- Use CSS variables for colors
- Toggle class on root element (`<html>`)
- Tailwind dark mode: `dark:` prefix

### Color Tokens (Dark Mode)

```typescript
const darkColors = {
  background: "#111827", // gray-900
  surface: "#1f2937", // gray-800
  text: "#f9fafb", // gray-50
  textMuted: "#9ca3af", // gray-400
  border: "#374151", // gray-700
};
```

---

## Icon System

### Icon Library

- Use **Heroicons** or **Lucide React** for consistency
- Size scale: `w-4 h-4` (16px), `w-5 h-5` (20px), `w-6 h-6` (24px)
- Stroke width: `stroke-2` for most icons

### Icon Usage

- **Action icons**: Use with text labels for clarity
- **Status icons**: Color-coded (green=success, red=error, etc.)
- **Decorative icons**: Use sparingly, don't overuse

---

## Form Design

### Form Layout

- **Labels**: Above inputs, left-aligned, 14px font
- **Input spacing**: `mb-4` (16px) between form fields
- **Error messages**: Red text, 12px, below input field
- **Help text**: Gray text, 12px, below input or label

### Form Validation

- **Real-time validation**: Show errors on blur or submit
- **Error styling**: Red border, error icon, error message
- **Success styling**: Green checkmark icon (optional)

---

## Code Examples

### Button Component

```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    // ... other variants
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
```

### Card Component

```typescript
// components/ui/Card.tsx
interface CardProps {
  variant?: "default" | "elevated" | "outlined" | "interactive";
  children: React.ReactNode;
}

export function Card({ variant = "default", children, ...props }: CardProps) {
  const baseStyles = "bg-white rounded-lg border border-gray-200 p-6";
  const variants = {
    default: baseStyles,
    elevated: "bg-white rounded-lg shadow-md border border-gray-200 p-6",
    outlined: "bg-white rounded-lg border-2 border-gray-300 p-6",
    interactive: `${baseStyles} hover:shadow-md transition-shadow cursor-pointer`,
  };

  return (
    <div className={variants[variant]} {...props}>
      {children}
    </div>
  );
}
```

---

## Best Practices

### Do's ✅

- Use Tailwind utility classes directly in components
- Extract repeated styles to constants or component variants
- Maintain consistent spacing using the spacing scale
- Test components in isolation (Storybook recommended)
- Ensure all interactive elements have focus states
- Use semantic HTML elements
- Keep component styles co-located with components

### Don'ts ❌

- Don't use inline styles (except for dynamic values)
- Don't create custom CSS unless absolutely necessary
- Don't mix Tailwind classes with custom CSS unnecessarily
- Don't use arbitrary values (`w-[123px]`) unless necessary
- Don't skip accessibility features
- Don't forget to test on mobile devices
- Don't use color alone to convey information

---

## Design Tokens Reference

### Quick Reference

```typescript
// Colors
primary: 'bg-blue-600 text-white'
secondary: 'bg-gray-200 text-gray-900'
success: 'bg-green-600 text-white'
error: 'bg-red-600 text-white'
warning: 'bg-amber-500 text-white'

// Spacing
padding: 'p-4' (16px) or 'p-6' (24px)
gap: 'gap-4' (16px)
margin: 'mb-8' (32px) for sections

// Typography
heading: 'text-2xl font-semibold'
body: 'text-base leading-relaxed'
label: 'text-sm font-medium'

// Borders
border: 'border border-gray-300 rounded-lg'

// Shadows
shadow: 'shadow-sm' (subtle) or 'shadow-md' (elevated)

// Transitions
transition: 'transition-all duration-200'
```

---

## Implementation Checklist

When creating new UI components:

- [ ] Follow component naming conventions (PascalCase)
- [ ] Use TypeScript for props and types
- [ ] Implement all required variants
- [ ] Add loading and error states
- [ ] Ensure keyboard accessibility
- [ ] Test on mobile and desktop
- [ ] Verify color contrast ratios
- [ ] Add proper ARIA labels
- [ ] Export via barrel file (`index.ts`)
- [ ] Document component usage

---

**Note**: This UI system should evolve with the project. Update this document as new patterns emerge or requirements change.
