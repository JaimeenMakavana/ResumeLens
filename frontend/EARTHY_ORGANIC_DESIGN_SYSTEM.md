# Earthy / Organic Systems + Soft Minimalism Design System
## ResumeLens UI Redesign - Complete Design Specification

**Design Philosophy**: Earthy / Organic Color System + Soft Minimalism UI Principles

---

## PHASE 0: Intent Interrogation

### Problem Statement
Transform ResumeLens into a warm, grounded, nature-inspired interface that feels organic and calming while maintaining all functionality. The design should evoke feelings of earth, growth, and natural harmony—like working in a serene, well-lit space surrounded by natural materials.

### Success Metrics
- **Emotional Connection**: Users report feeling "calm," "grounded," "natural," "warm"
- **Visual Harmony**: 90%+ users find the color palette pleasant and non-fatiguing
- **Focus**: 80%+ users can identify primary actions within 2 seconds
- **Accessibility**: WCAG 2.1 AA compliance maintained
- **Performance**: No degradation in load times or interactions
- **Brand Differentiation**: Distinct from generic blue/gray interfaces

### Technical Constraints
- Must work with existing component architecture
- No breaking changes to API contracts
- Maintain responsive design (mobile-first)
- Support dark mode (future consideration)
- Tailwind CSS only (no custom CSS files)
- Earthy colors must meet contrast requirements

---

## PHASE 1: Problem Clarity Engine

### Jobs-to-be-Done (One Sentence)
"Help me feel grounded and focused while exploring documents, like working in a natural, well-lit space."

### Non-Negotiable Pains
1. **Cold, Digital Feel**: Current grays and blues feel sterile and corporate
2. **Lack of Warmth**: No emotional connection or natural warmth
3. **Generic Appearance**: Looks like every other SaaS product
4. **Visual Fatigue**: Bright, high-contrast colors cause eye strain
5. **No Personality**: Missing organic, human-centered aesthetic

### First-Time User Expectations
- "Does this feel natural?" → Warm, organic color palette
- "Is this trustworthy?" → Grounded, earthy aesthetic suggests stability
- "Can I work here long?" → Calming colors reduce fatigue

### What Must Load Instantly
- Empty state with warm, inviting suggestions
- Input field (primary action) with organic styling
- Session status (trust indicator) with natural colors

### What Cannot Break
- Document upload flow
- Chat functionality
- Session management
- Responsive layout
- Color contrast (accessibility)

---

## PHASE 2: Principle Alignment (Earthy Organic + Soft Minimalism)

### Core Principles

#### 1. **Earthy Color Palette First**
- **Base**: Warm creams, soft beiges, light terracotta undertones
- **Neutrals**: Sage-tinted grays, clay browns, sand tones
- **Accents**: Terracotta, sage green, ochre, rust, moss
- **Text**: Deep earth browns (not pure black)
- **Backgrounds**: Cream, warm whites, light terracotta

#### 2. **Organic Shapes & Flow**
- **Borders**: Soft, slightly irregular (not perfectly geometric)
- **Radius**: Generous, organic curves (16-24px)
- **Shadows**: Warm, diffused (terracotta/brown undertones)
- **Depth**: Natural layering, like paper or clay

#### 3. **Soft Minimalism Foundation**
- **Subtle Depth**: Very soft shadows, barely visible borders
- **Generous Spacing**: Breathing room, comfortable rhythm
- **Typography Hierarchy**: Size and weight, not color
- **Motion**: Slow, gentle, organic (300-400ms)
- **Reduced Noise**: Minimal decorative elements

#### 4. **Natural Material Metaphors**
- **Paper**: Cards feel like textured paper
- **Clay**: Buttons have subtle depth like pressed clay
- **Stone**: Borders feel like natural stone edges
- **Moss**: Success states use sage/moss green
- **Terracotta**: Primary actions use warm terracotta

#### 5. **Warm Undertones Everywhere**
- No cool grays or blues (unless muted sage)
- All neutrals have warm, earthy undertones
- Shadows use brown/terracotta, not black
- Borders have warm opacity, not cold

#### 6. **Organic Motion Language**
- **Calm**: Slow, gentle transitions (300-400ms)
- **Natural**: Ease-in-out curves (like natural movement)
- **Purposeful**: Only animate what communicates
- **Delightful**: Subtle, organic micro-interactions

---

## PHASE 3: System Architecture Brain

### Design Tokens

#### Color Palette: Earthy / Organic Systems

