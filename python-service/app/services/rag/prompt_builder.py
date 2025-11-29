"""RAG prompt template builder."""

RAG_PROMPT_TEMPLATE = """You are a helpful assistant answering questions based on the provided document snippets.

Context snippets:
{context}

Question: {query}

Instructions:
- Answer using ONLY the information from the snippets above
- If the information is not in the snippets, say so explicitly
- Cite which snippet(s) you used (by ID: chunk-0, chunk-1, etc.)
- Be concise and accurate

Answer:
"""


def build_prompt(query: str, chunks: list, chunk_prefix: str = "chunk") -> str:
    """Build RAG prompt with context."""
    context_parts = []
    for i, chunk in enumerate(chunks):
        chunk_id = f"{chunk_prefix}-{i}"
        context_parts.append(f"[{chunk_id}]\n{chunk.text}")

    context = "\n\n".join(context_parts)

    return RAG_PROMPT_TEMPLATE.format(context=context, query=query)

