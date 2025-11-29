# ResumeLens - UX Flow Map & UI Component System Documentation

**Version:** 1.0  
**Last Updated:** 2024  
**Project:** ResumeLens - Ephemeral RAG Conversational Assistant

---

## Table of Contents

1. [UX Flow Map](#ux-flow-map)
   - [Entry Flow](#entry-flow)
   - [Recruiter Flow](#recruiter-flow)
   - [Job Seeker Flow](#job-seeker-flow)
   - [Session Management Flow](#session-management-flow)
   - [Error & Recovery Flows](#error--recovery-flows)

2. [UI Component System](#ui-component-system)
   - [Component Hierarchy](#component-hierarchy)
   - [Component Catalog](#component-catalog)
   - [Design System](#design-system)
   - [State Management Integration](#state-management-integration)

3. [Interaction Patterns](#interaction-patterns)
   - [User Actions & Feedback](#user-actions--feedback)
   - [Loading States](#loading-states)
   - [Error Handling](#error-handling)

4. [Accessibility & Responsive Design](#accessibility--responsive-design)

---

# UX Flow Map

## Overview

ResumeLens has two primary user roles with distinct flows that converge into a unified chat interface. All flows are ephemeral, with in-memory session management and no persistent storage.

---

## Entry Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     LANDING PAGE (/)                         │
│  Single-page application with unified interface             │
│                                                              │
│  ┌─────────────────┐          ┌─────────────────┐          │
│  │   RECRUITER     │          │   JOB SEEKER    │          │
│  │   [Toggle]      │◄────────►│   [Toggle]      │          │
│  └─────────────────┘          └─────────────────┘          │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          LEFT COLUMN: CHAT INTERFACE                │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │         Chat Container (Empty State)         │  │   │
│  │  │  - EmptyState component                      │  │   │
│  │  │  - Suggested questions                       │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │         ChatInput (Disabled initially)       │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        RIGHT COLUMN: DOCUMENT UPLOAD                │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │   DocumentUpload Component                   │  │   │
│  │  │   - FileDropzone (Recruiter)                 │  │   │
│  │  │   - TextPasteArea (Job Seeker)               │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────┐                                          │
│  │ Session Icon │  [Top-right floating button]            │
│  └──────────────┘                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
            [User selects role or hovers on upload area]
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              SESSION CREATION (Automatic)                    │
│  POST /api/session/create                                   │
│  → Creates sessionId                                        │
│  → Sets sourceType (resume/jd)                              │
│  → Initializes TTL (25 minutes)                             │
│  → Updates sessionStore                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Recruiter Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    STEP 1: ROLE SELECTION                    │
│  User clicks "Recruiter" toggle button                      │
│  - activeRole state → "recruiter"                           │
│  - sourceType → "resume"                                    │
│  - Session created with sourceType="resume"                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 2: DOCUMENT UPLOAD                         │
│                                                              │
│  DocumentUpload Component Rendered:                         │
│  ┌────────────────────────────────────────────────────┐    │
│  │  FileDropzone                                      │    │
│  │  - Drag & drop area                                │    │
│  │  - Click to browse                                 │    │
│  │  - Accepts: PDF, DOCX, TXT                         │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  User Action: Drop/Select File                              │
│                            │                                │
│                            ▼                                │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Document Processing Pipeline:                     │    │
│  │  1. Client-side extraction                         │    │
│  │     - PDF.js for PDF                               │    │
│  │     - mammoth.js for DOCX                          │    │
│  │     - Direct text for TXT                          │    │
│  │                                                     │    │
│  │  2. Text Cleaning                                  │    │
│  │     - Remove empty lines                           │    │
│  │     - Normalize spacing                            │    │
│  │     - Remove headers/footers                       │    │
│  │                                                     │    │
│  │  3. Store in documentStore                         │    │
│  │     - status: "extracting" → "chunking"            │    │
│  │     - rawText stored                               │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 3: CHUNKING & EMBEDDING                    │
│                                                              │
│  ProcessingStatus Component Shows:                          │
│  - "Extracting text..."                                     │
│  - "Chunking document..."                                   │
│  - "Generating embeddings..."                               │
│                                                              │
│  Backend Pipeline:                                          │
│  POST /api/session/upload                                   │
│    → POST /chunk (Python service)                           │
│    → Chunks created (800-1200 chars, 25% overlap)           │
│    → Chunks stored in session                               │
│                                                              │
│  POST /api/session/embed                                    │
│    → POST /embed (Python service)                           │
│    → Gemini Embeddings API called                           │
│    → Embeddings stored in session                           │
│                                                              │
│  documentStore Updates:                                     │
│  - status: "ready"                                          │
│  - chunks: Chunk[]                                          │
│  - chunkCount: number                                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 4: DOCUMENT PREVIEW                        │
│                                                              │
│  DocumentPreview Component Rendered:                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │  📄 resume_john_doe.pdf                           │    │
│  │  ✅ Processed successfully                         │    │
│  │  📊 12 chunks created                              │    │
│  │  [View Chunks] [Remove]                            │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ChatInput Enabled:                                         │
│  - Input field becomes active                               │
│  - EmptyState hidden                                        │
│  - Ready for queries                                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  STEP 5: CHAT INTERACTION                    │
│                                                              │
│  User Types Query:                                          │
│  "Does the candidate have React experience?"                │
│                            │                                │
│                            ▼                                │
│  ┌────────────────────────────────────────────────────┐    │
│  │  RAG Pipeline Execution:                           │    │
│  │  1. Query Embedding                                │    │
│  │     - POST /api/session/chat                       │    │
│  │     - POST /rag/chat (Python service)              │    │
│  │     - Embed query using Gemini                     │    │
│  │                                                     │    │
│  │  2. Vector Search                                  │    │
│  │     - Cosine similarity (NumPy)                    │    │
│  │     - Top-K chunks retrieved (default: 8)          │    │
│  │     - Relevance scores attached                    │    │
│  │                                                     │    │
│  │  3. Prompt Construction                            │    │
│  │     - Context: Selected chunks                     │    │
│  │     - Query: User question                         │    │
│  │     - Instructions: Grounding rules                │    │
│  │                                                     │    │
│  │  4. LLM Generation                                 │    │
│  │     - Gemini Generation API                        │    │
│  │     - Streaming response                           │    │
│  │                                                     │    │
│  │  5. Response Display                               │    │
│  │     - ChatMessage component                        │    │
│  │     - SnippetSources (collapsible)                 │    │
│  │     - Chunk IDs cited                              │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  MessageList Updates:                                       │
│  - User message appended                                    │
│  - TypingIndicator shown                                    │
│  - Assistant response streamed                              │
│  - SnippetSources displayed                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              CONTINUOUS INTERACTION LOOP                     │
│                                                              │
│  User can:                                                   │
│  - Ask follow-up questions                                   │
│  - View snippet sources                                      │
│  - Copy responses                                            │
│  - Clear session                                             │
│  - Switch role (resets session)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Job Seeker Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    STEP 1: ROLE SELECTION                    │
│  User clicks "Job Seeker" toggle button                     │
│  - activeRole state → "jobSeeker"                           │
│  - sourceType → "jd"                                        │
│  - Session created with sourceType="jd"                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 2: JOB DESCRIPTION INPUT                   │
│                                                              │
│  DocumentUpload Component Rendered:                         │
│  ┌────────────────────────────────────────────────────┐    │
│  │  TextPasteArea                                     │    │
│  │  - Large textarea                                  │    │
│  │  - Placeholder: "Paste job description here..."    │    │
│  │  - Character counter (optional)                    │    │
│  │  - [Submit] button                                 │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Alternative: FileDropzone still available                  │
│  (for PDF/DOCX job descriptions)                            │
│                                                              │
│  User Action: Paste/Upload Job Description                  │
│                            │                                │
│                            ▼                                │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Document Processing Pipeline:                     │    │
│  │  (Same as Recruiter Flow)                          │    │
│  │  1. Text extraction/cleaning                       │    │
│  │  2. Chunking                                       │    │
│  │  3. Embedding                                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 3: CHAT INTERACTION                        │
│                                                              │
│  Example Queries:                                            │
│  - "List key required skills"                                │
│  - "What experience level is needed?"                        │
│  - "What should I add to my resume?"                         │
│  - "What are the main responsibilities?"                     │
│                                                              │
│  RAG Pipeline: Same as Recruiter Flow                       │
│  - Query embedding                                          │
│  - Vector search in JD chunks                               │
│  - Context-aware responses                                  │
│  - Snippet citations                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Session Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│              SESSION STATUS INDICATOR                        │
│  (Top-right floating button)                                │
│                                                              │
│  Visual States:                                             │
│  - 🟢 Active (green dot)                                    │
│  - ⚠️ Expiring Soon (amber dot)                             │
│  - 🔴 Expired (red dot, session cleared)                    │
│                                                              │
│  Click Opens Panel:                                         │
│  ┌──────────────────────────────────────────────┐          │
│  │  Session Status                              │          │
│  │  - Session ID (truncated)                    │          │
│  │  - Created: [timestamp]                      │          │
│  │  - Expires in: [countdown]                   │          │
│  │  - Source type: resume/jd                    │          │
│  │                                              │          │
│  │  [Clear Session] button                      │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              CLEAR SESSION ACTION                            │
│                                                              │
│  User clicks "Clear Session"                                │
│                            │                                │
│                            ▼                                │
│  Confirmation Dialog (Optional):                            │
│  "Are you sure? This will delete all session data."         │
│                            │                                │
│                            ▼                                │
│  DELETE /api/session/[sessionId]                            │
│  → Session cleared on backend                               │
│  → All stores reset:                                        │
│    - sessionStore.clearSession()                            │
│    - documentStore.reset()                                  │
│    - chatStore.reset()                                      │
│                            │                                │
│                            ▼                                │
│  UI Returns to Initial State:                               │
│  - EmptyState shown                                         │
│  - DocumentUpload reset                                     │
│  - ChatInput disabled                                       │
│  - New session created on next action                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              AUTOMATIC SESSION EXPIRATION                    │
│                                                              │
│  Background Cleanup:                                         │
│  - TTL: 25 minutes (default)                                │
│  - Periodic check (every 1 minute)                          │
│  - Auto-expire on timeout                                   │
│  - Backend cleanup task (Python service)                    │
│                                                              │
│  User Notification:                                          │
│  - "Session expired" toast                                  │
│  - Auto-clear UI state                                      │
│  - Prompt to start new session                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Error & Recovery Flows

```
┌─────────────────────────────────────────────────────────────┐
│                    ERROR TYPES & HANDLING                    │
│                                                              │
│  1. FILE UPLOAD ERRORS:                                     │
│     ┌──────────────────────────────────────────────┐       │
│     │  - Invalid file type                         │       │
│     │  - File too large                            │       │
│     │  - Extraction failed                         │       │
│     │                                               │       │
│     │  Error Display:                              │       │
│     │  ┌──────────────────────────────┐            │       │
│     │  │ ❌ Error message            │            │       │
│     │  │ [Retry] [Clear]             │            │       │
│     │  └──────────────────────────────┘            │       │
│     │                                               │       │
│     │  Recovery:                                   │       │
│     │  - Show specific error message               │       │
│     │  - Allow retry                               │       │
│     │  - Reset documentStore                       │       │
│     └──────────────────────────────────────────────┘       │
│                                                              │
│  2. NETWORK ERRORS:                                         │
│     ┌──────────────────────────────────────────────┐       │
│     │  - API request failed                        │       │
│     │  - Timeout                                   │       │
│     │  - Service unavailable                       │       │
│     │                                               │       │
│     │  Error Display:                              │       │
│     │  - Toast notification                        │       │
│     │  - Inline error in component                 │       │
│     │  - Retry button                              │       │
│     │                                               │       │
│     │  Recovery:                                   │       │
│     │  - Automatic retry (3 attempts)              │       │
│     │  - Manual retry option                       │       │
│     │  - Clear error state                         │       │
│     └──────────────────────────────────────────────┘       │
│                                                              │
│  3. SESSION ERRORS:                                         │
│     ┌──────────────────────────────────────────────┐       │
│     │  - Session expired                           │       │
│     │  - Session not found                         │       │
│     │  - Invalid session ID                        │       │
│     │                                               │       │
│     │  Error Display:                              │       │
│     │  - "Session expired" message                 │       │
│     │  - "Start new session" button                │       │
│     │                                               │       │
│     │  Recovery:                                   │       │
│     │  - Auto-create new session                   │       │
│     │  - Clear all stores                          │       │
│     │  - Reset UI to initial state                 │       │
│     └──────────────────────────────────────────────┘       │
│                                                              │
│  4. CHAT ERRORS:                                            │
│     ┌──────────────────────────────────────────────┐       │
│     │  - RAG pipeline failed                       │       │
│     │  - LLM generation error                      │       │
│     │  - No relevant chunks found                  │       │
│     │                                               │       │
│     │  Error Display:                              │       │
│     │  - Error message in chat                     │       │
│     │  - "Try again" button                        │       │
│     │                                               │       │
│     │  Recovery:                                   │       │
│     │  - Allow re-submission                       │       │
│     │  - Suggest alternative questions             │       │
│     │  - Clear error state                         │       │
│     └──────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

# UI Component System

## Component Hierarchy

```
app/
└── page.tsx (HomePage)
    ├── SessionStatus (floating button)
    ├── Role Toggle (Recruiter/Job Seeker)
    ├── ChatContainer
    │   ├── ChatHeader (optional)
    │   ├── MessageList
    │   │   ├── EmptyState
    │   │   ├── ChatMessage (user)
    │   │   └── ChatMessage (assistant)
    │   │       ├── MessageActions
    │   │       └── SnippetSources
    │   ├── TypingIndicator
    │   └── ChatInput
    └── DocumentUpload Card
        ├── DocumentUpload
        │   ├── FileDropzone (Recruiter)
        │   ├── TextPasteArea (Job Seeker)
        │   ├── FileTypeIndicators
        │   └── ProcessingStatus
        └── DocumentPreview
```

---

## Component Catalog

### 1. Layout Components

#### `Container`
**Location:** `components/layout/Container.tsx`  
**Purpose:** Page container wrapper with responsive max-width  
**Props:**
```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}
```
**Usage:**
```typescript
<Container maxWidth="xl">
  {children}
</Container>
```

#### `PageHeader`
**Location:** `components/layout/PageHeader.tsx`  
**Purpose:** Standardized page header with title and optional actions  
**Props:**
```typescript
interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}
```

---

### 2. Role Selection Components

#### `RoleSelection`
**Location:** `components/role-selection/RoleSelection.tsx`  
**Purpose:** Role selection interface (currently integrated in HomePage)  
**State:** Managed by HomePage (`activeRole` state)

#### `RoleCard`
**Location:** `components/role-selection/RoleCard.tsx`  
**Purpose:** Individual role card with icon and description  
**Props:**
```typescript
interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  sourceType: SourceType;
  onSelect?: (sourceType: SourceType) => void;
}
```
**Features:**
- Hover effects (scale, shadow)
- Keyboard accessible (Enter/Space)
- ARIA labels for screen readers

---

### 3. Document Upload Components

#### `DocumentUpload`
**Location:** `components/document-upload/DocumentUpload.tsx`  
**Purpose:** Main document upload container  
**Props:**
```typescript
interface DocumentUploadProps {
  sourceType: SourceType;
  showTextPaste?: boolean;
}
```
**Features:**
- Conditionally renders FileDropzone or TextPasteArea
- Shows ProcessingStatus
- Displays error messages
- Integrates with `useDocumentUpload` hook

**State Management:**
- Uses `documentStore` for status, progress, chunks
- Uses `useDocumentUpload` hook for upload logic

#### `FileDropzone`
**Location:** `components/document-upload/FileDropzone.tsx`  
**Purpose:** Drag-and-drop file upload area  
**Props:**
```typescript
interface FileDropzoneProps {
  onFileSelect: (file: File) => void | Promise<void>;
  disabled?: boolean;
  acceptedTypes?: string[];
}
```
**Features:**
- Drag & drop support
- Click to browse
- Visual feedback on drag over
- File type validation
- Disabled state styling

**Visual States:**
- Default: Dashed border, gray background
- Drag Over: Blue border, blue background tint
- Disabled: Reduced opacity, cursor not-allowed

#### `TextPasteArea`
**Location:** `components/document-upload/TextPasteArea.tsx`  
**Purpose:** Text paste interface for job descriptions  
**Props:**
```typescript
interface TextPasteAreaProps {
  onTextSubmit: (text: string) => void | Promise<void>;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}
```
**Features:**
- Auto-resizing textarea
- Character counter (when near limit)
- Submit button
- Validation (min length, max length)

#### `DocumentPreview`
**Location:** `components/document-upload/DocumentPreview.tsx`  
**Purpose:** Preview of uploaded/processed document  
**Features:**
- Shows filename
- Displays chunk count
- Shows processing status
- Remove button
- Optional chunk preview

**Data Source:** `documentStore` (fileName, chunkCount, chunks)

#### `FileTypeIndicators`
**Location:** `components/document-upload/FileTypeIndicators.tsx`  
**Purpose:** Visual indicators for supported file types  
**Features:**
- Icons for PDF, DOCX, TXT
- Brief description of each type

---

### 4. Document Processing Components

#### `ProcessingStatus`
**Location:** `components/document-processing/ProcessingStatus.tsx`  
**Purpose:** Visual feedback during document processing  
**States:**
- `idle`: Not shown
- `extracting`: "Extracting text..."
- `chunking`: "Chunking document..."
- `embedding`: "Generating embeddings..."
- `ready`: "Processing complete" (brief, then hidden)
- `error`: Error message display

**Data Source:** `documentStore.status`

#### `ChunkPreview`
**Location:** `components/document-processing/ChunkPreview.tsx`  
**Purpose:** Optional preview of document chunks  
**Features:**
- Collapsible list of chunks
- Shows chunk text preview
- Displays chunk metadata (index, section)

---

### 5. Chat Components

#### `ChatContainer`
**Location:** `components/chat/ChatContainer.tsx`  
**Purpose:** Main chat interface container  
**Structure:**
```typescript
<ChatContainer>
  <MessageList />
  {isStreaming && <TypingIndicator />}
  <ChatInput />
</ChatContainer>
```
**State Management:**
- Subscribes to `chatStore.isStreaming`
- Manages layout and scrolling

#### `MessageList`
**Location:** `components/chat/MessageList.tsx`  
**Purpose:** Scrollable container for chat messages  
**Features:**
- Auto-scroll to bottom on new messages
- Virtual scrolling for performance (if needed)
- Shows EmptyState when no messages
- Displays ChatMessage components

**Data Source:** `chatStore.messages`

#### `ChatMessage`
**Location:** `components/chat/ChatMessage.tsx`  
**Purpose:** Individual chat message bubble  
**Props:**
```typescript
interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}
```
**Features:**
- User messages: Right-aligned, blue background
- Assistant messages: Left-aligned, gray background
- Timestamp display
- Markdown rendering for assistant messages
- MessageActions component
- SnippetSources component (for assistant messages)

**Message Structure:**
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  chunksUsed?: string[];  // Chunk IDs referenced
  confidence?: number;
}
```

#### `EmptyState`
**Location:** `components/chat/EmptyState.tsx`  
**Purpose:** Initial state when no messages  
**Features:**
- Friendly message
- Suggested questions (role-specific)
- Clear call-to-action
- Icon/illustration

**Suggested Questions:**
- **Recruiter:**
  - "Does the candidate have React experience?"
  - "Summarize their strengths"
  - "What education background do they have?"
- **Job Seeker:**
  - "List key required skills"
  - "What experience level is needed?"
  - "What should I add to my resume?"

#### `ChatInput`
**Location:** `components/chat/ChatInput.tsx`  
**Purpose:** Message input area  
**Features:**
- Auto-resizing textarea (max 120px height)
- Character counter (when near 2000 char limit)
- Send button (disabled when empty/streaming)
- Keyboard shortcuts (Enter to send, Shift+Enter for newline)
- Focus states
- Loading state during streaming
- Listens for suggested question selection (custom event)

**State Management:**
- Local state for input text
- Subscribes to `chatStore.isStreaming`
- Uses `useChat` hook for sending messages

#### `TypingIndicator`
**Location:** `components/chat/TypingIndicator.tsx`  
**Purpose:** Visual feedback when AI is responding  
**Features:**
- Animated dots
- Brief message ("Thinking...")
- Shown only when `isStreaming === true`

#### `SnippetSources`
**Location:** `components/chat/SnippetSources.tsx`  
**Purpose:** Display of source chunks used in response  
**Features:**
- Collapsible section
- Lists chunk IDs/indices
- Shows chunk text preview on hover/expand
- Link to document sections (optional)

**Data Source:** `message.chunksUsed`

#### `MessageActions`
**Location:** `components/chat/MessageActions.tsx`  
**Purpose:** Action buttons for messages  
**Features:**
- Copy button
- Share button (optional)
- Like/dislike feedback (optional)

#### `ScrollToBottomButton`
**Location:** `components/chat/ScrollToBottomButton.tsx`  
**Purpose:** Button to scroll to latest message  
**Features:**
- Shows when scrolled up
- Smooth scroll to bottom
- Auto-hides when at bottom

---

### 6. Session Management Components

#### `SessionStatus`
**Location:** `components/session/SessionStatus.tsx`  
**Purpose:** Display session information  
**Features:**
- Session ID (truncated)
- Creation timestamp
- Time remaining countdown
- Source type indicator
- Visual status indicator (active/expiring/expired)

**Data Source:** `sessionStore`

#### `ClearSessionButton`
**Location:** `components/session/ClearSessionButton.tsx`  
**Purpose:** Button to clear current session  
**Features:**
- Confirmation dialog (optional)
- Clears all stores
- Resets UI to initial state
- Creates new session on next action

**Actions:**
- Calls `sessionStore.clearSession()`
- Calls `documentStore.reset()`
- Calls `chatStore.reset()`
- DELETE `/api/session/[sessionId]`

---

### 7. UI Base Components

#### `Button`
**Location:** `components/ui/button/Button.tsx`  
**Purpose:** Reusable button component  
**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}
```
**Variants:**
- `primary`: Blue background, white text
- `secondary`: Gray background, dark text
- `outline`: Transparent with border
- `danger`: Red background, white text
- `ghost`: Transparent, hover background

**Features:**
- Loading spinner when `loading={true}`
- Disabled state styling
- Focus states for accessibility
- Icon support

#### `Input`
**Location:** `components/ui/input/Input.tsx`  
**Purpose:** Reusable input component  
**Props:**
```typescript
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  type?: string;
  label?: string;
  required?: boolean;
  className?: string;
}
```
**Features:**
- Error state styling
- Label support
- Validation feedback

#### `Card`
**Location:** `components/ui/card/Card.tsx`  
**Purpose:** Reusable card container  
**Props:**
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}
```
**Variants:**
- `default`: Shadow, border
- `elevated`: Stronger shadow
- `outlined`: Border only, no shadow

#### `LoadingSpinner`
**Location:** `components/ui/loading/LoadingSpinner.tsx`  
**Purpose:** Loading spinner animation  
**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'gray' | 'white';
  className?: string;
}
```

#### `Icons`
**Location:** `components/ui/icons/IconComponents.tsx`  
**Purpose:** Icon components (Heroicons or Lucide React)  
**Available Icons:**
- `Send`, `Paperclip`, `MessageSquare`
- `Check`, `X`, `Alert`
- `ChevronDown`, `ChevronUp`
- Custom icons as needed

---

## Design System

### Color Palette

**Primary Colors:**
- `blue-500`: Main brand color
- `blue-600`: Hover states, active states
- `blue-700`: Pressed states

**Semantic Colors:**
- `green-600`: Success states
- `red-600`: Error states
- `amber-500`: Warning states
- `gray-50` to `gray-900`: Neutral scale

**Usage:**
```typescript
// Primary
className="bg-blue-600 text-white hover:bg-blue-700"

// Success
className="bg-green-600 text-white"

// Error
className="bg-red-600 text-white"

// Neutral
className="bg-gray-100 text-gray-900 border-gray-300"
```

### Typography

**Font Stack:**
- System fonts for performance
- Monospace for code/snippets

**Type Scale:**
- `text-4xl`: H1 (36px)
- `text-3xl`: H2 (30px)
- `text-2xl`: H3 (24px)
- `text-xl`: H4 (20px)
- `text-base`: Body (16px, default)
- `text-sm`: Small text (14px)
- `text-xs`: Caption (12px)

**Font Weights:**
- `font-bold`: 700 (Headings)
- `font-semibold`: 600 (Subheadings)
- `font-medium`: 500 (Labels)
- `font-normal`: 400 (Body)

### Spacing

**Spacing Scale (4px base):**
- `p-2`: 8px
- `p-4`: 16px (common)
- `p-6`: 24px (sections)
- `gap-4`: 16px (flex/grid)
- `mb-8`: 32px (section spacing)

### Shadows

**Shadow Levels:**
- `shadow-sm`: Subtle elevation
- `shadow-md`: Medium elevation
- `shadow-lg`: Strong elevation
- `shadow-xl`: Maximum elevation

### Border Radius

**Radius Scale:**
- `rounded`: 4px
- `rounded-lg`: 8px
- `rounded-xl`: 12px
- `rounded-2xl`: 16px
- `rounded-3xl`: 24px
- `rounded-full`: 9999px (pills, buttons)

### Transitions

**Standard Transitions:**
- `transition-all duration-200`: Default
- `transition-colors duration-200`: Color changes
- `transition-transform duration-200`: Transform changes

---

## State Management Integration

### Store Usage by Component

#### Components Using `sessionStore`:
- `HomePage`: Session creation, role switching
- `SessionStatus`: Display session info
- `ClearSessionButton`: Clear session action
- `DocumentUpload`: Session validation before upload
- `ChatInput`: Session validation before chat

#### Components Using `documentStore`:
- `DocumentUpload`: Upload status, file info
- `DocumentPreview`: Document metadata
- `ProcessingStatus`: Processing state
- `ChatInput`: Disabled when document not ready
- `HomePage`: Document existence check

#### Components Using `chatStore`:
- `ChatContainer`: Streaming state
- `MessageList`: Messages array
- `ChatInput`: Streaming state, send message
- `TypingIndicator`: Streaming state
- `ChatMessage`: Individual message data

### State Flow Example: Document Upload

```
1. User drops file
   ↓
2. FileDropzone.onFileSelect(file)
   ↓
3. useDocumentUpload.handleFileSelect(file)
   ↓
4. documentStore.setFile(file)
   documentStore.setStatus('extracting')
   ↓
5. Client-side extraction (PDF.js/mammoth.js)
   ↓
6. documentStore.setRawText(text)
   documentStore.setStatus('chunking')
   ↓
7. POST /api/session/upload
   → Python service: chunking
   ↓
8. documentStore.setChunks(chunks)
   documentStore.setStatus('embedding')
   ↓
9. POST /api/session/embed
   → Python service: embeddings
   ↓
10. documentStore.setStatus('ready')
    ↓
11. DocumentPreview shows
    ChatInput enabled
```

---

# Interaction Patterns

## User Actions & Feedback

### Immediate Feedback
- **Button Clicks:** Hover state, active state, loading spinner
- **Input Typing:** Real-time character count, validation
- **File Drop:** Visual drag-over state, drop feedback
- **Message Send:** Input clears, typing indicator appears

### Delayed Feedback
- **Document Processing:** Progress indicator, status updates
- **Chat Response:** Streaming text, typing indicator
- **Error States:** Toast notifications, inline error messages

### Loading States Hierarchy

1. **Component Level:**
   - Button loading spinner
   - Input disabled state
   - Overlay spinner

2. **Page Level:**
   - Full-page loading (on route change)
   - Skeleton loaders

3. **Feature Level:**
   - Processing status component
   - Typing indicator
   - Progress bars

---

## Error Handling

### Error Display Patterns

1. **Inline Errors:**
   - Form validation errors below inputs
   - Component-level error messages

2. **Toast Notifications:**
   - Global errors (network, API failures)
   - Success messages
   - Auto-dismiss after 3-5 seconds

3. **Error Boundaries:**
   - Catch React errors
   - Display fallback UI
   - Error logging (optional)

### Error Recovery

1. **Automatic Retry:**
   - Network errors: 3 attempts with exponential backoff
   - Failed API calls: Retry button

2. **Manual Recovery:**
   - Clear error state
   - Reset component
   - Start over

3. **Graceful Degradation:**
   - Show partial data when possible
   - Disable features that require unavailable data
   - Provide alternative actions

---

# Accessibility & Responsive Design

## Accessibility (WCAG 2.1 AA)

### Keyboard Navigation
- All interactive elements keyboard accessible
- Logical tab order
- Focus indicators visible
- Skip links for main content

### Screen Readers
- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA labels where needed
- Alt text for images
- Descriptive link text

### Color Contrast
- Text: Minimum 4.5:1 contrast ratio
- Large text: Minimum 3:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast ratio

### Focus Management
- Focus trap in modals
- Return focus after modal close
- Focus visible on all interactive elements

## Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px (Mobile)
- `md`: 768px (Tablet)
- `lg`: 1024px (Desktop)
- `xl`: 1280px (Large Desktop)
- `2xl`: 1536px (Extra Large)

### Layout Adaptations

**Mobile (< 768px):**
- Single column layout
- Stacked chat and document upload
- Hamburger menu (if needed)
- Full-width components

**Tablet (768px - 1024px):**
- Two-column layout (stacked on smaller tablets)
- Adjusted spacing
- Touch-friendly button sizes

**Desktop (> 1024px):**
- Two-column layout (chat + document)
- Side-by-side components
- Hover states active
- Keyboard shortcuts enabled

### Component Responsive Patterns

**ChatContainer:**
- Mobile: Full height, full width
- Desktop: Fixed height, constrained width

**DocumentUpload:**
- Mobile: Full width, stacked vertically
- Desktop: Constrained width, side panel

**Buttons:**
- Mobile: Larger touch targets (44x44px minimum)
- Desktop: Standard sizes, hover effects

---

## Performance Considerations

### Component Optimization

1. **Code Splitting:**
   - Lazy load heavy components
   - Route-based code splitting

2. **Memoization:**
   - `React.memo` for expensive components
   - `useMemo` for computed values
   - `useCallback` for event handlers

3. **Virtual Scrolling:**
   - MessageList with many messages
   - Chunk preview lists

4. **Image Optimization:**
   - Next.js Image component
   - Lazy loading
   - Appropriate formats (WebP)

### State Management Optimization

1. **Zustand Selectors:**
   - Selective subscriptions to prevent re-renders
   - Derived state in selectors

2. **Batch Updates:**
   - Multiple store updates in single action
   - Debounce rapid state changes

---

## Component Testing Checklist

For each component, ensure:

- [ ] Renders correctly with required props
- [ ] Handles optional props gracefully
- [ ] Displays loading states
- [ ] Shows error states
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Handles edge cases (empty data, null values)
- [ ] Integrates with stores correctly
- [ ] Follows design system patterns

---

**Document End**

*This document should be updated as the component system evolves.*

