# Earthy / Organic Systems - Component-Wise Implementation Plan

**Purpose**: Precise, component-by-component implementation guide for transforming ResumeLens to Earthy/Organic + Soft Minimalism design system.

---

## Implementation Overview

### Color System Migration
- **From**: Soft Minimal Neutrals (warm grays, muted blues)
- **To**: Earthy/Organic Systems (terracotta, sage, ochre, rust, earth browns, cream)

### Key Changes Per Component
1. **Color Tokens**: Replace all color references
2. **Shadows**: Update to warm terracotta undertones
3. **Borders**: Update to terracotta subtle/default
4. **Backgrounds**: Update to cream/earth tones
5. **Text Colors**: Update to earth browns
6. **Accents**: Terracotta (primary), Sage (success), Ochre (warning), Rust (error)

---

## Phase 1: Foundation Files

### 1.1 Design Tokens (`lib/constants/design-tokens.ts`)

**Current State**: Soft Minimal Neutrals palette
**Target State**: Earthy/Organic palette

**Changes Required**:

```typescript
// REPLACE: colors.neutral (warm grays)
// WITH: colors.earth (cream, terracotta, sage, ochre, rust, brown)

// REPLACE: colors.accent.blue (muted blue)
// WITH: colors.earth.terracotta (warm terracotta)

// REPLACE: colors.accent.green (muted green)
// WITH: colors.earth.sage (natural sage)

// REPLACE: colors.accent.amber (muted amber)
// WITH: colors.earth.ochre (warm ochre)

// REPLACE: colors.semantic.text.primary (#292524 - warm gray)
// WITH: colors.semantic.text.primary (#2d241f - deep earth brown)

// REPLACE: colors.semantic.border.subtle (rgba(120, 113, 108, 0.12))
// WITH: colors.semantic.border.subtle (rgba(157, 122, 102, 0.12) - terracotta)

// REPLACE: shadows (neutral-900 with opacity)
// WITH: shadows (terracotta-500 with warm opacity)

// REPLACE: componentStyles.messageUser.background (accent-blue-500)
// WITH: componentStyles.messageUser.background (terracotta-500)

// REPLACE: componentStyles.buttonPrimary.background (accent-blue-500)
// WITH: componentStyles.buttonPrimary.background (terracotta-500)
```

**Specific Line Changes**:
- Lines 13-26: Replace `neutral` object with `earth` object (cream, terracotta, sage, ochre, rust, brown)
- Lines 28-48: Replace `accent` object with earth-based accents
- Lines 51-68: Update `semantic` colors to earthy palette
- Lines 124-131: Update `shadows` to use terracotta-500 instead of neutral-900
- Lines 162-244: Update all `componentStyles` to use earthy colors

---

### 1.2 CSS Variables (`app/globals.css`)

**Current State**: Soft Minimal Neutrals CSS variables
**Target State**: Earthy/Organic CSS variables

**Changes Required**:

```css
/* REPLACE: --neutral-* variables (warm grays) */
/* WITH: --earth-* variables (cream, terracotta, sage, ochre, rust, brown) */

/* REPLACE: --accent-blue-* variables (muted blue) */
/* WITH: --terracotta-* variables (warm terracotta) */

/* REPLACE: --accent-green-* variables (muted green) */
/* WITH: --sage-* variables (natural sage) */

/* REPLACE: --accent-amber-* variables (muted amber) */
/* WITH: --ochre-* variables (warm ochre) */

/* REPLACE: --text-primary (#292524) */
/* WITH: --text-primary (#2d241f - deep earth brown) */

/* REPLACE: --bg-base (#fafaf9 - warm off-white) */
/* WITH: --bg-base (#faf8f5 - warm cream) */

/* REPLACE: --border-subtle (rgba(120, 113, 108, 0.12)) */
/* WITH: --border-subtle (rgba(157, 122, 102, 0.12) - terracotta) */

/* REPLACE: --shadow-* (neutral-900 with opacity) */
/* WITH: --shadow-* (terracotta-500 with warm opacity) */
```

**Specific Line Changes**:
- Lines 9-10: Update `--background` and `--foreground`
- Lines 12-22: Replace `--neutral-*` with `--earth-*` variables
- Lines 24-30: Replace `--accent-blue-*` with `--terracotta-*`
- Lines 32-34: Replace `--accent-green-*` with `--sage-*`
- Lines 36-38: Replace `--accent-amber-*` with `--ochre-*`
- Lines 40-44: Update semantic text colors
- Lines 46-48: Update semantic background colors
- Lines 50-52: Update semantic border colors (terracotta)
- Lines 54-58: Update shadow definitions (terracotta undertones)

