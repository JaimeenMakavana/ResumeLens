# State Management Guide - ResumeLens

**Purpose**: This document defines the state management architecture, patterns, and conventions for ResumeLens. Use this guide when generating code to ensure consistent state handling across the application.

---

## Architecture Overview

### State Management Strategy

- **Primary**: React Hooks (`useState`, `useReducer`, `useContext`) for component-local and shared UI state
- **Secondary**: Zustand stores for complex cross-component state (session, document processing, chat)
- **Server State**: React Query (optional) for API state management if needed
- **Form State**: React Hook Form for document upload and form inputs

### State Categories

1. **UI State** - Component-local UI interactions (modals, dropdowns, loading states)
2. **Session State** - Ephemeral session data (sessionId, expiration, metadata)
3. **Document State** - Uploaded document data, extracted text, processing status
4. **Chat State** - Conversation history, messages, streaming status
5. **RAG State** - Embeddings, chunks, retrieval results (managed server-side, synced to client)

---

## State Management Patterns

### Pattern 1: Component-Local State (useState)

**When to Use:**

- Simple UI interactions (toggle, open/close, input values)
- Component-scoped state that doesn't need sharing
- Temporary UI feedback (loading spinners, error messages)

**Example:**

```typescript
// Component-local UI state
const [isModalOpen, setIsModalOpen] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);
const [error, setError] = useState<string | null>(null);
```

**Cursor Guidelines:**

- Use `useState` for simple boolean, string, number, or object state
- Keep state as close to where it's used as possible
- Prefer derived state over storing redundant values

---

### Pattern 2: Complex Local State (useReducer)

**When to Use:**

- State with multiple related values
- Complex state transitions
- State that follows predictable patterns (finite state machines)

**Example:**

```typescript
type DocumentState =
  | { status: "idle" }
  | { status: "uploading"; progress: number }
  | { status: "processing"; text: string }
  | { status: "ready"; text: string; chunks: Chunk[] }
  | { status: "error"; error: string };

const documentReducer = (
  state: DocumentState,
  action: DocumentAction
): DocumentState => {
  switch (action.type) {
    case "UPLOAD_START":
      return { status: "uploading", progress: 0 };
    case "UPLOAD_PROGRESS":
      return { status: "uploading", progress: action.progress };
    case "PROCESSING":
      return { status: "processing", text: action.text };
    case "READY":
      return { status: "ready", text: action.text, chunks: action.chunks };
    case "ERROR":
      return { status: "error", error: action.error };
    default:
      return state;
  }
};
```

**Cursor Guidelines:**

- Use `useReducer` when state has 3+ related fields or complex transitions
- Define action types as discriminated unions for type safety
- Keep reducers pure and testable

---

### Pattern 3: Zustand Store (Cross-Component State)

**When to Use:**

- State shared across multiple components
- Session management
- Document state that persists across navigation
- Chat history
- Complex state with derived values

**Store Structure:**

```typescript
// stores/sessionStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SessionState {
  sessionId: string | null;
  expiresAt: number | null;
  sourceType: "resume" | "jd" | null;

  // Actions
  createSession: (sourceType: "resume" | "jd") => Promise<string>;
  clearSession: () => void;
  isExpired: () => boolean;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    (set, get) => ({
      sessionId: null,
      expiresAt: null,
      sourceType: null,

      createSession: async (sourceType) => {
        const response = await fetch("/api/session/create", {
          method: "POST",
          body: JSON.stringify({ sourceType }),
        });
        const { sessionId, expiresAt } = await response.json();
        set({ sessionId, expiresAt, sourceType });
        return sessionId;
      },

      clearSession: () => {
        set({ sessionId: null, expiresAt: null, sourceType: null });
      },

      isExpired: () => {
        const { expiresAt } = get();
        return expiresAt ? Date.now() > expiresAt : true;
      },
    }),
    { name: "SessionStore" }
  )
);
```

**Cursor Guidelines:**

