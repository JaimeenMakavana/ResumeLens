# ResumeLens - Component Architecture Diagram

**Quick Reference Guide**

---

## Component Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                         HomePage                                │
│                    (app/page.tsx)                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    State Management                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │sessionStore  │  │documentStore │  │  chatStore   │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────────────┐   │
│  │   Session Status     │  │    Role Toggle                │   │
│  │  (Floating Button)   │  │  (Recruiter/Job Seeker)      │   │
│  └──────────────────────┘  └──────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  LEFT COLUMN                              │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │              ChatContainer                          │  │  │
│  │  │  ┌──────────────────────────────────────────────┐  │  │  │
│  │  │  │          MessageList                         │  │  │  │
│  │  │  │  ├── EmptyState (when no messages)          │  │  │  │
│  │  │  │  ├── ChatMessage (user)                     │  │  │  │
│  │  │  │  └── ChatMessage (assistant)                │  │  │  │
│  │  │  │      ├── MessageActions                     │  │  │  │
│  │  │  │      └── SnippetSources                     │  │  │  │
│  │  │  └──────────────────────────────────────────────┘  │  │  │
│  │  │  ┌──────────────────────────────────────────────┐  │  │  │
│  │  │  │        TypingIndicator (when streaming)      │  │  │  │
│  │  │  └──────────────────────────────────────────────┘  │  │  │
│  │  │  ┌──────────────────────────────────────────────┐  │  │  │
│  │  │  │            ChatInput                         │  │  │  │
│  │  │  └──────────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 RIGHT COLUMN                              │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │            DocumentUpload Card                      │  │  │
│  │  │  ┌──────────────────────────────────────────────┐  │  │  │
│  │  │  │          DocumentUpload                       │  │  │  │
│  │  │  │  ├── FileDropzone (Recruiter)               │  │  │  │
│  │  │  │  │  └── TextPasteArea (Job Seeker)          │  │  │  │
│  │  │  │  ├── FileTypeIndicators                      │  │  │  │
│  │  │  │  └── ProcessingStatus                        │  │  │  │
│  │  │  └──────────────────────────────────────────────┘  │  │  │
│  │  │  ┌──────────────────────────────────────────────┐  │  │  │
│  │  │  │          DocumentPreview                      │  │  │  │
│  │  │  │  └── ChunkPreview (optional)                 │  │  │  │
│  │  │  └──────────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Document Upload to Chat

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER ACTION FLOW                              │
└─────────────────────────────────────────────────────────────────┘

1. USER DROPS FILE
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ FileDropzone                                                    │
│  - onFileSelect(file)                                           │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ useDocumentUpload Hook                                          │
│  - handleFileSelect(file)                                       │
│  - documentStore.setFile(file)                                  │
│  - documentStore.setStatus('extracting')                        │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ Client-Side Extraction                                          │
│  - PDF.js (PDF files)                                           │
│  - mammoth.js (DOCX files)                                      │
│  - Direct text (TXT files)                                      │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ documentStore Updates                                           │
│  - setRawText(extractedText)                                    │
│  - setStatus('chunking')                                        │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ POST /api/session/upload                                        │
│  → Next.js API Route                                            │
│    → POST /chunk (Python Service)                               │
│      → Chunks created with metadata                             │
│      → Returns chunks array                                     │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ documentStore Updates                                           │
│  - setChunks(chunks)                                            │
│  - setStatus('embedding')                                       │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ POST /api/session/embed                                         │
│  → Next.js API Route                                            │
│    → POST /embed (Python Service)                               │
│      → Gemini Embeddings API                                    │
│      → Embeddings generated for each chunk                      │
│      → Embeddings stored in session                             │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ documentStore Updates                                           │
│  - setStatus('ready')                                           │
│  - ProcessingStatus hides                                       │
│  - DocumentPreview shows                                        │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ ChatInput Enabled                                               │
│  - Input field becomes active                                   │
│  - Ready for user queries                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Chat Query to Response

