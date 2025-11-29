# Soft Minimal Neutrals - Implementation Guide

## Quick Start

This guide shows how to apply the Soft Minimal Neutrals design system to components.

---

## Using Design Tokens

### Option 1: CSS Variables (Recommended for Tailwind v4)

```tsx
// Use CSS variables directly in className
<div className="bg-[var(--bg-base)] text-[var(--text-primary)]">
  Content
</div>
```

### Option 2: Tailwind Arbitrary Values

```tsx
// Use arbitrary values with design token colors
<div className="bg-[#fafaf9] text-[#292524] border-[rgba(120,113,108,0.12)]">
  Content
</div>
```

### Option 3: Import from design-tokens.ts

```tsx
import { colors, componentStyles } from '@/lib/constants/design-tokens';

// Use in inline styles or computed values
<div style={{ backgroundColor: colors.semantic.background.base }}>
  Content
</div>
```

---

## Component Styling Patterns

### Chat Container

```tsx
<div className="flex h-full min-h-0 flex-col overflow-hidden 
  rounded-[1.5rem] 
  border border-[var(--border-subtle)] 
  bg-[var(--bg-base)] 
  shadow-[var(--shadow-sm)] 
  p-6">
  {/* Content */}
</div>
```

### User Message Bubble

```tsx
<div className="rounded-[1.5rem] rounded-tr-[0.375rem] 
  bg-[var(--accent-blue-500)] 
  text-white 
  px-4 py-3 
  shadow-[var(--shadow-sm)]">
  {message.content}
</div>
```

### AI Message Bubble

```tsx
<div className="rounded-[1.5rem] rounded-tl-[0.375rem] 
  bg-[var(--bg-elevated)] 
  text-[var(--text-primary)] 
  border border-[var(--border-subtle)] 
  px-4 py-3 
  shadow-[var(--shadow-xs)]">
  {message.content}
</div>
```

### Chat Input

```tsx
<textarea
  className="w-full 
    rounded-xl 
    border border-[var(--border-subtle)] 
    bg-[var(--bg-elevated)] 
    px-4 py-3 
    text-[var(--text-primary)] 
    placeholder:text-[var(--text-tertiary)]
    focus:border-[var(--border-default)] 
    focus:outline-none 
    focus:shadow-[var(--shadow-sm)]
    transition-all duration-200 ease-in-out"
  placeholder="Type your message..."
/>
```

### Soft Button (Primary)

```tsx
<button
  className="rounded-lg 
    bg-[var(--accent-blue-500)] 
    text-white 
    px-4 py-2 
    shadow-[var(--shadow-sm)]
    hover:bg-[var(--accent-blue-600)]
    hover:shadow-[var(--shadow-md)]
    transition-all duration-200 ease-in-out
    focus:outline-none 
    focus:ring-2 
    focus:ring-[var(--accent-blue-500)] 
    focus:ring-offset-2">
  Button Text
</button>
```

### Soft Button (Secondary)

```tsx
<button
  className="rounded-lg 
    bg-[var(--neutral-100)] 
    text-[var(--text-primary)] 
    px-4 py-2 
    shadow-[var(--shadow-xs)]
    hover:bg-[var(--neutral-200)]
    transition-all duration-200 ease-in-out
    focus:outline-none 
    focus:ring-2 
    focus:ring-[var(--neutral-400)] 
    focus:ring-offset-2">
  Button Text
</button>
```

### Card Component

```tsx
<div className="rounded-[1.5rem] 
  border border-[var(--border-subtle)] 
  bg-[var(--bg-elevated)] 
  p-6 
  shadow-[var(--shadow-sm)]">
  {/* Card content */}
</div>
```

### Empty State Suggestion Card

```tsx
<button
  className="w-full text-left 
    rounded-lg 
    border border-[var(--border-subtle)] 
    bg-[var(--neutral-100)] 
    p-4 
    text-[var(--text-secondary)]
    hover:shadow-[var(--shadow-sm)]
    transition-all duration-200 ease-in-out
    focus:outline-none 
    focus:ring-2 
    focus:ring-[var(--border-default)]">
  <p className="text-sm leading-relaxed">{suggestion}</p>
</button>
```

---

## Spacing System

Use consistent spacing throughout:

```tsx
// Tight spacing (8px)
<div className="gap-2 space-x-2 space-y-2">

// Base spacing (16px)
<div className="gap-4 space-x-4 space-y-4 p-4">

// Medium spacing (24px)
<div className="gap-6 space-x-6 space-y-6 p-6">

// Large spacing (32px)
<div className="gap-8 space-x-8 space-y-8 p-8">
```

---

## Typography

```tsx
// Primary text
<p className="text-[var(--text-primary)] text-base leading-relaxed">
  Main content
</p>

// Secondary text
<p className="text-[var(--text-secondary)] text-sm">
  Supporting text
</p>

// Tertiary text
<p className="text-[var(--text-tertiary)] text-xs">
  Metadata, hints
</p>
```

---

## Shadows (Soft Elevation)

```tsx
// Subtle (xs)
<div className="shadow-[var(--shadow-xs)]">

// Card elevation (sm)
<div className="shadow-[var(--shadow-sm)]">

// Hover state (md)
<div className="hover:shadow-[var(--shadow-md)]">

// Modal (lg)
<div className="shadow-[var(--shadow-lg)]">
```

---

## Transitions

Always use gentle transitions:

```tsx
// Fast (150ms)
<div className="transition-all duration-150 ease-in-out">

// Base (200ms) - Default
<div className="transition-all duration-200 ease-in-out">

// Slow (300ms)
<div className="transition-all duration-300 ease-in-out">

// Slower (400ms)
<div className="transition-all duration-400 ease-in-out">
```

---

## Focus States (Soft but Clear)

```tsx
// Primary button focus
className="focus:outline-none 
  focus:ring-2 
  focus:ring-[var(--accent-blue-500)] 
  focus:ring-offset-2"

// Input focus
className="focus:outline-none 
  focus:border-[var(--border-default)] 
  focus:shadow-[var(--shadow-sm)]"
```

---

## Common Patterns

### Message Container with Avatar

```tsx
<div className="flex items-start gap-3 mb-6 px-4 animate-fade-in">
  {/* Avatar */}
  <div className="flex-shrink-0 w-8 h-8 rounded-full 
    bg-[var(--neutral-200)] 
    flex items-center justify-center">
    <Icon className="w-4 h-4 text-[var(--text-secondary)]" />
  </div>
  
  {/* Message bubble */}
  <div className="flex-1">
    {/* Message content */}
  </div>
</div>
```

### Section Divider (Subtle)

```tsx
<div className="border-t border-[var(--border-subtle)] my-4" />
```

### Status Badge

```tsx
<span className="inline-flex items-center 
  rounded-full 
  bg-[var(--accent-green-50)] 
  text-[var(--accent-green-700)] 
  px-3 py-1 
  text-xs font-medium">
  Active
</span>
```

---

## Accessibility Checklist

When implementing components:

- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Focus indicators visible (soft but clear)
- [ ] Interactive elements have hover states
- [ ] Touch targets minimum 44x44px
- [ ] ARIA labels on icons and buttons
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

---

## Migration Checklist

When updating a component:

1. [ ] Replace bright colors with soft neutrals
2. [ ] Update borders to use `border-subtle`
3. [ ] Replace hard shadows with soft shadows
4. [ ] Update spacing to use consistent system
5. [ ] Add gentle transitions (200-300ms)
6. [ ] Test contrast ratios
7. [ ] Verify focus states
8. [ ] Test on mobile and desktop

---

## Examples by Component

### Before (V1) → After (Soft Minimal)

**ChatContainer:**
- Before: `bg-white border-gray-200 shadow-sm`
- After: `bg-[var(--bg-base)] border-[var(--border-subtle)] shadow-[var(--shadow-sm)]`

**User Message:**
- Before: `bg-blue-600 text-white`
- After: `bg-[var(--accent-blue-500)] text-white` (muted blue)

**AI Message:**
- Before: `bg-white border-gray-200`
- After: `bg-[var(--bg-elevated)] border-[var(--border-subtle)]`

**Button:**
- Before: `bg-blue-600 hover:bg-blue-700`
- After: `bg-[var(--accent-blue-500)] hover:bg-[var(--accent-blue-600)]`

---

## Next Steps

1. Start with `ChatContainer` - foundation component
2. Update `ChatMessage` - most visible component
3. Update `EmptyState` - first impression
4. Update `ChatInput` - primary interaction
5. Update remaining components systematically