---

## Phase 2: Core Layout Components

### 2.1 HomePage (`app/page.tsx`)

**Current State**: Uses `--bg-base`, `--border-subtle`, `--accent-blue-500`
**Target State**: Earthy colors throughout

**Changes Required**:

```tsx
// Line 56: Background
// FROM: bg-[var(--bg-base)]
// TO: bg-[var(--bg-base)] (updated to cream-50)

// Lines 112-114: Background shapes
// FROM: bg-[var(--neutral-200)]/20, bg-[var(--neutral-300)]/15, bg-[var(--accent-blue-100)]/10
// TO: bg-[var(--terracotta-200)]/15, bg-[var(--sage-200)]/10, bg-[var(--ochre-100)]/8
// (Warm, earthy undertones instead of blue)

// Line 64: Session button border
// FROM: border-[var(--border-subtle)]
// TO: border-[var(--border-subtle)] (updated to terracotta)

// Line 65: Session button background
// FROM: bg-[var(--bg-elevated)]
// TO: bg-[var(--bg-elevated)] (white/cream)

// Line 67: Session button shadow
// FROM: shadow-[var(--shadow-sm)]
// TO: shadow-[var(--shadow-sm)] (warm terracotta)

// Line 69: Session button hover
// FROM: hover:bg-[var(--neutral-50)]
// TO: hover:bg-[var(--cream-50)]

// Line 85: Session panel border
// FROM: border-[var(--border-subtle)]
// TO: border-[var(--border-subtle)] (terracotta)

// Line 87: Session panel background
// FROM: bg-[var(--bg-elevated)]
// TO: bg-[var(--bg-elevated)] (white/cream)

// Line 91: Session panel shadow
// FROM: shadow-[var(--shadow-lg)]
// TO: shadow-[var(--shadow-lg)] (warm terracotta)

// Line 124: Chat card border
// FROM: border-[var(--border-subtle)]
// TO: border-[var(--border-subtle)] (terracotta)

// Line 125: Chat card background
// FROM: bg-[var(--bg-elevated)]
// TO: bg-[var(--bg-elevated)] (white/cream)

// Line 126: Chat card shadow
// FROM: shadow-[var(--shadow-md)]
// TO: shadow-[var(--shadow-md)] (warm terracotta)

// Line 135: Role toggle background
// FROM: bg-[var(--neutral-100)]
// TO: bg-[var(--cream-100)]

// Line 142: Active role button
// FROM: bg-[var(--accent-blue-500)]
// TO: bg-[var(--terracotta-500)]

// Line 143: Active role shadow
// FROM: shadow-[var(--shadow-sm)]
// TO: shadow-[var(--shadow-sm)] (warm terracotta)

// Line 145: Inactive role hover
// FROM: hover:bg-[var(--neutral-200)]
// TO: hover:bg-[var(--cream-200)]

// Line 154: Active role button (job seeker)
// FROM: bg-[var(--accent-blue-500)]
// TO: bg-[var(--terracotta-500)]

// Line 183: Document card border
// FROM: border-[var(--border-subtle)]
// TO: border-[var(--border-subtle)] (terracotta)

// Line 185: Document card shadow
// FROM: shadow-[var(--shadow-md)]
// TO: shadow-[var(--shadow-md)] (warm terracotta)
```

**Specific Updates**:
1. Replace all `--neutral-*` references with `--cream-*` or `--earth-*`
2. Replace `--accent-blue-500` with `--terracotta-500`
3. Update background shapes to use terracotta/sage/ochre instead of blue
4. Ensure all shadows use warm terracotta undertones

---

### 2.2 ChatContainer (`components/chat/ChatContainer.tsx`)

**Current State**: Uses `--bg-base`, `--border-subtle`, `--shadow-sm`
**Target State**: Earthy colors

**Changes Required**:

```tsx
// Line 15: Border
// FROM: border-[var(--border-subtle)]
// TO: border-[var(--border-subtle)] (terracotta subtle)

// Line 16: Background
// FROM: bg-[var(--bg-base)]
// TO: bg-[var(--bg-base)] (cream-50)

// Line 17: Shadow
// FROM: shadow-[var(--shadow-sm)]
// TO: shadow-[var(--shadow-sm)] (warm terracotta)

// Line 24: Typing indicator border
// FROM: border-[var(--border-subtle)]
// TO: border-[var(--border-subtle)] (terracotta)

// Line 25: Typing indicator background
// FROM: bg-[var(--bg-elevated)]
// TO: bg-[var(--bg-elevated)] (white/cream)
```

**Specific Updates**:
1. All borders use terracotta subtle
2. Background uses cream-50
3. Shadows use warm terracotta

---

## Phase 3: Chat Components

### 3.1 ChatMessage (`components/chat/ChatMessage.tsx`)

**Current State**: Uses `--accent-blue-500`, `--neutral-200`, `--text-secondary`
**Target State**: Terracotta user messages, sage AI accents

**Changes Required**:

```tsx
// Line 42: User avatar background
// FROM: bg-[var(--accent-blue-500)]
// TO: bg-[var(--terracotta-500)]

// Line 43: AI avatar background
// FROM: bg-[var(--neutral-200)]
// TO: bg-[var(--sage-200)]

// Line 60: User message background
// FROM: bg-[var(--accent-blue-500)]
// TO: bg-[var(--terracotta-500)]

// Line 61: User message shadow
// FROM: shadow-[var(--shadow-sm)]
// TO: shadow-[var(--shadow-sm)] (warm terracotta)

// Line 61: AI message background
// FROM: bg-[var(--bg-elevated)]
// TO: bg-[var(--bg-elevated)] (white/cream)

// Line 61: AI message text
// FROM: text-[var(--text-primary)]
// TO: text-[var(--text-primary)] (brown-900)

// Line 61: AI message border
// FROM: border-[var(--border-subtle)]
// TO: border-[var(--border-subtle)] (terracotta)

// Line 61: AI message shadow
// FROM: shadow-[var(--shadow-xs)]
// TO: shadow-[var(--shadow-xs)] (warm terracotta)

// Line 93: Confidence indicator border
// FROM: border-[var(--border-subtle)]
// TO: border-[var(--border-subtle)] (terracotta)

// Line 95: Confidence indicator background
// FROM: bg-[var(--neutral-200)]
// TO: bg-[var(--cream-200)]

// Line 99: High confidence color
// FROM: bg-[var(--accent-green-500)]
// TO: bg-[var(--sage-500)]

// Line 101: Medium confidence color
// FROM: bg-[var(--accent-amber-500)]
// TO: bg-[var(--ochre-500)]

// Line 102: Low confidence color
// FROM: bg-[var(--neutral-500)]
// TO: bg-[var(--brown-500)]

// Line 110: Confidence text
// FROM: text-[var(--text-secondary)]
// TO: text-[var(--text-secondary)] (brown-700)

// Line 125: Timestamp text
// FROM: text-[var(--text-secondary)]
// TO: text-[var(--text-secondary)] (brown-700)

// Line 131: Source separator
// FROM: text-[var(--text-tertiary)]
// TO: text-[var(--text-tertiary)] (brown-600)

// Line 136: Source count text
// FROM: text-[var(--text-secondary)]
// TO: text-[var(--text-secondary)] (brown-700)
```

**Specific Updates**:
1. User messages: Terracotta-500 background
2. AI messages: White/cream background, terracotta border
3. Avatars: Terracotta (user), Sage (AI)
4. Confidence: Sage (high), Ochre (medium), Brown (low)
5. All text colors: Earth browns

---

### 3.2 ChatInput (`components/chat/ChatInput.tsx`)

**Current State**: Uses `--bg-elevated`, `--border-subtle`, `--text-primary`
**Target State**: Earthy input styling

**Changes Required**:

```tsx
// Check file for:
// - Background: bg-[var(--bg-elevated)] → white/cream
// - Border: border-[var(--border-subtle)] → terracotta subtle
// - Focus border: border-[var(--border-default)] → terracotta default
// - Focus shadow: shadow-[var(--shadow-sm)] → warm terracotta
// - Placeholder: text-[var(--text-tertiary)] → brown-600
// - Button background: bg-[var(--accent-blue-500)] → terracotta-500
// - Button hover: hover:bg-[var(--accent-blue-600)] → terracotta-600
```