```
┌─────────────────────────────────────────────────────────────────┐
│                    CHAT QUERY FLOW                               │
└─────────────────────────────────────────────────────────────────┘

1. USER TYPES QUERY
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ ChatInput                                                        │
│  - User enters text                                             │
│  - Clicks Send or presses Enter                                 │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ useChat Hook                                                     │
│  - sendMessage(query)                                           │
│  - chatStore.addMessage(userMessage)                            │
│  - chatStore.setStreaming(true)                                 │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ POST /api/session/chat                                          │
│  → Next.js API Route                                            │
│    → POST /rag/chat (Python Service)                            │
│      → Step 1: Query Embedding                                  │
│        - Embed query using Gemini                               │
│      → Step 2: Vector Search                                    │
│        - Cosine similarity (NumPy)                              │
│        - Top-K chunks retrieved (default: 8)                    │
│      → Step 3: Prompt Construction                              │
│        - Context: Selected chunks                               │
│        - Query: User question                                   │
│        - Instructions: Grounding rules                          │
│      → Step 4: LLM Generation                                   │
│        - Gemini Generation API                                  │
│        - Streaming response                                     │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ Response Streaming                                              │
│  - TypingIndicator shown                                        │
│  - Response text streams in                                     │
│  - chatStore.addMessage(assistantMessage)                       │
└─────────────────────────────────────────────────────────────────┘
   ↓
┌─────────────────────────────────────────────────────────────────┐
│ Response Display                                                │
│  - ChatMessage (assistant) rendered                             │
│  - SnippetSources shows referenced chunks                       │
│  - chatStore.setStreaming(false)                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component State Dependencies

```
┌─────────────────────────────────────────────────────────────────┐
│              STATE DEPENDENCIES MAP                              │
└─────────────────────────────────────────────────────────────────┘

sessionStore
├── Used by:
│   ├── HomePage (session creation, role switching)
│   ├── SessionStatus (display session info)
│   ├── ClearSessionButton (clear session)
│   ├── DocumentUpload (validate session before upload)
│   └── ChatInput (validate session before chat)

documentStore
├── Used by:
│   ├── DocumentUpload (upload status, file info)
│   ├── DocumentPreview (document metadata)
│   ├── ProcessingStatus (processing state)
│   ├── ChatInput (disabled when document not ready)
│   └── HomePage (document existence check)

chatStore
├── Used by:
│   ├── ChatContainer (streaming state)
│   ├── MessageList (messages array)
│   ├── ChatInput (streaming state, send message)
│   ├── TypingIndicator (streaming state)
│   └── ChatMessage (individual message data)
```

---

## Component File Structure

```
components/
├── chat/
│   ├── ChatContainer.tsx        [Main container]
│   ├── ChatHeader.tsx           [Optional header]
│   ├── ChatInput.tsx            [Input area]
│   ├── ChatMessage.tsx          [Message bubble]
│   ├── EmptyState.tsx           [Initial state]
│   ├── MessageActions.tsx       [Message actions]
│   ├── MessageList.tsx          [Message container]
│   ├── ScrollToBottomButton.tsx [Scroll helper]
│   ├── SnippetSources.tsx       [Source chunks]
│   ├── TypingIndicator.tsx      [Loading indicator]
│   └── index.ts                 [Barrel export]
│
├── document-upload/
│   ├── DocumentPreview.tsx      [Document preview]
│   ├── DocumentUpload.tsx       [Main upload component]
│   ├── FileDropzone.tsx         [Drag & drop]
│   ├── FileTypeIndicators.tsx   [File type info]
│   ├── TextPasteArea.tsx        [Text paste area]
│   └── index.ts                 [Barrel export]
│
├── document-processing/
│   ├── ChunkPreview.tsx         [Chunk preview]
│   ├── ProcessingStatus.tsx     [Processing feedback]
│   └── index.ts                 [Barrel export]
│
├── role-selection/
│   ├── RoleCard.tsx             [Individual role card]
│   ├── RoleSelection.tsx        [Role selection UI]
│   └── index.ts                 [Barrel export]
│
├── session/
│   ├── ClearSessionButton.tsx   [Clear button]
│   ├── SessionStatus.tsx        [Status display]
│   └── index.ts                 [Barrel export]
│
└── ui/
    ├── button/
    │   ├── Button.tsx           [Base button]
    │   └── index.ts
    ├── card/
    │   ├── Card.tsx             [Base card]
    │   └── index.ts
    ├── icons/
    │   ├── IconComponents.tsx   [Icon exports]
    │   └── index.ts
    ├── input/
    │   ├── Input.tsx            [Base input]
    │   └── index.ts
    ├── loading/
    │   ├── LoadingSpinner.tsx   [Spinner]
    │   └── index.ts
    └── index.ts                 [UI barrel export]
