# Frontend Architecture & Folder Structure - ResumeLens

**Purpose**: This document defines the frontend folder structure, component organization, and architectural patterns for the ResumeLens Next.js application.

---

## Root Project Structure

```
ResumeLens/
├── frontend/                      # Next.js application (root)
│   ├── app/                       # Next.js App Router directory
│   ├── components/                # Shared React components
│   ├── lib/                       # Utility functions and helpers
│   ├── hooks/                     # Custom React hooks
│   ├── types/                     # TypeScript type definitions
│   ├── stores/                    # State management (Zustand stores if needed)
│   ├── services/                  # API service layer
│   ├── utils/                     # Pure utility functions
│   ├── styles/                    # Global styles
│   ├── public/                    # Static assets
│   ├── __tests__/                 # Test utilities and mocks
│   └── config/                    # Configuration files
│
├── python-service/                # Python FastAPI service (separate)
│   └── ...
│
├── PRD.md                         # Product requirements
├── TECH_STACK.md                  # Tech stack guide
├── frontend.md                    # This file
└── README.md                      # Project overview
```

---

## Frontend Folder Structure (Detailed)

```
frontend/
│
├── app/                           # Next.js App Router (src directory pattern)
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Landing/role selection page
│   ├── globals.css                # Global Tailwind CSS
│   ├── loading.tsx                # Global loading UI
│   ├── error.tsx                  # Global error boundary
│   │
│   ├── (auth)/                    # Route group (optional grouping)
│   │
│   ├── recruiter/                 # Recruiter flow pages
│   │   ├── layout.tsx             # Recruiter layout
│   │   ├── page.tsx               # Document upload page
│   │   └── chat/                  # Chat interface
│   │       └── page.tsx           # Chat page
│   │
│   ├── job-seeker/                # Job seeker flow pages
│   │   ├── layout.tsx             # Job seeker layout
│   │   ├── page.tsx               # JD upload/paste page
│   │   └── chat/                  # Chat interface
│   │       └── page.tsx           # Chat page
│   │
│   └── api/                       # Next.js API Routes
│       └── session/               # Session management endpoints
│           ├── create/
│           │   └── route.ts       # POST /api/session/create
│           ├── upload/
│           │   └── route.ts       # POST /api/session/upload
│           ├── embed/
│           │   └── route.ts       # POST /api/session/embed
│           ├── chat/
│           │   └── route.ts       # POST /api/session/chat
│           └── [id]/
│               ├── route.ts       # DELETE /api/session/[id]
│               └── route.ts       # GET /api/session/[id] (optional)
│
├── components/                    # React components
│   ├── ui/                        # Base UI components (reusable)
│   │   ├── button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── input/
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── card/
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── loading/
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── index.ts
│   │   └── index.ts               # Barrel export for ui components
│   │
│   ├── layout/                    # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   │
│   ├── role-selection/            # Role selection screen
│   │   ├── RoleSelection.tsx
│   │   ├── RoleCard.tsx
│   │   └── index.ts
│   │
│   ├── document-upload/           # Document upload components
│   │   ├── DocumentUpload.tsx
│   │   ├── FileDropzone.tsx
│   │   ├── TextPasteArea.tsx
│   │   ├── DocumentPreview.tsx
│   │   └── index.ts
│   │
│   ├── chat/                      # Chat interface components
│   │   ├── ChatContainer.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── MessageList.tsx
│   │   ├── SnippetSources.tsx     # Collapsible snippet citations
│   │   ├── TypingIndicator.tsx
│   │   └── index.ts
│   │
│   ├── document-processing/       # Document processing UI
│   │   ├── ProcessingStatus.tsx
│   │   ├── ChunkPreview.tsx       # Optional chunk preview
│   │   └── index.ts
│   │
│   ├── session/                   # Session management components
│   │   ├── SessionStatus.tsx
│   │   ├── ClearSessionButton.tsx
│   │   └── index.ts
│   │
│   └── index.ts                   # Barrel export for all components
│
├── lib/                           # Core libraries and configs
│   ├── document-processors/       # Client-side document extraction
│   │   ├── pdf-extractor.ts       # PDF.js wrapper
│   │   ├── docx-extractor.ts      # mammoth.js wrapper
│   │   ├── text-cleaner.ts        # Text normalization utilities
│   │   └── index.ts
│   │
│   ├── api/                       # API client utilities
│   │   ├── client.ts              # Axios/fetch instance
│   │   ├── endpoints.ts           # API endpoint constants
│   │   └── interceptors.ts        # Request/response interceptors
│   │
│   ├── session/                   # Session management utilities
│   │   ├── session-storage.ts     # localStorage wrapper for sessionId
│   │   ├── session-validator.ts   # Session validation
│   │   └── index.ts
│   │
│   └── constants/                 # App constants
│       ├── config.ts              # App configuration
│       ├── routes.ts              # Route paths
│       └── index.ts
│
├── hooks/                         # Custom React hooks
│   ├── useSession.ts              # Session management hook
│   ├── useDocumentUpload.ts       # Document upload logic
│   ├── useChat.ts                 # Chat interface logic
│   ├── useDocumentProcessor.ts    # Document processing hook
│   ├── useDebounce.ts             # Debounce utility hook
│   └── index.ts                   # Barrel export
│
├── services/                      # API service layer
│   ├── session.service.ts         # Session API calls
│   ├── document.service.ts        # Document upload/processing
│   ├── chat.service.ts            # Chat/RAG API calls
│   └── python-service.client.ts   # Python FastAPI client proxy
│
├── stores/                        # State management (Zustand if needed)
│   ├── session.store.ts           # Session state
│   ├── chat.store.ts              # Chat messages state
│   ├── document.store.ts          # Document state
│   └── index.ts
│
├── types/                         # TypeScript type definitions
│   ├── session.types.ts           # Session-related types
│   ├── document.types.ts          # Document types
│   ├── chat.types.ts              # Chat message types
│   ├── api.types.ts               # API request/response types
│   └── index.ts                   # Barrel export
│
├── utils/                         # Pure utility functions
│   ├── format.ts                  # Formatting utilities
│   ├── validation.ts              # Validation functions
│   ├── date.ts                    # Date utilities
│   └── index.ts
│
├── styles/                        # Additional styles
│   ├── animations.css             # Animation keyframes
│   └── custom.css                 # Custom CSS (if needed)
│
├── public/                        # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   └── ...
│   ├── icons/
│   └── fonts/                     # Custom fonts (if any)
│
├── __tests__/                     # Test utilities and mocks
│   ├── setup.ts                   # Test setup
│   ├── mocks/
│   │   ├── api.mock.ts
│   │   └── document.mock.ts
│   └── utils/
│       └── test-utils.tsx         # Testing utilities
│
├── config/                        # Configuration files
│   ├── env.ts                     # Environment variables config
│   └── tailwind.config.ts         # Tailwind configuration
│
├── .env.local                     # Local environment variables
├── .env.example                   # Environment variables template
├── .gitignore
├── next.config.js                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS config
├── postcss.config.js              # PostCSS config
├── package.json
└── README.md                      # Frontend-specific README
```