```typescript
// Earthy Base Colors (Warm, Natural)
earth: {
  // Creams & Beiges (Base backgrounds)
  cream: {
    50: '#faf8f5',   // Lightest cream
    100: '#f5f1eb',  // Very light cream
    200: '#ede8e0',  // Light cream
    300: '#e0d8cd',  // Medium-light cream
  },
  
  // Terracotta & Clay (Primary actions, accents)
  terracotta: {
    50: '#faf5f2',   // Very light terracotta
    100: '#f5e8e0',  // Light terracotta
    200: '#e8d4c8',  // Medium-light terracotta
    300: '#d4b8a8',  // Medium terracotta
    400: '#b8957f',  // Base terracotta (primary)
    500: '#9d7a66',  // Darker terracotta
    600: '#826552',  // Dark terracotta
    700: '#6b5243',  // Very dark terracotta
  },
  
  // Sage & Moss (Success, nature)
  sage: {
    50: '#f4f6f3',   // Very light sage
    100: '#e8ede4',  // Light sage
    200: '#d4ddd0',  // Medium-light sage
    300: '#b8c5b0',  // Medium sage
    400: '#9db08f',  // Base sage (success)
    500: '#829b72',  // Darker sage
    600: '#6b7f5e',  // Dark sage
  },
  
  // Ochre & Amber (Warnings, warmth)
  ochre: {
    50: '#faf8f4',   // Very light ochre
    100: '#f5f0e6',  // Light ochre
    200: '#e8dcc8',  // Medium-light ochre
    300: '#d4c0a0',  // Medium ochre
    400: '#c4a882',  // Base ochre (warnings)
    500: '#b0976f',  // Darker ochre
  },
  
  // Earth Browns (Text, depth)
  brown: {
    50: '#faf8f6',   // Very light brown
    100: '#f5f1ec',  // Light brown
    200: '#e8e0d6',  // Medium-light brown
    300: '#d6c9ba',  // Medium brown
    400: '#b8a692',  // Base brown
    500: '#9d8a75',  // Darker brown
    600: '#826f5e',  // Dark brown
    700: '#6b5a4c',  // Very dark brown (text)
    800: '#4a3f35',  // Near black (warm)
    900: '#2d241f',  // Deep earth (text primary)
  },
  
  // Rust & Burnt Orange (Accents, energy)
  rust: {
    50: '#faf6f4',   // Very light rust
    100: '#f5ebe6',  // Light rust
    200: '#e8d4c8',  // Medium-light rust
    300: '#d4b8a8',  // Medium rust
    400: '#c49d88',  // Base rust (accents)
    500: '#b0826f',  // Darker rust
  },
}

// Semantic Colors (Earthy, Purpose-Driven)
semantic: {
  text: {
    primary: '#2d241f',      // brown-900 (deep earth)
    secondary: '#6b5a4c',    // brown-700 (warm dark)
    tertiary: '#826f5e',     // brown-600 (medium brown)
    disabled: '#b8a692',     // brown-400 (light brown)
  },
  background: {
    base: '#faf8f5',         // earth-cream-50 (warm cream)
    elevated: '#ffffff',      // Pure white (cards)
    overlay: 'rgba(45, 36, 31, 0.4)', // brown-900 with opacity
  },
  border: {
    subtle: 'rgba(157, 122, 102, 0.12)', // terracotta-500, 12% opacity
    default: 'rgba(157, 122, 102, 0.2)',  // terracotta-500, 20% opacity
    emphasis: 'rgba(157, 122, 102, 0.3)', // terracotta-500, 30% opacity
  },
  accent: {
    primary: '#9d7a66',      // terracotta-500 (main actions)
    success: '#9db08f',     // sage-400 (success states)
    warning: '#c4a882',      // ochre-400 (warnings)
    error: '#c49d88',        // rust-400 (errors, soft)
  },
}
```

#### Typography Scale (Organic, Warm)

```typescript
typography: {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    // Consider adding: "Inter", "Poppins" for warmer feel
    mono: '"SF Mono", "Monaco", "Inconsolata", monospace',
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
    relaxed: 1.75,    // Generous for readability
  },
  letterSpacing: {
    tight: '-0.01em',
    normal: '0',
    wide: '0.01em',    // Slightly wider for warmth
  },
}
```

#### Spacing System (Generous, Organic)

```typescript
spacing: {
  // Base unit: 4px
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem',     // 48px
  '2xl': '4rem',  // 64px
}
```