**Specific Updates**:
1. Input: Cream background, terracotta borders
2. Focus: Warm terracotta glow
3. Button: Terracotta-500, white text
4. Placeholder: Earth brown, muted

---

### 3.3 EmptyState (`components/chat/EmptyState.tsx`)

**Current State**: Uses `--text-secondary`, `--neutral-100`, `--border-subtle`
**Target State**: Warm, earthy empty state

**Changes Required**:

```tsx
// Check file for:
// - Text: text-[var(--text-secondary)] → brown-700
// - Suggestion cards: bg-[var(--neutral-100)] → terracotta-100 or cream-100
// - Suggestion borders: border-[var(--border-subtle)] → terracotta subtle
// - Hover shadow: shadow-[var(--shadow-sm)] → warm terracotta
// - Icon colors: Use terracotta-500
```

**Specific Updates**:
1. Text: Brown-700 (warm dark)
2. Cards: Terracotta-100 or cream-100 background
3. Borders: Terracotta subtle
4. Hover: Warm terracotta shadow
5. Icons: Terracotta accents

---

### 3.4 TypingIndicator (`components/chat/TypingIndicator.tsx`)

**Current State**: Likely uses blue/gray colors
**Target State**: Sage green, organic pulse

**Changes Required**:

```tsx
// Check file for:
// - Dot colors: Use sage-500
// - Animation: Organic pulse (300ms)
// - Background: Cream, subtle
```

**Specific Updates**:
1. Dots: Sage-500 (natural green)
2. Animation: Smooth, organic (300ms)
3. Background: Cream, very subtle

---

### 3.5 MessageList (`components/chat/MessageList.tsx`)

**Current State**: Likely uses neutral backgrounds
**Target State**: Cream background

**Changes Required**:

```tsx
// Check file for:
// - Background: bg-[var(--bg-base)] → cream-50
// - Scrollbar (if custom): Use terracotta accent
```

**Specific Updates**:
1. Background: Cream-50
2. Scrollbar: Terracotta accent (if custom)

---

### 3.6 SnippetSources (`components/chat/SnippetSources.tsx`)

**Current State**: Likely uses neutral/gray styling
**Target State**: Sage-tinted cards

**Changes Required**:

```tsx
// Check file for:
// - Container background: bg-[var(--neutral-50)] → sage-50
// - Border: border-[var(--border-subtle)] → terracotta subtle
// - Text: text-[var(--text-primary)] → brown-700
// - Expand icon: Use sage-500
// - Hover: Gentle elevation, sage accent
```

**Specific Updates**:
1. Container: Sage-50 background (very light sage)
2. Border: Terracotta subtle
3. Text: Brown-700
4. Icons: Sage-500
5. Hover: Sage accent, warm shadow

---

## Phase 4: Document Upload Components

### 4.1 FileDropzone (`components/document-upload/FileDropzone.tsx`)

**Current State**: Likely uses neutral/gray styling
**Target State**: Organic dropzone with terracotta accents

**Changes Required**:

```tsx
// Check file for:
// - Background: bg-[var(--neutral-50)] → cream-50
// - Border: border-[var(--border-subtle)] → terracotta subtle
// - Border style: dashed on hover
// - Hover border: border-[var(--border-default)] → terracotta default
// - Hover shadow: shadow-[var(--shadow-sm)] → warm terracotta
// - Icon: Use terracotta-500
// - Text: text-[var(--text-primary)] → brown-700
```

**Specific Updates**:
1. Background: Cream-50
2. Border: Terracotta subtle (dashed on hover)
3. Hover: Terracotta default border, warm shadow
4. Icon: Terracotta-500
5. Text: Brown-700

---

### 4.2 TextPasteArea (`components/document-upload/TextPasteArea.tsx`)

**Current State**: Likely uses neutral/gray styling
**Target State**: Earthy text area

**Changes Required**:

```tsx
// Check file for:
// - Background: bg-[var(--bg-elevated)] → white/cream
// - Border: border-[var(--border-subtle)] → terracotta subtle
// - Focus border: border-[var(--border-default)] → terracotta default
// - Focus shadow: shadow-[var(--shadow-sm)] → warm terracotta
// - Placeholder: text-[var(--text-tertiary)] → brown-600
// - Text: text-[var(--text-primary)] → brown-900
```