- Create Zustand stores in `stores/` directory
- Use TypeScript interfaces for state shape
- Separate state and actions clearly
- Use `devtools` middleware in development
- Use `persist` middleware ONLY for non-sensitive UI preferences (not session data)
- Keep stores focused on a single domain (session, document, chat)

---

### Pattern 4: Context API (Theme, Auth, App Config)

**When to Use:**

- App-wide configuration (theme, language)
- Deeply nested component trees where prop drilling is cumbersome
- Values that rarely change

**Example:**

```typescript
// contexts/AppContext.tsx
interface AppContextValue {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};
```

**Cursor Guidelines:**

- Use Context for truly app-wide values
- Prefer Zustand over Context for complex state
- Always provide default values and error boundaries

---

## State Structure Definitions

### Session State

```typescript
interface SessionState {
  sessionId: string | null;
  expiresAt: number | null; // Unix timestamp
  sourceType: "resume" | "jd" | null;
  createdAt: number | null;

  // Computed
  isActive: boolean;
  timeRemaining: number; // milliseconds
}
```

**Store Location**: `stores/sessionStore.ts`

---

### Document State

```typescript
interface DocumentState {
  // Upload state
  file: File | null;
  fileName: string | null;
  fileType: "pdf" | "docx" | null;

  // Processing state
  status: "idle" | "extracting" | "chunking" | "embedding" | "ready" | "error";
  progress: number; // 0-100

  // Extracted content
  rawText: string | null;
  chunks: Chunk[] | null;
  chunkCount: number;

  // Metadata
  uploadDate: number | null;
  processingTime: number | null; // milliseconds

  // Error handling
  error: string | null;
}

interface Chunk {
  id: string;
  text: string;
  index: number;
  metadata: {
    section?: string;
    pageNumber?: number;
    sourceType: "resume" | "jd";
  };
}
```

**Store Location**: `stores/documentStore.ts`

---

### Chat State

```typescript
interface ChatState {
  messages: Message[];
  isStreaming: boolean;
  currentQuery: string;
  error: string | null;

  // RAG context
  retrievedChunks: Chunk[] | null;
  confidence: number | null;

  // UI state
  inputDisabled: boolean;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  chunksUsed?: string[]; // Chunk IDs referenced
  confidence?: number;
}
```

**Store Location**: `stores/chatStore.ts`

---

### UI State (Component-Local)

```typescript
// Modal state
interface ModalState {
  isOpen: boolean;
  type: "upload" | "settings" | "help" | null;
}

// Upload component state
interface UploadState {
  isDragging: boolean;
  isUploading: boolean;
  progress: number;
  error: string | null;
}

// Chat input state
interface ChatInputState {
  value: string;
  isDisabled: boolean;
  placeholder: string;
}
```

**Location**: Component-local with `useState` or `useReducer`

---

## State Update Patterns

### Pattern 1: Optimistic Updates

**When**: UI interactions that should feel instant (message sending, file selection)

```typescript
// Optimistic message send
const sendMessage = async (content: string) => {
  const tempId = `temp-${Date.now()}`;
  const tempMessage: Message = {
    id: tempId,
    role: "user",
    content,
    timestamp: Date.now(),
  };

  // Optimistic update
  setMessages((prev) => [...prev, tempMessage]);
  setCurrentQuery("");

  try {
    const response = await fetch("/api/session/chat", {
      method: "POST",
      body: JSON.stringify({ query: content }),
    });
    const data = await response.json();

    // Replace temp message with real response
    setMessages((prev) => [
      ...prev.filter((m) => m.id !== tempId),
      { ...tempMessage, id: data.messageId },
      data.assistantMessage,
    ]);
  } catch (error) {
    // Rollback on error
    setMessages((prev) => prev.filter((m) => m.id !== tempId));
    setError("Failed to send message");
  }
};
```

**Cursor Guidelines:**

- Use optimistic updates for user-initiated actions
- Always provide error handling and rollback
- Show loading states during async operations

---

### Pattern 2: Server State Synchronization

**When**: State that originates from or must sync with server