#### Shadow System (Warm, Earthy)

```typescript
shadows: {
  none: 'none',
  // Warm shadows using terracotta/brown undertones
  xs: '0 1px 2px 0 rgba(157, 122, 102, 0.06)',      // Subtle (terracotta)
  sm: '0 1px 3px 0 rgba(157, 122, 102, 0.08)',       // Card elevation
  md: '0 4px 6px -1px rgba(157, 122, 102, 0.12)',   // Hover states
  lg: '0 10px 15px -3px rgba(157, 122, 102, 0.15)', // Modals
  // All shadows use terracotta-500 with warm opacity
}
```

#### Border Radius (Organic, Generous)

```typescript
radius: {
  none: '0',
  sm: '0.5rem',     // 8px - subtle rounding
  md: '0.75rem',    // 12px - default
  lg: '1rem',       // 16px - cards
  xl: '1.5rem',     // 24px - large containers
  '2xl': '2rem',    // 32px - extra large (organic)
  full: '9999px',   // Pills, avatars
}
```

#### Transition System (Organic, Calm)

```typescript
transitions: {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  slower: '400ms ease-in-out',  // Organic, calm
}
```

### Component Naming Conventions
- **Components**: PascalCase (`ChatMessage`, `EmptyState`)
- **Variants**: camelCase (`isUser`, `showTimestamp`)
- **Props**: camelCase with descriptive names
- **CSS Classes**: Tailwind utilities, extracted to constants when repeated

### Information Architecture

```
HomePage (Root)
├── SessionControls (Floating, earthy)
├── RoleToggle (Integrated, terracotta accents)
├── ChatContainer
│   ├── ChatHeader (Soft, minimal, earthy)
│   ├── MessageList
│   │   ├── EmptyState (Warm, welcoming, organic)
│   │   ├── ChatMessage (Earthy bubbles, terracotta/sage)
│   │   └── TypingIndicator (Organic pulse)
│   └── ChatInput (Earthy, warm)
└── DocumentUpload
    ├── FileDropzone (Organic, terracotta accents)
    └── DocumentPreview (Warm cards, sage accents)
```

### Performance Budgets
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Animation Frame Rate**: 60fps
- **Bundle Size**: No increase from current

---

## PHASE 4: UX Flow Choreography

### Flow 1: First-Time User (Warm Onboarding)

1. **Landing**: Warm cream background, gentle empty state
   - Organic illustration (optional, nature-inspired)
   - 2-3 suggested questions in warm terracotta cards
   - Clear, gentle CTA: "Upload a document to begin"

2. **Document Upload**: Minimal friction, organic feel
   - Soft dropzone with terracotta border accent
   - Gentle hover state (slight elevation, warm shadow)
   - Clear feedback: "Processing..." with organic spinner

3. **First Message**: Encouraging, warm
   - Input field prominent but organic
   - Gentle placeholder text
   - Terracotta send button (warm, inviting)

4. **Response**: Calm arrival, earthy
   - Message fades in gently (300ms)
   - Snippet sources collapsible, sage accents
   - Success feels natural, grounded

### Flow 2: Ongoing Conversation

1. **Input**: Auto-resize textarea, warm focus state (terracotta glow)
2. **Sending**: Subtle typing indicator (organic pulse, sage color)
3. **Messages**: Clear but warm visual distinction
   - User: Terracotta, right-aligned
   - AI: Warm cream/white, left-aligned, sage accents
   - Timestamps: Very subtle, earth brown
4. **Actions**: Discoverable but not intrusive
   - Hover reveals actions (warm elevation)
   - Copy feedback: Gentle toast (sage green)

### Flow 3: Session Management

1. **Status**: Always visible but unobtrusive
   - Small badge in header
   - Sage green for active (natural, grounded)
   - No countdown unless hovered
2. **Clear**: Confirmation with soft modal
   - Gentle backdrop blur
   - Clear but warm messaging
   - Terracotta buttons (not harsh red)

### Emotional Beats

- **Grounded**: Earthy colors, natural materials
- **Warm**: Terracotta, cream, ochre tones
- **Calm**: Sage green, generous spacing
- **Trustworthy**: Natural, organic aesthetic
- **Focused**: Minimal distractions, warm focus

### Progressive Disclosure

- **Empty State**: Show suggestions, hide complexity
- **Snippet Sources**: Collapsed by default, expand on demand (sage accents)
- **Message Actions**: Hidden until hover
- **Session Details**: Expandable panel, not always visible

### Safety Nets