**Specific Updates**:
1. Background: White/cream
2. Border: Terracotta subtle
3. Focus: Terracotta default, warm glow
4. Placeholder: Brown-600
5. Text: Brown-900

---

### 4.3 DocumentPreview (`components/document-upload/DocumentPreview.tsx`)

**Current State**: Likely uses neutral/gray styling
**Target State**: Warm preview cards

**Changes Required**:

```tsx
// Check file for:
// - Card background: bg-[var(--bg-elevated)] → white/cream
// - Card border: border-[var(--border-subtle)] → terracotta subtle
// - Card shadow: shadow-[var(--shadow-sm)] → warm terracotta
// - Header text: text-[var(--text-primary)] → brown-900
// - Content text: text-[var(--text-secondary)] → brown-700
// - Actions: Terracotta buttons
```

**Specific Updates**:
1. Card: White/cream, terracotta border, warm shadow
2. Header: Brown-900
3. Content: Brown-700
4. Actions: Terracotta-500 buttons

---

### 4.4 ProcessingStatus (`components/document-processing/ProcessingStatus.tsx`)

**Current State**: Likely uses blue/gray spinner
**Target State**: Terracotta/sage spinner

**Changes Required**:

```tsx
// Check file for:
// - Spinner color: Use terracotta-500 or sage-500
// - Text: text-[var(--text-secondary)] → brown-700
// - Background: Cream, subtle
```

**Specific Updates**:
1. Spinner: Terracotta-500 or sage-500
2. Text: Brown-700
3. Background: Cream, subtle

---

## Phase 5: Session Components

### 5.1 SessionStatus (`components/session/SessionStatus.tsx`)

**Current State**: Likely uses green/blue badge
**Target State**: Sage green badge

**Changes Required**:

```tsx
// Check file for:
// - Badge background: bg-[var(--accent-green-50)] → sage-50
// - Badge text: text-[var(--accent-green-700)] → sage-600
// - Badge border: border-[var(--border-subtle)] → terracotta subtle
// - Icon: Use sage-500
```

**Specific Updates**:
1. Badge: Sage-50 background, sage-600 text
2. Border: Terracotta subtle
3. Icon: Sage-500

---

### 5.2 ClearSessionButton (`components/session/ClearSessionButton.tsx`)

**Current State**: Likely uses red/blue button
**Target State**: Terracotta button

**Changes Required**:

```tsx
// Check file for:
// - Background: bg-[var(--accent-blue-500)] → terracotta-500
// - Hover: hover:bg-[var(--accent-blue-600)] → terracotta-600
// - Text: White
// - Shadow: shadow-[var(--shadow-sm)] → warm terracotta
```

**Specific Updates**:
1. Background: Terracotta-500
2. Hover: Terracotta-600
3. Text: White
4. Shadow: Warm terracotta

---

## Phase 6: UI Components

### 6.1 Button (`components/ui/button/Button.tsx`)

**Current State**: Likely uses blue primary
**Target State**: Terracotta primary, sage success, ochre warning, rust error

**Changes Required**:

```tsx
// Check file for variants:
// - Primary: bg-[var(--accent-blue-500)] → terracotta-500
// - Secondary: bg-[var(--neutral-100)] → cream-100
// - Success: bg-[var(--accent-green-500)] → sage-500
// - Warning: bg-[var(--accent-amber-500)] → ochre-500
// - Error: Use rust-500
// - All hover states: Darker shades
// - All shadows: Warm terracotta
// - Focus: Terracotta glow
```

**Specific Updates**:
1. Primary: Terracotta-500, white text
2. Secondary: Cream-100, brown-900 text
3. Success: Sage-500, white text
4. Warning: Ochre-500, brown-900 text
5. Error: Rust-500, white text
6. All shadows: Warm terracotta
7. Focus: Terracotta glow

---

### 6.2 Card (`components/ui/card/Card.tsx`)

**Current State**: Likely uses neutral styling
**Target State**: Warm, earthy cards

**Changes Required**:

```tsx
// Check file for:
// - Background: bg-[var(--bg-elevated)] → white/cream
// - Border: border-[var(--border-subtle)] → terracotta subtle
// - Shadow: shadow-[var(--shadow-sm)] → warm terracotta
// - Border radius: Generous (2xl)
```

**Specific Updates**:
1. Background: White/cream
2. Border: Terracotta subtle
3. Shadow: Warm terracotta
4. Radius: 2xl (generous, organic)

---