---

## Component Organization Principles

### 1. Feature-Based Component Grouping

Components are organized by feature/domain:

- `components/role-selection/` - Role selection UI
- `components/document-upload/` - Document handling
- `components/chat/` - Chat interface
- `components/session/` - Session management UI

### 2. Reusable UI Components

Base UI components live in `components/ui/`:

- Buttons, inputs, cards, loading states
- Follow compound component pattern if needed
- Export via index.ts for clean imports

### 3. Barrel Exports

Use index.ts files for clean imports:

```typescript
// components/ui/index.ts
export { Button } from './button';
export { Input } from './input';
export { Card } from './card';

// Usage: import { Button, Input } from '@/components/ui';
```

---

## File Naming Conventions

### Components
- **PascalCase** for component files: `ChatMessage.tsx`, `DocumentUpload.tsx`
- **index.ts** for barrel exports: `components/chat/index.ts`

### Utilities & Services
- **camelCase** for utility files: `text-cleaner.ts`, `session-storage.ts`
- **kebab-case** for file names with multiple words: `document-processor.ts`

### Types
- **PascalCase** with `.types.ts` suffix: `session.types.ts`, `chat.types.ts`

### Hooks
- **camelCase** with `use` prefix: `useSession.ts`, `useChat.ts`

### API Routes
- **route.ts** in Next.js App Router: `app/api/session/create/route.ts`