- **Error States**: Soft rust (muted), clear messaging
- **Loading States**: Gentle spinners (terracotta/sage), no jarring transitions
- **Empty States**: Helpful, warm, not empty-feeling
- **Validation**: Inline, gentle, organic

---

## PHASE 5: Aesthetic Strategy Layer

### Visual Language

#### Purpose-Aligned Aesthetics
- **Organic**: Natural colors, warm undertones, organic shapes
- **Grounded**: Earthy browns, terracotta, sage
- **Warm**: Cream, ochre, warm shadows
- **Calm**: Generous spacing, soft edges, gentle motion
- **Accessible**: High contrast where needed, but warm edges

#### Rhythm and Spacing

```
Vertical Rhythm:
- Section spacing: 2rem (32px)
- Component spacing: 1.5rem (24px)
- Element spacing: 1rem (16px)
- Tight spacing: 0.5rem (8px)

Horizontal Rhythm:
- Container padding: 1.5rem (24px)
- Card padding: 1.5rem (24px)
- Input padding: 1rem (16px)
```

#### Depth/Contrast Behavioral Consistency

- **Level 0** (Background): `earth-cream-50`, no shadow
- **Level 1** (Cards): `white`, `shadow-sm` (warm), `border-subtle` (terracotta)
- **Level 2** (Hover): `shadow-md` (warm), slight elevation
- **Level 3** (Modals): `shadow-lg` (warm), backdrop blur

#### Motion Language

- **Organic**: Slow (300-400ms), ease-in-out
- **Calm**: Purposeful, not bouncy
- **Gentle**: Fade and slide, no sharp movements
- **Delightful**: Subtle micro-interactions (hover, focus)

#### Subtle Delight Moments

1. **Input Focus**: Warm terracotta glow (not ring), gentle scale
2. **Message Arrival**: Fade + slight slide up (organic)
3. **Button Hover**: Gentle elevation, warm terracotta shift
4. **Snippet Expand**: Smooth accordion, sage accents
5. **Copy Success**: Gentle toast, sage checkmark

---

## PHASE 6: Validation Loop

### Prototype Thinking

**Key Screens to Validate:**
1. Empty state (first impression - warm, inviting)
2. Active conversation (ongoing use - earthy, calm)
3. Document upload (key action - organic, clear)
4. Error state (trust recovery - soft rust, helpful)

### Mental Model Comparison

- **Users Expect**: Natural, warm interfaces (Notion, Linear) → But more earthy
- **Users Expect**: Organic design (Airtable, Coda) → But more minimal
- **Our Approach**: Blend of both, with earthy organic colors + soft minimalism

### Friction Points Identified

1. **Color Contrast**: Ensure earthy colors still meet WCAG AA
   - **Solution**: Use brown-900 for text, test all combinations
2. **Discoverability**: Organic design might hide actions
   - **Solution**: Hover states, clear affordances, terracotta accents
3. **Emotional Connection**: Too earthy might feel rustic
   - **Solution**: Balance with modern typography, clean layouts

### Usability Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Low contrast reduces readability | High | Test all text/background combos, use brown-900+ for text |
| Actions too hidden | Medium | Clear hover states, terracotta accents, keyboard shortcuts |
| Feels too rustic | Low | Modern typography, clean layouts, balance earthy with minimal |
| Mobile touch targets too small | Medium | Maintain 44px minimum, generous padding |
| Animations too slow feel laggy | Low | Keep under 400ms, test on slower devices |

---

## PHASE 7: Technical Reality Check

### Platform Limits

- **Tailwind**: All colors must map to Tailwind classes or CSS variables
- **Next.js**: Server components limit, client components for interactivity
- **Browser**: Support modern browsers (last 2 versions)

### Performance Costs

- **Shadows**: Warm shadows are lightweight (low opacity)
- **Blur Effects**: Use sparingly (backdrop-blur can be expensive)
- **Animations**: CSS transforms only (GPU-accelerated)
- **Images**: Lazy load, optimize (if illustrations added)

### Feasible Animation Rules

```css
/* ✅ DO: GPU-accelerated properties */
transform: translateY(4px);
opacity: 0;

/* ❌ DON'T: Layout-triggering properties */
width: 100%;
height: 100%;
```

### Data/API Constraints

- No changes to API contracts
- Maintain existing state management
- No new data requirements

### Offline Resiliency

- Graceful degradation (no new offline features)
- Error states for network failures
- Clear messaging when offline

### Dev Ergonomics

