# **Product Requirements Document (PRD)**

### **Project: Ephemeral RAG-based Chatbot for Recruiters & Job Seekers**
### project name : **ResumeLens** 
---

## **1. Product Overview**

The project is a **RAG-based conversational assistant** intended for learning and experimentation. It supports two roles:

* **Recruiter**: uploads a candidate resume and asks the system questions about the candidate.
* **Job Seeker**: pastes a job description (JD) and queries the system for insights, requirements, and alignment.

The key twist: **all data is ephemeral**. Nothing is stored long term. No DB, no S3, no analytics warehouses waiting to leak your personal details. Everything lives only in memory for the duration of a session.

The goal is to provide a practical learning environment for RAG systems: ingestion, chunking, embedding, retrieval, LLM reasoning, and prompt templating.

---

## **2. Goals & Non-Goals**

### **Goals**

1. Allow users to upload/paste documents and interact with a RAG pipeline in real time.
2. Maintain **zero persistent storage** for resumes, JDs, embeddings, or chat history.
3. Provide an intuitive chat interface for both user roles.
4. Build an educational architecture showcasing:

   * chunking strategies
   * embedding
   * vector search
   * grounded retrieval
   * Gemini-based reasoning

### **Non-Goals**

1. No production-grade privacy compliance.
2. No multi-user data sharing or shared workspace.
3. No complex authentication or enterprise RBAC.
4. No analytics/storage for long-term model improvement.

---

## **3. Target Users**

### **Primary Users**

* **Aspiring ML/AI Developers** learning RAG architectures.
* **Recruiters (demo context)** wanting a quick evaluation of candidate CVs.
* **Job Seekers** trying to understand job descriptions.

### **Secondary Users**

* Educators teaching vector search & LLM orchestration.
* Students needing a hands-on RAG sandbox.

---

## **4. User Flows**

---

### **4.1 Recruiter Flow**

1. User selects “Recruiter”.
2. User uploads a resume (PDF/DOCX/text).
3. System extracts text (client-side preferred).
4. System creates chunks, embeddings, and builds an **in-memory vector index**.
5. User enters questions like:

   * “Does the candidate have React experience?”
   * “Summarize their strengths.”
6. System retrieves relevant chunks → constructs RAG prompt → Gemini response.
7. User optionally clears the session.

---

### **4.2 Job Seeker Flow**

1. User selects “Job Seeker”.
2. User pastes or uploads a job description.
3. Similar ingestion pipeline creates an in-memory index just for this JD.
4. User queries:

   * “List key required skills.”
   * “What should I add to my resume?”
5. Output displayed with snippet citations.
6. Session is temporary; user can reset at any time.

---

## **5. Functional Requirements**

---

### **5.1 Session Management (Ephemeral)**

* System generates a **sessionId** on start.
* Session data stored **only in RAM**, with TTL (default: 20–30 mins).
* `DELETE /session/:id` immediately drops session data.

---

### **5.2 Document Ingestion**

* Accept PDF, DOCX, text.
* Prefer client-side extraction (PDF.js or mammoth.js).
* Clean and normalize extracted text:

  * Remove empty lines
  * Remove headers/footers
  * Normalize spacing

---

### **5.3 Chunking**

Rules:

* Max characters: 800–1200
* Overlap: 20–30%
* Preserve metadata:

  * section
  * page number
  * source type (resume/JD)

Chunks are stored temporarily in memory under the session.

---

### **5.4 Embeddings**

* Use Gemini embeddings via server API.
* Embeddings stored only inside the session object.
* No caching beyond session lifetime.

---

### **5.5 Vector Retrieval**

* Simple brute-force cosine similarity search.
* Filter topK (default 6–10).
* Attach relevance scores.

---

### **5.6 LLM Answer Generation**

* Use Gemini generation endpoint.
* Prompt template enforces grounding:

  * “Use only the provided snippets.”
  * “If lacking information, say so.”