---

## Key Directory Explanations

### `/app` - Next.js App Router

- **Layout-based routing**: Each route can have its own layout
- **Server Components by default**: Use 'use client' directive when needed
- **API Routes**: `app/api/*/route.ts` for backend endpoints

**Key Files:**
- `app/layout.tsx` - Root layout with providers, metadata
- `app/page.tsx` - Landing page (role selection)
- `app/recruiter/page.tsx` - Recruiter document upload
- `app/recruiter/chat/page.tsx` - Recruiter chat interface
- `app/api/session/*/route.ts` - Session management API

### `/components` - React Components

**UI Components (`components/ui/`):**
- Reusable, unstyled or styled with Tailwind
- No business logic, pure presentation
- Example: `Button`, `Input`, `Card`, `LoadingSpinner`

**Feature Components:**
- Domain-specific components with business logic
- Example: `DocumentUpload`, `ChatContainer`, `RoleSelection`

### `/lib` - Core Libraries

**Document Processors (`lib/document-processors/`):**
- PDF.js wrapper for PDF extraction
- mammoth.js wrapper for DOCX extraction
- Text cleaning and normalization utilities

**API Client (`lib/api/`):**
- Centralized HTTP client configuration
- API endpoint constants
- Request/response interceptors

### `/hooks` - Custom React Hooks

Encapsulate reusable stateful logic:

- `useSession` - Session ID management, session validation
- `useDocumentUpload` - File upload, document processing state
- `useChat` - Chat messages, sending messages, loading states
- `useDocumentProcessor` - Client-side text extraction and cleaning

### `/services` - API Service Layer

Abstraction layer for API calls:

- `session.service.ts` - Session CRUD operations
- `document.service.ts` - Document upload and processing
- `chat.service.ts` - Chat/RAG query endpoints
- `python-service.client.ts` - Python FastAPI client wrapper

### `/types` - TypeScript Types

Centralized type definitions:

- `session.types.ts` - Session data structures
- `document.types.ts` - Document metadata, chunk types
- `chat.types.ts` - Message types, RAG response types
- `api.types.ts` - API request/response types

### `/stores` - State Management (Optional)

If Zustand is needed for complex state:

- `session.store.ts` - Global session state
- `chat.store.ts` - Chat messages, history
- `document.store.ts` - Current document state

**Note**: Start with React hooks (useState, useReducer). Add Zustand only if prop drilling becomes problematic.

---

## Import Path Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/types/*": ["./types/*"],
      "@/services/*": ["./services/*"],
      "@/utils/*": ["./utils/*"],
      "@/stores/*": ["./stores/*"]
    }
  }
}
```

**Usage:**
```typescript
import { Button } from '@/components/ui';
import { useSession } from '@/hooks';
import { SessionType } from '@/types';
import { sessionService } from '@/services';
```

---

## Component Patterns

### 1. Server vs Client Components

**Default: Server Components** (Next.js App Router)
- Use for data fetching, static content
- No 'use client' directive needed

**Client Components** (add 'use client')
- Interactive components (hooks, event handlers)
- Browser APIs (localStorage, window)
- Third-party libraries requiring client-side

**Example:**
```typescript
// app/page.tsx (Server Component)
import RoleSelection from '@/components/role-selection/RoleSelection';

export default function HomePage() {
  return <RoleSelection />;
}
```

```typescript
// components/role-selection/RoleSelection.tsx (Client Component)
'use client';

import { useState } from 'react';

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  // ... interactive logic
}
```

### 2. Component Composition

Prefer composition over complex prop drilling:

```typescript
// Good: Composed components
<ChatContainer>
  <MessageList messages={messages} />
  <ChatInput onSend={handleSend} />
  <SnippetSources sources={sources} />
</ChatContainer>
```

### 3. Separation of Concerns

- **Components**: UI and presentation
- **Hooks**: Stateful logic and side effects
- **Services**: API calls and data fetching
- **Utils**: Pure utility functions

---

## API Route Structure

### Session Management API Routes

```
app/api/session/
├── create/
│   └── route.ts          # POST - Create new session
├── upload/
│   └── route.ts          # POST - Upload/process document
├── embed/
│   └── route.ts          # POST - Generate embeddings
├── chat/
│   └── route.ts          # POST - Send chat query
└── [id]/
    └── route.ts          # DELETE - Clear session