- Tailwind utilities (no custom CSS files)
- TypeScript for all components
- Reusable style constants
- Clear component structure

---

## PHASE 8: Narrative Layer

### Product One-Liner
"ResumeLens: A warm, grounded space for intelligent document conversations, inspired by nature."

### Feature Naming
- **Chat**: "Conversation" (warmer, more human)
- **Documents**: "Workspace" (professional, organized)
- **Session**: "Session" (clear, technical but friendly)

### Interface Tone
- **Voice**: Warm, grounded, helpful but not overbearing
- **Copy**: Clear, concise, gentle guidance with natural language
- **Errors**: Empathetic, solution-oriented, soft rust (not harsh)
- **Success**: Subtle, confident (sage green, natural)

### Onboarding Concept
- **First Visit**: Warm welcome, clear value proposition
- **Empty State**: Suggested questions, not commands
- **First Upload**: Encouraging feedback, organic feel

### Emotional Arc
1. **Arrival**: Warm, welcoming (cream background, terracotta accents)
2. **Discovery**: Clear guidance, organic feel
3. **Action**: Confident, smooth interactions (terracotta primary)
4. **Success**: Subtle satisfaction, sage green confirmation
5. **Return**: Familiar, trustworthy, efficient

---

## PHASE 9: Edge-Case Wrangle Mode

### Empty States

**No Messages:**
- Organic illustration or icon (optional, nature-inspired)
- 2-3 suggested questions in warm terracotta cards
- Gentle CTA: "Start a conversation"
- Warm colors, not empty-feeling

**No Document:**
- Clear upload area with terracotta border accent
- Helpful hint text
- No aggressive CTAs

### Error States

**Upload Failed:**
- Soft rust (muted), not harsh
- Clear, helpful message
- Retry button (terracotta, not aggressive)

**Network Error:**
- Gentle notification (rust accent)
- Retry option
- No panic-inducing red

**Session Expired:**
- Soft warning (ochre)
- Clear next steps
- Gentle transition to new session

### Latency States

**Slow Processing:**
- Gentle spinner (terracotta/sage, not jarring)
- Progress indicator if possible
- Reassuring message: "Processing your document..."

**Slow Response:**
- Typing indicator (organic pulse, sage color)
- No timeout errors too quickly
- Graceful handling

### Overloaded Data

**Many Messages:**
- Virtual scrolling if needed
- Smooth scroll-to-bottom
- No performance degradation

**Large Document:**
- Chunk count indicator
- Processing status
- No UI freezing

### Extreme Screen Sizes

**Mobile (< 640px):**
- Stacked layout
- Touch-friendly targets (44px min)
- Reduced padding but still comfortable
- Bottom sheet for snippet sources

**Tablet (640px - 1024px):**
- Side-by-side where possible
- Medium spacing
- Touch-optimized

**Desktop (> 1024px):**
- Optimal spacing
- Hover states active
- Keyboard shortcuts
- Full feature set

**Ultra-wide (> 1920px):**
- Max-width container
- Centered layout
- No stretching

### Multilingual & RTL

**Future Consideration:**
- Text expansion (German, Arabic)
- RTL layout support
- Font fallbacks

### Stress/Urgency Scenarios

**Session Expiring:**
- Soft warning (ochre, not alarming)
- Clear countdown (optional)
- Gentle reminder, not panic

**Error Recovery:**
- Calm messaging (rust accent, soft)
- Clear next steps
- No blame or frustration

---

## PHASE 10: Future-Proofing Layer

### Space for AI Personalization

- **Adaptive UI**: Earthy theme supports future personalization
- **Preference Storage**: User can adjust contrast, spacing (future)
- **Theme Variants**: Foundation for dark mode (earthy dark), high contrast

### Modular Components

- **Component System**: All components follow same design tokens
- **Easy Swapping**: Colors, spacing, typography centralized
- **Variant System**: Easy to add new variants (terracotta, sage, ochre, rust)

### Extensible Navigation Structure

- **Header System**: Ready for additional actions
- **Session Panel**: Expandable for future features
- **Message Actions**: Extensible menu system

### Adaptive Primitives

- **Button System**: Variants ready for new actions (terracotta, sage, ochre, rust)
- **Card System**: Reusable across features
- **Input System**: Consistent across forms

### Versioning Model

- **Design Tokens**: Versioned separately
- **Components**: Backward compatible
- **Migration Path**: Clear upgrade path

---

## Component-Wise Implementation Plan

