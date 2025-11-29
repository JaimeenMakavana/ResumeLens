# Earthy / Organic Systems + Soft Minimalism - Quick Start Guide

**Purpose**: Quick reference for implementing the Earthy/Organic design system transformation.

---

## 🎨 Design System Overview

### Color Philosophy
Transform from **Soft Minimal Neutrals** (warm grays, muted blues) to **Earthy/Organic Systems** (terracotta, sage, ochre, rust, earth browns, cream).

### Key Principles
1. **Warm, Grounded**: Terracotta, sage, ochre, rust colors
2. **Organic Shapes**: Generous border radius (16-24px)
3. **Soft Minimalism**: Subtle shadows, minimal borders
4. **Natural Materials**: Paper, clay, stone, moss metaphors
5. **Warm Undertones**: No cool grays or blues

---

## 🎯 Color Palette Quick Reference

### Primary Colors
```typescript
// Primary Actions
terracotta-500: '#9d7a66'  // Main actions, user messages
terracotta-600: '#826552'  // Hover states

// Success States
sage-500: '#829b72'        // Success, active states
sage-600: '#6b7f5e'        // Darker sage

// Warning States
ochre-500: '#b0976f'       // Warnings, medium confidence

// Error States
rust-500: '#b0826f'        // Errors, soft (not harsh red)
```

### Text Colors
```typescript
// Primary Text
brown-900: '#2d241f'       // Main text (deep earth)
brown-700: '#6b5a4c'       // Secondary text (warm dark)
brown-600: '#826f5e'       // Tertiary text (medium brown)
```

### Backgrounds
```typescript
// Base Background
cream-50: '#faf8f5'        // Page background (warm cream)
white: '#ffffff'            // Card backgrounds
```

### Borders & Shadows
```typescript
// Borders (Terracotta with opacity)
border-subtle: 'rgba(157, 122, 102, 0.12)'  // 12% opacity
border-default: 'rgba(157, 122, 102, 0.2)' // 20% opacity

// Shadows (Warm terracotta undertones)
shadow-sm: '0 1px 3px 0 rgba(157, 122, 102, 0.08)'
shadow-md: '0 4px 6px -1px rgba(157, 122, 102, 0.12)'
```

---

## 📋 Implementation Priority

### Phase 1: Foundation (Week 1) - **START HERE**
1. ✅ Update `lib/constants/design-tokens.ts`
2. ✅ Update `app/globals.css`
3. ✅ Test color contrast

### Phase 2: Core Layout (Week 2)
4. ✅ Update `app/page.tsx`
5. ✅ Update `components/chat/ChatContainer.tsx`

### Phase 3: Chat Components (Week 3)
6. ✅ Update `components/chat/ChatMessage.tsx`
7. ✅ Update `components/chat/ChatInput.tsx`
8. ✅ Update `components/chat/EmptyState.tsx`
9. ✅ Update `components/chat/TypingIndicator.tsx`
10. ✅ Update `components/chat/SnippetSources.tsx`

### Phase 4: Document Upload (Week 4)
11. ✅ Update `components/document-upload/FileDropzone.tsx`
12. ✅ Update `components/document-upload/TextPasteArea.tsx`
13. ✅ Update `components/document-upload/DocumentPreview.tsx`

### Phase 5: Session & UI (Week 5)
14. ✅ Update `components/session/SessionStatus.tsx`
15. ✅ Update `components/ui/button/Button.tsx`
16. ✅ Update `components/ui/card/Card.tsx`

### Phase 6: Polish & Testing (Weeks 6-8)
17. ✅ Visual consistency review
18. ✅ Accessibility audit
19. ✅ Cross-browser testing

---

## 🔄 Color Replacement Guide

### Find & Replace Patterns

#### In TypeScript/TSX Files:
```typescript
// OLD → NEW
'--accent-blue-500' → '--terracotta-500'
'--accent-blue-600' → '--terracotta-600'
'--accent-green-500' → '--sage-500'
'--accent-amber-500' → '--ochre-500'
'--neutral-50' → '--cream-50'
'--neutral-100' → '--cream-100'
'--neutral-200' → '--cream-200'
'--text-primary' → '--text-primary' (value changes to brown-900)
'--text-secondary' → '--text-secondary' (value changes to brown-700)
'--border-subtle' → '--border-subtle' (value changes to terracotta)
```

#### In CSS Files:
```css
/* OLD → NEW */
#6b8ca8 → #9d7a66  /* terracotta-500 */
#5a7a94 → #826552  /* terracotta-600 */
#8b9a7f → #829b72  /* sage-500 */
#c4a882 → #b0976f  /* ochre-500 */
#fafaf9 → #faf8f5  /* cream-50 */
#292524 → #2d241f  /* brown-900 */
```

---

## 🎨 Component-Specific Color Rules

### ChatMessage
- **User Messages**: `terracotta-500` background, white text
- **AI Messages**: White/cream background, `brown-900` text, `terracotta-subtle` border
- **Avatars**: `terracotta-500` (user), `sage-200` (AI)
- **Confidence**: `sage-500` (high), `ochre-500` (medium), `brown-500` (low)