### 6.3 Input (`components/ui/input/Input.tsx`)

**Current State**: Likely uses neutral styling
**Target State**: Earthy input

**Changes Required**:

```tsx
// Check file for:
// - Background: bg-[var(--bg-elevated)] → white/cream
// - Border: border-[var(--border-subtle)] → terracotta subtle
// - Focus border: border-[var(--border-default)] → terracotta default
// - Focus shadow: shadow-[var(--shadow-sm)] → warm terracotta
// - Placeholder: text-[var(--text-tertiary)] → brown-600
// - Text: text-[var(--text-primary)] → brown-900
```

**Specific Updates**:
1. Background: White/cream
2. Border: Terracotta subtle
3. Focus: Terracotta default, warm glow
4. Placeholder: Brown-600
5. Text: Brown-900

---

### 6.4 LoadingSpinner (`components/ui/loading/LoadingSpinner.tsx`)

**Current State**: Likely uses blue/gray spinner
**Target State**: Terracotta/sage spinner

**Changes Required**:

```tsx
// Check file for:
// - Spinner color: Use terracotta-500
// - Animation: Organic, smooth
```

**Specific Updates**:
1. Color: Terracotta-500
2. Animation: Smooth, organic (300ms)

---

## Phase 7: Supporting Components

### 7.1 RoleCard (`components/role-selection/RoleCard.tsx`)

**Current State**: Likely uses blue/gray styling
**Target State**: Warm, earthy cards

**Changes Required**:

```tsx
// Check file for:
// - Background: bg-[var(--bg-elevated)] → white/cream
// - Border: border-[var(--border-subtle)] → terracotta subtle
// - Hover border: border-[var(--border-default)] → terracotta default
// - Hover shadow: shadow-[var(--shadow-md)] → warm terracotta
// - Icon: Use terracotta-500
// - Text: text-[var(--text-primary)] → brown-900
```

**Specific Updates**:
1. Background: White/cream
2. Border: Terracotta subtle
3. Hover: Terracotta default, warm shadow
4. Icon: Terracotta-500
5. Text: Brown-900

---

### 7.2 MessageActions (`components/chat/MessageActions.tsx`)

**Current State**: Likely uses neutral/gray menu
**Target State**: Warm menu with terracotta accents

**Changes Required**:

```tsx
// Check file for:
// - Menu background: bg-[var(--bg-elevated)] → white/cream
// - Menu border: border-[var(--border-subtle)] → terracotta subtle
// - Menu shadow: shadow-[var(--shadow-lg)] → warm terracotta
// - Item text: text-[var(--text-primary)] → brown-700
// - Item hover: bg-[var(--neutral-100)] → terracotta-100
// - Icons: Use terracotta-500
```

**Specific Updates**:
1. Menu: White/cream, terracotta border, warm shadow
2. Items: Brown-700 text
3. Hover: Terracotta-100 background
4. Icons: Terracotta-500

---

### 7.3 ScrollToBottomButton (`components/chat/ScrollToBottomButton.tsx`)

**Current State**: Likely uses blue/gray button
**Target State**: Terracotta button

**Changes Required**:

```tsx
// Check file for:
// - Background: bg-[var(--accent-blue-500)] → terracotta-500
// - Hover: hover:bg-[var(--accent-blue-600)] → terracotta-600
// - Icon: White
// - Shadow: shadow-[var(--shadow-sm)] → warm terracotta
```

**Specific Updates**:
1. Background: Terracotta-500
2. Hover: Terracotta-600
3. Icon: White
4. Shadow: Warm terracotta

---

## Phase 8: Testing & Validation

### 8.1 Color Contrast Testing

**Actions**:
- [ ] Test all text/background combinations for WCAG AA (4.5:1)
- [ ] Verify brown-900 on cream-50 meets contrast
- [ ] Verify terracotta-500 on white meets contrast
- [ ] Verify sage-600 on sage-50 meets contrast
- [ ] Use online contrast checker tools

**Critical Combinations**:
- Brown-900 on cream-50: ✅ Should pass
- Brown-900 on white: ✅ Should pass
- Terracotta-500 on white: ✅ Should pass
- Sage-600 on sage-50: ✅ Should pass
- White on terracotta-500: ✅ Should pass

---

### 8.2 Visual Consistency Check