```

---

## Hook Integration

```
┌─────────────────────────────────────────────────────────────────┐
│                   CUSTOM HOOKS USAGE                             │
└─────────────────────────────────────────────────────────────────┘

useSession
├── Provides:
│   ├── sessionId: string | null
│   ├── createSession(sourceType): Promise<string>
│   ├── clearSession(): void
│   └── isActive: boolean
└── Used by: HomePage, SessionStatus, ClearSessionButton

useDocumentUpload
├── Provides:
│   ├── handleFileSelect(file): Promise<void>
│   ├── handleTextPaste(text, sourceType): Promise<void>
│   ├── isProcessing: boolean
│   └── error: string | null
└── Used by: DocumentUpload

useChat
├── Provides:
│   ├── sendMessage(query): Promise<void>
│   ├── isStreaming: boolean
│   └── messages: Message[]
└── Used by: ChatInput

useDocumentProcessor
├── Provides:
│   ├── extractText(file): Promise<string>
│   └── processingStatus: 'idle' | 'extracting' | 'complete'
└── Used by: useDocumentUpload (internal)
```

---

## API Integration Points

```
┌─────────────────────────────────────────────────────────────────┐
│                    API ENDPOINTS MAP                             │
└─────────────────────────────────────────────────────────────────┘

Frontend → Next.js API Routes → Python Service

POST /api/session/create
  → Creates session
  → Returns: { sessionId, expiresAt }

POST /api/session/upload
  → POST /chunk (Python)
  → Processes document, creates chunks
  → Returns: { chunks: Chunk[] }

POST /api/session/embed
  → POST /embed (Python)
  → Generates embeddings
  → Returns: { success: boolean }

POST /api/session/chat
  → POST /rag/chat (Python)
  → Full RAG pipeline
  → Returns: { response: string, chunksUsed: string[] }

DELETE /api/session/[id]
  → Clears session data
  → Returns: { success: boolean }
```

---

## Visual Design Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    VISUAL LAYERS                                 │
└─────────────────────────────────────────────────────────────────┘

Layer 1: Background
├── Gradient background (blue to indigo)
├── Decorative shapes (blurred circles)
└── Z-index: -10

Layer 2: Main Content
├── Two-column grid layout
├── White/transparent cards with backdrop blur
└── Z-index: 10

Layer 3: Floating Elements
├── Session status button (top-right)
├── Modals/Overlays
└── Z-index: 20

Component Stacking (Z-index):
- Background: -10
- Main content: 0
- Cards: 10
- Floating buttons: 20
- Modals/Overlays: 30
```

---

## Responsive Layout Breakpoints

```
┌─────────────────────────────────────────────────────────────────┐
│              LAYOUT ADAPTATIONS                                  │
└─────────────────────────────────────────────────────────────────┘

Mobile (< 768px)
├── Single column layout
├── Stacked chat and document upload
├── Full-width components
└── Touch-friendly buttons (44x44px min)

Tablet (768px - 1024px)
├── Two-column layout (stacked on smaller tablets)
├── Adjusted spacing
└── Touch-friendly interactions

Desktop (> 1024px)
├── Two-column layout (side-by-side)
├── Fixed height chat container
├── Hover states active
└── Keyboard shortcuts enabled
```

---

**Quick Reference End**

*See UX_FLOW_MAP_AND_COMPONENT_SYSTEM.md for detailed documentation.*