* Provide:

  * Answer
  * List of snippet IDs used
  * Confidence hint

---

### **5.7 User Interface**

* Clean dual-mode selection screen: Recruiter / Job Seeker.
* Document upload/paste UI.
* Chunk preview (optional).
* Chat panel with:

  * User messages
  * AI responses
  * Snippet sources (collapsible)

---

### **5.8 Session Termination**

* Button: “Clear session”.
* Automatic purge after TTL expiration.

---

## **6. Non-Functional Requirements**

---

### **6.1 Security**

* No persistent storage.
* No log retention for user documents.
* Avoid sending entire raw documents to the server if extraction is done client-side.
* Only selected snippets are sent to LLM.

### **6.2 Performance**

* End-to-end response latency < 3s for typical resume/JD.
* Chunking should finish under 500ms for average resume (~1–3 pages).

### **6.3 Reliability**

* System resets cleanly on session timeout.
* Handle malformed PDFs gracefully.

### **6.4 Usability**

* Beginner-friendly UI.
* Tooltip explanation of RAG concepts.

### **6.5 Extensibility**

* Vector index implementation can be swapped (in-memory ANN later).
* Local embeddings could be plugged in (WASM).
* Replace Gemini with any LLM adapter layer.

---

## **7. Technical Architecture**

---

### **7.1 Frontend (Next.js App Router)**

* Document ingestion
* Chunking (initial or full client-side)
* Chat UI
* Local sessionId persistence

### **7.2 Backend**

* A lightweight Node layer inside Next.js API routes:

  * `/session/create`
  * `/session/upload`
  * `/session/embed`
  * `/session/chat`
  * `/session/delete`
* Uses an in-memory Map:

  ```ts
  sessions = {
    [sessionId]: {
      chunks: [],
      embeddings: [],
      createdAt,
      expiresAt
    }
  }
  ```

### **7.3 RAG Pipeline**

1. Query embedding
2. Vector similarity
3. Top chunk selection
4. Prompt assembly
5. Gemini call

---

## **8. Risks & Mitigations**

| Risk                                         | Mitigation                                                            |
| -------------------------------------------- | --------------------------------------------------------------------- |
| Memory leak due to many sessions             | TTL auto-expiration and explicit delete                               |
| Serverless cold starts wiping session memory | Run Node server locally or deploy on persistent runtime               |
| Gemini API receiving user content            | Add optional local redaction + bypass provider logging where possible |
| Poor chunking accuracy                       | Provide adjustable chunk size + simple heuristics                     |

---

## **9. Success Metrics (Learning-focused)**

Since this is a learning project, KPIs are technical, not business:

1. **Correct retrieval grounding ≥ 80%** on test queries.
2. **Latency ≤ 3.0 seconds** per question.
3. **No data remnants** after session deletion.
4. **Developer learning outcomes**:

   * Clear understanding of chunking
   * Ability to debug and inspect embeddings
   * Ability to modify RAG prompt templates
   * Ability to swap embedding model

---

## **10. Future Enhancements**

Optional upgrades if you stop pretending this is “just for learning”:

* Full client-side RAG (no server involvement, max privacy).
* Multi-doc comparison: resume vs JD alignment.
* Auto-generate interview questions.
* Fine-grained section-wise retrieval.
* Real-time annotation and highlighting of snippets used.
* Local embeddings with WASM model for zero upstream data transfer.

---

## **11. Acceptance Criteria**

1. System supports recruiter and job-seeker flows.
2. Users can upload/paste docs without server storage.
3. RAG pipeline works end-to-end:

   * ingestion
   * chunking
   * embedding
   * vector retrieval
   * grounded answer
4. Session fully ephemeral.
5. Chat UI functional with snippet sources.
6. System runs locally or on a dev server with no persistent storage.
7. Gemini integrated for embeddings + generation.
8. Codebase structured for readability and modification.