```

**Example Route:**
```typescript
// app/api/session/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pythonServiceClient } from '@/lib/api/python-service';

export async function POST(request: NextRequest) {
  try {
    const sessionId = await pythonServiceClient.createSession();
    return NextResponse.json({ sessionId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
```

---

## State Management Strategy

### Phase 1: React Hooks (Start Here)

- `useState` for local component state
- `useReducer` for complex local state
- `useContext` for shared state (session, theme)

### Phase 2: Zustand (If Needed)

Add when:
- Prop drilling becomes excessive
- Need global state across many components
- Complex state synchronization required

**Example Store:**
```typescript
// stores/session.store.ts
import { create } from 'zustand';

interface SessionStore {
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  sessionId: null,
  setSessionId: (id) => set({ sessionId: id }),
}));
```

---

## Environment Variables

### `.env.local` (not committed)

```env
# Next.js Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_PYTHON_SERVICE_URL=http://localhost:8000

# Optional: Feature flags
NEXT_PUBLIC_ENABLE_CHUNK_PREVIEW=false
```

### Usage in Code

```typescript
// lib/constants/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  pythonServiceUrl: process.env.NEXT_PUBLIC_PYTHON_SERVICE_URL || 'http://localhost:8000',
};
```

---

## Styling Approach

### Tailwind CSS (Primary)

- Utility-first CSS framework
- Configure in `tailwind.config.ts`
- Use component classes for reuse

### Global Styles

- `app/globals.css` - Tailwind directives and global styles
- `styles/animations.css` - Custom animations
- `styles/custom.css` - Custom CSS (minimal use)

### Component Styling Pattern

```typescript
// Use Tailwind classes directly
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Submit
</button>

// Or extract to constants for reuse
const buttonStyles = "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600";
```

---

## Testing Structure

### Test Files Location

- Co-locate with components: `Button.test.tsx` next to `Button.tsx`
- Or in `__tests__/` directory: `__tests__/components/Button.test.tsx`

### Testing Tools

- **Vitest** or **Jest** - Test runner
- **React Testing Library** - Component testing
- **MSW** (Mock Service Worker) - API mocking

---

## Development Workflow

### 1. Create Component Structure

```bash
components/feature-name/
├── FeatureName.tsx
├── FeatureName.test.tsx
└── index.ts
```

### 2. Define Types First

```typescript
// types/feature.types.ts
export interface FeatureData {
  id: string;
  name: string;
}
```

### 3. Build Hook for Logic

```typescript
// hooks/useFeature.ts
export function useFeature() {
  // State and logic
}
```

### 4. Implement Component

```typescript
// components/feature/FeatureName.tsx
'use client';

import { useFeature } from '@/hooks';

export default function FeatureName() {
  const { data, loading } = useFeature();
  // ... render
}
```

---

## Key Architectural Decisions

1. **App Router over Pages Router**: Modern Next.js routing with layouts
2. **Server Components by Default**: Optimize for performance
3. **Client-Side Document Extraction**: Privacy-first approach
4. **Minimal State Management**: Start with hooks, add Zustand only if needed
5. **TypeScript Strict Mode**: Type safety throughout
6. **Barrel Exports**: Clean import paths
7. **Feature-Based Organization**: Group by domain, not by file type

---

## Code Organization Best Practices

### Do's ✅

- Keep components small and focused
- Extract reusable logic to hooks
- Use TypeScript types consistently
- Follow naming conventions
- Use path aliases for clean imports
- Co-locate related files (component + test + types)

### Don'ts ❌

- Don't mix UI and business logic in components
- Don't create deep folder nesting (max 3-4 levels)
- Don't use 'any' types
- Don't skip error boundaries
- Don't forget to handle loading and error states

---

## Next Steps

1. Initialize Next.js project with TypeScript
2. Configure Tailwind CSS
3. Set up path aliases in tsconfig.json
4. Create base UI components (`components/ui/`)
5. Implement role selection page (`app/page.tsx`)
6. Build document upload components
7. Create API routes for session management
8. Implement chat interface

---

**Note**: This structure prioritizes clarity, maintainability, and learning. Adjust as needed based on project evolution while maintaining these core principles.