```typescript
// Sync session state with server
const syncSession = async () => {
  const sessionStore = useSessionStore.getState();
  if (!sessionStore.sessionId) return;

  try {
    const response = await fetch(`/api/session/${sessionStore.sessionId}`);
    const data = await response.json();

    // Update store with server state
    useSessionStore.setState({
      expiresAt: data.expiresAt,
      sourceType: data.sourceType,
    });
  } catch (error) {
    // Handle sync failure
    if (error.status === 404) {
      useSessionStore.getState().clearSession();
    }
  }
};
```

**Cursor Guidelines:**

- Sync critical state (session) on mount and before critical operations
- Handle sync failures gracefully
- Don't sync on every render - use intervals or event-driven sync

---

### Pattern 3: Derived State

**When**: State computed from other state

```typescript
// Derived state using Zustand selectors
const isSessionActive = useSessionStore(
  (state) => state.sessionId !== null && !state.isExpired()
);

const canStartChat = useDocumentStore(
  (state) => state.status === "ready" && state.chunks !== null
);

// Derived in component
const chatEnabled = isSessionActive && canStartChat;
```

**Cursor Guidelines:**

- Use Zustand selectors to prevent unnecessary re-renders
- Compute derived state in selectors, not in components
- Memoize expensive computations with `useMemo` if needed

---

## State Initialization & Cleanup

### Pattern 1: Store Initialization

```typescript
// Initialize stores on app mount
// app/layout.tsx or app/providers.tsx
export default function RootLayout({ children }) {
  useEffect(() => {
    // Initialize session check
    const sessionStore = useSessionStore.getState();
    if (sessionStore.sessionId && sessionStore.isExpired()) {
      sessionStore.clearSession();
    }
  }, []);

  return <>{children}</>;
}
```

### Pattern 2: Cleanup on Unmount

```typescript
// Component cleanup
useEffect(() => {
  return () => {
    // Cleanup subscriptions, timers, etc.
    // Note: Zustand stores persist, so only clean component-specific state
  };
}, []);
```

### Pattern 3: Session Cleanup

```typescript
// Auto-cleanup expired sessions
useEffect(() => {
  const interval = setInterval(() => {
    const sessionStore = useSessionStore.getState();
    if (sessionStore.isExpired()) {
      sessionStore.clearSession();
      useDocumentStore.getState().reset();
      useChatStore.getState().reset();
    }
  }, 60000); // Check every minute

  return () => clearInterval(interval);
}, []);
```

**Cursor Guidelines:**

- Initialize stores in root layout or providers
- Clean up component-specific state in `useEffect` cleanup
- Implement session expiration checks
- Reset related stores when session clears

---

## Error Handling Patterns

### Pattern 1: Error State in Stores

```typescript
interface StoreWithError {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Usage in store
const useDocumentStore = create<DocumentState & StoreWithError>()((set) => ({
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  // ... other state
}));
```

### Pattern 2: Error Boundaries

```typescript
// Error boundary for state-related crashes
class StateErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error service
    console.error("State error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          onReset={() => {
            // Reset all stores
            useSessionStore.getState().clearSession();
            useDocumentStore.getState().reset();
            useChatStore.getState().reset();
            this.setState({ hasError: false });
          }}
        />
      );
    }
    return this.props.children;
  }
}
```

**Cursor Guidelines:**

- Include error state in stores that perform async operations
- Provide error clearing methods
- Use error boundaries for catastrophic failures
- Display user-friendly error messages

---

## Code Generation Guidelines for Cursor

### When Generating Component Code

1. **Identify State Category**

   - UI-only → `useState` or `useReducer`
   - Shared across components → Zustand store
   - App-wide config → Context API

2. **State Structure**

   - Define TypeScript interfaces for all state
   - Use discriminated unions for status states
   - Keep state flat when possible (avoid deep nesting)

3. **State Updates**

   - Use immutable updates (spread operator, immer if complex)
   - Batch related updates
   - Use optimistic updates for user actions

4. **Store Creation**

   - Create stores in `stores/` directory
   - Export typed hooks: `export const useXStore = create<XState>()(...)`
   - Include devtools middleware in development
   - Add JSDoc comments for complex actions

