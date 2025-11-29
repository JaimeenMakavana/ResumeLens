"use client";

import { useDocumentStore } from "@/stores/documentStore";
import { FileText } from "@/components/ui/icons";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-900 mb-3">{title}</h3>
      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        {children}
      </div>
      <div className="border-t border-gray-200 mt-4"></div>
    </div>
  );
}

export function DocumentPreview() {
  const { fileName, fileType, rawText } = useDocumentStore();

  if (!fileName && !rawText) {
    return null;
  }

  // Simple parsing attempt - in production, this would use proper parsing
  const text = rawText || "";
  const lines = text.split("\n").filter((line) => line.trim());

  // Try to extract structured information (basic heuristic parsing)
  const extractSection = (keywords: string[]) => {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (keywords.some((kw) => line.includes(kw))) {
        const startIdx = i + 1;
        let endIdx = lines.length;
        // Find next section or end
        for (let j = startIdx; j < lines.length; j++) {
          const nextLine = lines[j].toLowerCase();
          if (
            (nextLine.includes("contact") && !keywords.includes("contact")) ||
            nextLine.includes("skills") ||
            nextLine.includes("experience") ||
            nextLine.includes("education") ||
            nextLine.includes("about")
          ) {
            endIdx = j;
            break;
          }
        }
        return lines.slice(startIdx, endIdx).join("\n").trim();
      }
    }
    return null;
  };

  const contactInfo = extractSection(["contact", "name", "email", "phone", "linkedin"]) || 
    lines.slice(0, Math.min(5, lines.length)).join("\n");
  const skills = extractSection(["skills", "technical skills", "technologies"]) || "";
  const languages = extractSection(["languages", "language"]) || "";
  const about = extractSection(["about", "summary", "objective", "profile"]) || 
    (text.length > 200 ? text.substring(0, 300) + "..." : text);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Document Preview</h3>
          {fileName && (
            <p className="text-sm text-gray-500">
              {fileName} ({fileType?.toUpperCase()})
            </p>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
        {contactInfo && (
          <Section title="Contact">
            {contactInfo.split("\n").map((line, idx) => (
              <div key={idx}>{line || "\n"}</div>
            ))}
          </Section>
        )}

        {skills && (
          <Section title="Skills">
            {skills.split("\n").map((line, idx) => (
              <div key={idx}>{line || "\n"}</div>
            ))}
          </Section>
        )}

        {languages && (
          <Section title="Languages">
            {languages.split("\n").map((line, idx) => (
              <div key={idx}>{line || "\n"}</div>
            ))}
          </Section>
        )}

        {about && (
          <Section title="About Me">
            {about.split("\n").map((line, idx) => (
              <div key={idx}>{line || "\n"}</div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