### ChatInput
- **Background**: White/cream
- **Border**: `terracotta-subtle`
- **Focus**: `terracotta-default` border, warm glow
- **Button**: `terracotta-500`, white text

### Buttons
- **Primary**: `terracotta-500`, white text
- **Success**: `sage-500`, white text
- **Warning**: `ochre-500`, `brown-900` text
- **Error**: `rust-500`, white text

### Cards
- **Background**: White/cream
- **Border**: `terracotta-subtle`
- **Shadow**: Warm terracotta (`shadow-sm`)

### EmptyState
- **Text**: `brown-700`
- **Cards**: `terracotta-100` or `cream-100` background
- **Hover**: Warm terracotta shadow

---

## ✅ Pre-Implementation Checklist

Before starting implementation:

- [ ] Read `EARTHY_ORGANIC_DESIGN_SYSTEM.md` (complete design spec)
- [ ] Read `EARTHY_ORGANIC_IMPLEMENTATION_PLAN.md` (detailed component plan)
- [ ] Set up color contrast testing tool
- [ ] Create backup branch: `git checkout -b earthy-organic-redesign`
- [ ] Review current component structure
- [ ] Identify all files that need updates

---

## 🚀 Quick Start Steps

### Step 1: Update Design Tokens
```bash
# File: lib/constants/design-tokens.ts
# Replace entire color palette with earthy/organic colors
# See EARTHY_ORGANIC_IMPLEMENTATION_PLAN.md Section 1.1
```

### Step 2: Update CSS Variables
```bash
# File: app/globals.css
# Replace all CSS variables with earthy/organic values
# See EARTHY_ORGANIC_IMPLEMENTATION_PLAN.md Section 1.2
```

### Step 3: Test Color Contrast
```bash
# Use online tool: https://webaim.org/resources/contrastchecker/
# Test: brown-900 on cream-50 (should be 4.5:1+)
# Test: white on terracotta-500 (should be 4.5:1+)
```

### Step 4: Update Components (One at a time)
```bash
# Start with HomePage (app/page.tsx)
# Then ChatContainer
# Then ChatMessage
# Continue with remaining components
```

---

## 🧪 Testing Checklist

### Color Contrast
- [ ] Brown-900 on cream-50: ✅ 4.5:1+
- [ ] Brown-900 on white: ✅ 4.5:1+
- [ ] White on terracotta-500: ✅ 4.5:1+
- [ ] Sage-600 on sage-50: ✅ 4.5:1+
- [ ] Brown-700 on cream-50: ✅ 4.5:1+

### Visual Consistency
- [ ] All primary actions use terracotta-500
- [ ] All success states use sage-500
- [ ] All warnings use ochre-500
- [ ] All errors use rust-500
- [ ] All shadows use warm terracotta undertones
- [ ] All borders use terracotta subtle/default

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible (terracotta glow)
- [ ] Screen reader tested
- [ ] Touch targets 44px minimum
- [ ] Reduced motion supported

---

## 📚 Documentation Files

1. **`EARTHY_ORGANIC_DESIGN_SYSTEM.md`**
   - Complete 10-phase design specification
   - Color palette definitions
   - Component specifications
   - UX flow maps
   - Edge cases

2. **`EARTHY_ORGANIC_IMPLEMENTATION_PLAN.md`**
   - Precise component-by-component changes
   - Line-by-line update instructions
   - Color replacement patterns
   - Testing checklists

3. **`EARTHY_ORGANIC_QUICK_START.md`** (this file)
   - Quick reference
   - Color palette cheat sheet
   - Implementation priority
   - Testing checklist

---

## 🎯 Success Criteria

### Visual
- ✅ Warm, earthy appearance
- ✅ Consistent color usage
- ✅ Organic, generous border radius
- ✅ Warm shadows everywhere

### Functional
- ✅ All components updated
- ✅ No broken styles
- ✅ Responsive design maintained
- ✅ Performance maintained

### Accessibility
- ✅ WCAG 2.1 AA compliance
- ✅ All contrast ratios pass
- ✅ Keyboard navigation works
- ✅ Screen reader friendly

---

## 🆘 Troubleshooting

### Issue: Colors look too dark
**Solution**: Check if using brown-900 for text on dark backgrounds. Use brown-700 or brown-600 for lighter backgrounds.

### Issue: Contrast fails
**Solution**: Use online contrast checker. Ensure brown-900 on cream-50 (should pass). If not, adjust to brown-800.

### Issue: Shadows look too strong
**Solution**: Reduce opacity in shadow definitions. Use 0.06-0.08 for subtle shadows, 0.12-0.15 for stronger.

### Issue: Borders not visible
**Solution**: Increase opacity in border definitions. Use 0.12 for subtle, 0.20 for default, 0.30 for emphasis.

---

## 📝 Notes

- **Gradual Migration**: Update one component at a time for easier testing
- **Color Testing**: Always test contrast when changing colors
- **Consistency**: Use design tokens, no hardcoded colors
- **Documentation**: Update component docs with new color usage
- **Accessibility First**: Never sacrifice accessibility for aesthetics

---

**Ready to start?** Begin with Phase 1: Foundation (design tokens & CSS variables).

**Questions?** Refer to `EARTHY_ORGANIC_DESIGN_SYSTEM.md` for complete specifications.