### Phase 1: Foundation (Week 1)

#### 1.1 Design Tokens (`lib/constants/design-tokens.ts`)
- [ ] Replace Soft Minimal Neutrals with Earthy/Organic palette
- [ ] Update all color tokens (earth, terracotta, sage, ochre, rust, brown)
- [ ] Update shadow tokens (warm terracotta undertones)
- [ ] Update semantic colors (primary, success, warning, error)
- [ ] Export all tokens as TypeScript constants

#### 1.2 CSS Variables (`app/globals.css`)
- [ ] Replace all CSS variables with earthy/organic colors
- [ ] Update shadow definitions (warm terracotta)
- [ ] Update animations (organic, calm)
- [ ] Ensure all variables use earthy color palette

#### 1.3 Global Styles
- [ ] Update body background (cream-50)
- [ ] Update default text color (brown-900)
- [ ] Update focus states (terracotta glow)
- [ ] Update selection colors (sage green)

### Phase 2: Core Layout Components (Week 2)

#### 2.1 HomePage (`app/page.tsx`)
- [ ] Update background (cream-50)
- [ ] Update background shapes (terracotta/sage undertones, reduced opacity)
- [ ] Update role toggle (terracotta active state, warm hover)
- [ ] Update session panel (earthy styling)
- [ ] Update card containers (warm shadows, terracotta borders)

#### 2.2 ChatContainer (`components/chat/ChatContainer.tsx`)
- [ ] Update background (cream-50)
- [ ] Update border (terracotta subtle)
- [ ] Update shadow (warm terracotta)
- [ ] Update border radius (generous, organic)

#### 2.3 DocumentUpload Container
- [ ] Update card styling (warm, earthy)
- [ ] Update header (terracotta accents)
- [ ] Update spacing (generous, organic)

### Phase 3: Chat Components (Week 3)

#### 3.1 ChatMessage (`components/chat/ChatMessage.tsx`)
- [ ] **User Messages**:
  - Background: terracotta-500 (warm, inviting)
  - Text: white
  - Border radius: generous, organic (2xl with tail)
  - Shadow: warm terracotta
- [ ] **AI Messages**:
  - Background: white/cream
  - Text: brown-900 (deep earth)
  - Border: terracotta subtle
  - Border radius: generous, organic
  - Shadow: very subtle, warm
- [ ] **Avatars**: Terracotta (user), sage (AI)
- [ ] **Confidence Indicator**: Sage green (high), ochre (medium), brown (low)
- [ ] **Timestamps**: Earth brown, subtle

#### 3.2 ChatInput (`components/chat/ChatInput.tsx`)
- [ ] Background: white/cream
- [ ] Border: terracotta subtle (focus: terracotta default)
- [ ] Border radius: generous (xl)
- [ ] Focus: Warm terracotta glow (not ring)
- [ ] Shadow: Subtle, warm
- [ ] Placeholder: Earth brown, muted

#### 3.3 EmptyState (`components/chat/EmptyState.tsx`)
- [ ] Background: Transparent (inherits)
- [ ] Text: Brown-700 (warm dark)
- [ ] Suggestions: Terracotta cards with warm shadows
- [ ] Hover: Gentle elevation, warm shadow
- [ ] Icons: Terracotta/sage accents

#### 3.4 TypingIndicator (`components/chat/TypingIndicator.tsx`)
- [ ] Dots: Sage green
- [ ] Animation: Organic pulse (300ms)
- [ ] Background: Cream, subtle

#### 3.5 MessageList (`components/chat/MessageList.tsx`)
- [ ] Background: Cream-50
- [ ] Scrollbar: Terracotta accent (if custom)
- [ ] Spacing: Generous, organic

#### 3.6 SnippetSources (`components/chat/SnippetSources.tsx`)
- [ ] Container: Sage-tinted card
- [ ] Border: Terracotta subtle
- [ ] Background: Sage-50 (very light)
- [ ] Text: Brown-700
- [ ] Expand animation: Smooth, organic (sage accent)

### Phase 4: Document Upload Components (Week 4)

#### 4.1 FileDropzone (`components/document-upload/FileDropzone.tsx`)
- [ ] Background: Cream-50
- [ ] Border: Terracotta subtle (dashed on hover)
- [ ] Border radius: Generous (xl)
- [ ] Hover: Gentle elevation, terracotta border default
- [ ] Icon: Terracotta accent
- [ ] Text: Brown-700