**Actions**:
- [ ] Review all components for consistent color usage
- [ ] Ensure all primary actions use terracotta-500
- [ ] Ensure all success states use sage-500
- [ ] Ensure all warnings use ochre-500
- [ ] Ensure all errors use rust-500
- [ ] Ensure all shadows use warm terracotta undertones
- [ ] Ensure all borders use terracotta subtle/default

---

### 8.3 Accessibility Audit

**Actions**:
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test focus indicators (terracotta glow visible)
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Test touch targets (44px minimum)
- [ ] Test reduced motion preference
- [ ] Verify ARIA labels on all interactive elements

---

## Implementation Checklist

### Week 1: Foundation
- [ ] Update `lib/constants/design-tokens.ts` with earthy palette
- [ ] Update `app/globals.css` with earthy CSS variables
- [ ] Test color contrast ratios
- [ ] Verify all tokens exported correctly

### Week 2: Core Layout
- [ ] Update `app/page.tsx` (HomePage)
- [ ] Update `components/chat/ChatContainer.tsx`
- [ ] Test layout responsiveness
- [ ] Verify warm shadows and borders

### Week 3: Chat Components
- [ ] Update `components/chat/ChatMessage.tsx`
- [ ] Update `components/chat/ChatInput.tsx`
- [ ] Update `components/chat/EmptyState.tsx`
- [ ] Update `components/chat/TypingIndicator.tsx`
- [ ] Update `components/chat/MessageList.tsx`
- [ ] Update `components/chat/SnippetSources.tsx`

### Week 4: Document Upload
- [ ] Update `components/document-upload/FileDropzone.tsx`
- [ ] Update `components/document-upload/TextPasteArea.tsx`
- [ ] Update `components/document-upload/DocumentPreview.tsx`
- [ ] Update `components/document-processing/ProcessingStatus.tsx`

### Week 5: Session & UI
- [ ] Update `components/session/SessionStatus.tsx`
- [ ] Update `components/session/ClearSessionButton.tsx`
- [ ] Update `components/ui/button/Button.tsx`
- [ ] Update `components/ui/card/Card.tsx`
- [ ] Update `components/ui/input/Input.tsx`
- [ ] Update `components/ui/loading/LoadingSpinner.tsx`

### Week 6: Supporting Components
- [ ] Update `components/role-selection/RoleCard.tsx`
- [ ] Update `components/chat/MessageActions.tsx`
- [ ] Update `components/chat/ScrollToBottomButton.tsx`
- [ ] Review all remaining components

### Week 7: Polish
- [ ] Visual consistency review
- [ ] Spacing and typography refinement
- [ ] Animation refinement
- [ ] Hover/focus state completion

### Week 8: Testing
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Performance testing
- [ ] User feedback collection

---

## Quick Reference: Color Mappings

### Primary Actions
- **Old**: `--accent-blue-500` (#6b8ca8)
- **New**: `--terracotta-500` (#9d7a66)

### Success States
- **Old**: `--accent-green-500` (#8b9a7f)
- **New**: `--sage-500` (#829b72)

### Warning States
- **Old**: `--accent-amber-500` (#c4a882)
- **New**: `--ochre-500` (#b0976f)

### Error States
- **Old**: Red (not in old system)
- **New**: `--rust-500` (#b0826f)

### Text Colors
- **Primary**: `--text-primary` (#2d241f - brown-900)
- **Secondary**: `--text-secondary` (#6b5a4c - brown-700)
- **Tertiary**: `--text-tertiary` (#826f5e - brown-600)

### Backgrounds
- **Base**: `--bg-base` (#faf8f5 - cream-50)
- **Elevated**: `--bg-elevated` (#ffffff - white)

### Borders
- **Subtle**: `--border-subtle` (rgba(157, 122, 102, 0.12) - terracotta)
- **Default**: `--border-default` (rgba(157, 122, 102, 0.2) - terracotta)

### Shadows
- **All shadows**: Use terracotta-500 with warm opacity (not neutral-900)

---

## Notes

1. **Gradual Migration**: Consider migrating one component at a time for easier testing
2. **Color Testing**: Always test contrast ratios when changing colors
3. **Consistency**: Ensure all components use the same color tokens (no hardcoded colors)
4. **Documentation**: Update component documentation with new color usage
5. **Accessibility**: Never sacrifice accessibility for aesthetics

---

**Last Updated**: Implementation plan created for Earthy/Organic + Soft Minimalism redesign