5. **Component Integration**
   - Use Zustand selectors to prevent unnecessary re-renders
   - Extract store logic into custom hooks if complex
   - Handle loading and error states explicitly

### Example: Generating a Document Upload Component

```typescript
// ✅ CORRECT: Uses document store + local UI state
'use client';

import { useDocumentStore } from '@/stores/documentStore';
import { useSessionStore } from '@/stores/sessionStore';
import { useState } from 'react';

export function DocumentUpload() {
  // Shared state from store
  const { file, status, uploadDocument } = useDocumentStore();
  const { sessionId, createSession } = useSessionStore();

  // Local UI state
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleDrop = async (droppedFile: File) => {
    setLocalError(null);

    // Ensure session exists
    if (!sessionId) {
      await createSession('resume');
    }

    // Upload document
    await uploadDocument(droppedFile);
  };

  return (
    // Component JSX
  );
}
```

### Example: Generating a Chat Component

```typescript
// ✅ CORRECT: Uses chat store with proper selectors
'use client';

import { useChatStore } from '@/stores/chatStore';
import { useDocumentStore } from '@/stores/documentStore';
import { useSessionStore } from '@/stores/sessionStore';

export function ChatInterface() {
  // Selective subscriptions to prevent re-renders
  const messages = useChatStore((state) => state.messages);
  const isStreaming = useChatStore((state) => state.isStreaming);
  const sendMessage = useChatStore((state) => state.sendMessage);

  const canChat = useDocumentStore((state) => state.status === 'ready');
  const isSessionActive = useSessionStore((state) => state.sessionId !== null);

  const handleSend = async (content: string) => {
    if (!canChat || !isSessionActive) return;
    await sendMessage(content);
  };

  return (
    // Component JSX
  );
}
```

---

## Store File Structure

```
stores/
  ├── sessionStore.ts      # Session management
  ├── documentStore.ts     # Document upload & processing
  ├── chatStore.ts         # Chat messages & RAG
  ├── uiStore.ts           # Global UI state (optional)
  └── index.ts             # Re-exports for convenience
```

---

## Best Practices Summary

1. **State Location**

   - Component-local → `useState`/`useReducer`
   - Shared → Zustand store
   - App config → Context

2. **Type Safety**

   - Always define TypeScript interfaces
   - Use discriminated unions for status states
   - Type store actions and selectors

3. **Performance**

   - Use Zustand selectors to prevent unnecessary re-renders
   - Memoize expensive computations
   - Batch state updates when possible

4. **Error Handling**

   - Include error state in stores
   - Provide error clearing methods
   - Use error boundaries for crashes

5. **Cleanup**

   - Reset stores on session expiration
   - Clean up component subscriptions
   - Clear timers and intervals

6. **Testing**
   - Keep stores pure and testable
   - Test state transitions
   - Mock stores in component tests

---

## Migration Path

### Phase 1: Start with Hooks

- Use `useState` for component-local state
- Use `useReducer` for complex local state

### Phase 2: Add Zustand for Shared State

- Create `sessionStore` first
- Add `documentStore` when document processing is needed
- Add `chatStore` for chat functionality

### Phase 3: Optimize

- Add selectors to prevent re-renders
- Implement derived state
- Add error boundaries

---

## Quick Reference

| State Type    | Tool         | Location                  | Example                                   |
| ------------- | ------------ | ------------------------- | ----------------------------------------- |
| Toggle, input | `useState`   | Component                 | `const [open, setOpen] = useState(false)` |
| Complex local | `useReducer` | Component                 | Document processing state machine         |
| Session data  | Zustand      | `stores/sessionStore.ts`  | Session ID, expiration                    |
| Document data | Zustand      | `stores/documentStore.ts` | File, text, chunks                        |
| Chat data     | Zustand      | `stores/chatStore.ts`     | Messages, streaming                       |
| Theme, config | Context      | `contexts/AppContext.tsx` | Theme, language                           |

---

**Note**: This guide should be referenced when generating any component or store code. Always prefer the simplest solution that meets requirements, and upgrade to more complex patterns only when needed.