#### 4.2 TextPasteArea (`components/document-upload/TextPasteArea.tsx`)
- [ ] Background: White/cream
- [ ] Border: Terracotta subtle
- [ ] Border radius: Generous (xl)
- [ ] Focus: Warm terracotta glow
- [ ] Placeholder: Earth brown, muted

#### 4.3 DocumentPreview (`components/document-upload/DocumentPreview.tsx`)
- [ ] Card: Warm white, terracotta border subtle
- [ ] Shadow: Warm, subtle
- [ ] Header: Terracotta accent
- [ ] Content: Brown-700 text
- [ ] Actions: Terracotta buttons

#### 4.4 ProcessingStatus (`components/document-processing/ProcessingStatus.tsx`)
- [ ] Spinner: Terracotta/sage
- [ ] Text: Brown-700
- [ ] Background: Cream, subtle

### Phase 5: Session Components (Week 5)

#### 5.1 SessionStatus (`components/session/SessionStatus.tsx`)
- [ ] Badge: Sage-50 background, sage-600 text
- [ ] Border: Sage subtle
- [ ] Border radius: Full (pill)
- [ ] Icon: Sage green

#### 5.2 ClearSessionButton (`components/session/ClearSessionButton.tsx`)
- [ ] Background: Terracotta-500 (primary)
- [ ] Hover: Terracotta-600
- [ ] Text: White
- [ ] Border radius: Generous (lg)
- [ ] Shadow: Warm, subtle

### Phase 6: UI Components (Week 6)

#### 6.1 Button (`components/ui/button/Button.tsx`)
- [ ] **Primary**: Terracotta-500, white text, warm shadow
- [ ] **Secondary**: Cream-200, brown-900 text
- [ ] **Success**: Sage-400, white text
- [ ] **Warning**: Ochre-400, brown-900 text
- [ ] **Error**: Rust-400, white text
- [ ] Hover: Gentle elevation, warm shadow
- [ ] Focus: Terracotta glow

#### 6.2 Card (`components/ui/card/Card.tsx`)
- [ ] Background: White/cream
- [ ] Border: Terracotta subtle
- [ ] Border radius: Generous (2xl)
- [ ] Shadow: Warm, subtle
- [ ] Padding: Generous (md)

#### 6.3 Input (`components/ui/input/Input.tsx`)
- [ ] Background: White/cream
- [ ] Border: Terracotta subtle
- [ ] Border radius: Generous (lg)
- [ ] Focus: Warm terracotta glow
- [ ] Placeholder: Earth brown, muted

#### 6.4 LoadingSpinner (`components/ui/loading/LoadingSpinner.tsx`)
- [ ] Color: Terracotta-500
- [ ] Animation: Organic, smooth
- [ ] Size: Appropriate for context

### Phase 7: Supporting Components (Week 7)

#### 7.1 RoleCard (`components/role-selection/RoleCard.tsx`)
- [ ] Background: White/cream
- [ ] Border: Terracotta subtle
- [ ] Hover: Gentle elevation, terracotta border default
- [ ] Icon: Terracotta accent
- [ ] Text: Brown-900

#### 7.2 MessageActions (`components/chat/MessageActions.tsx`)
- [ ] Menu: Cream background, terracotta border
- [ ] Items: Brown-700 text, terracotta hover
- [ ] Icons: Terracotta/sage accents

#### 7.3 ScrollToBottomButton (`components/chat/ScrollToBottomButton.tsx`)
- [ ] Background: Terracotta-500
- [ ] Hover: Terracotta-600
- [ ] Icon: White
- [ ] Shadow: Warm, subtle

### Phase 8: Polish & Accessibility (Week 8)

#### 8.1 Accessibility Audit
- [ ] Test all contrast ratios (WCAG AA)
- [ ] Verify keyboard navigation
- [ ] Test with screen readers
- [ ] Ensure focus indicators (terracotta glow)

#### 8.2 Visual Polish
- [ ] Review all components for consistency
- [ ] Fine-tune spacing and typography
- [ ] Add missing hover/focus states
- [ ] Ensure warm shadows everywhere

#### 8.3 Animation Refinement
- [ ] Smooth all transitions (300-400ms)
- [ ] Ensure organic feel
- [ ] Test on slower devices
- [ ] Add reduced-motion support

---

## Component-Specific Design Specs

### ChatContainer

**Background**: `earth-cream-50` (warm cream)
**Border**: `terracotta-subtle` (1px, 12% opacity)
**Shadow**: `shadow-sm` (warm terracotta)
**Padding**: `p-4` (16px) on mobile, `p-6` (24px) on desktop
**Border Radius**: `rounded-2xl` (24px, organic)

### ChatMessage

**User Message:**
- Background: `terracotta-500` (warm, inviting)
- Text: `white`
- Border Radius: `rounded-2xl rounded-tr-sm` (organic, with tail)
- Shadow: `shadow-sm` (warm)
- Padding: `px-4 py-3`

**AI Message:**
- Background: `white` or `cream-50`
- Text: `brown-900` (deep earth)
- Border: `terracotta-subtle` (1px)
- Border Radius: `rounded-2xl rounded-tl-sm` (organic, with tail)
- Shadow: `shadow-xs` (very subtle, warm)

### EmptyState

**Background**: Transparent (inherits from container)
**Text**: `brown-700` (warm dark)
**Suggestions**: Terracotta cards with `terracotta-100` background, `terracotta-subtle` border
**Hover**: Gentle elevation (`shadow-sm`, warm)
**Padding**: `p-6` (24px)

### ChatInput

**Background**: `white` or `cream-50`
**Border**: `terracotta-subtle` (focus: `terracotta-default`)
**Border Radius**: `rounded-xl` (16px, organic)
**Padding**: `px-4 py-3`
**Focus**: Warm terracotta glow (not ring), `shadow-sm`
**Shadow**: `shadow-xs` (subtle elevation, warm)

### SnippetSources

**Container**: Sage-tinted card with `sage-50` background
**Border**: `terracotta-subtle`
**Border Radius**: `rounded-lg` (12px)
**Padding**: `p-3`
**Expand Animation**: Smooth accordion (300ms ease-in-out, sage accent)

### DocumentUpload

**Dropzone**: 
- Background: `cream-50`
- Border: `terracotta-subtle` (dashed on hover)
- Border Radius: `rounded-xl` (16px, organic)
- Hover: Gentle elevation, `terracotta-default` border
- Icon: `terracotta-500`

### SessionStatus

**Badge**: 
- Background: `sage-50` (very light sage)
- Text: `sage-600`
- Border: `terracotta-subtle`
- Border Radius: `rounded-full`
- Padding: `px-3 py-1`

---

## Accessibility Checklist

- [ ] All text meets WCAG AA contrast (4.5:1)
- [ ] Focus indicators visible (terracotta glow, clear)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader labels on all icons and buttons
- [ ] ARIA live regions for dynamic content
- [ ] Color not the only indicator (icons + text)
- [ ] Touch targets minimum 44x44px
- [ ] No motion for users who prefer reduced motion

---

## Success Criteria

### Visual Quality
- ✅ Warm, earthy appearance (user testing)
- ✅ Clear visual hierarchy (eye-tracking test)
- ✅ Consistent spacing and typography (design audit)
- ✅ Organic color usage (brand alignment)

### UX Quality
- ✅ Intuitive user flows (task completion > 90%)
- ✅ Engaging empty state (click-through > 60%)
- ✅ Clear feedback for all actions (user testing)
- ✅ Smooth animations (60fps, no jank)

### Accessibility
- ✅ WCAG 2.1 AA compliance (automated + manual)
- ✅ Full keyboard navigation (testing)
- ✅ Screen reader friendly (NVDA/JAWS testing)
- ✅ High contrast support (testing)

### Code Quality
- ✅ Clean, modular components (code review)
- ✅ Proper TypeScript types (type coverage > 95%)
- ✅ Reusable patterns (DRY principle)
- ✅ Well-documented code (JSDoc coverage)

---

## Implementation Priority

### High Priority (Weeks 1-4)
1. Design tokens & CSS variables
2. HomePage layout
3. ChatContainer & ChatMessage
4. ChatInput & EmptyState
5. DocumentUpload components

### Medium Priority (Weeks 5-6)
6. Session components
7. UI components (Button, Card, Input)
8. Supporting components (RoleCard, MessageActions)

### Low Priority (Weeks 7-8)
9. Polish & refinement
10. Accessibility audit
11. Animation refinement
12. Documentation

---

## Conclusion

This Earthy / Organic Systems + Soft Minimalism design system transforms ResumeLens into a warm, grounded, nature-inspired workspace that feels organic and calming while maintaining full functionality. The design prioritizes warmth, accessibility, and emotional comfort, creating a premium experience that users will trust and enjoy.

**Next Steps**: Begin Phase 1 implementation with design tokens and foundation updates.

