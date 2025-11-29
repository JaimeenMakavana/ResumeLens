"use client";

export function FileTypeIndicators() {
  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {/* PDF */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-3 flex items-center justify-center">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect
              x="12"
              y="8"
              width="40"
              height="48"
              rx="2"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.5"
            />
            <path
              d="M12 20 L52 20"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x="32"
              y="38"
              fontSize="10"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
              fontFamily="Arial"
            >
              PDF
            </text>
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-900">PDF</p>
        <p className="text-xs text-gray-500 mt-1">PDF files</p>
      </div>

      {/* DOCX */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-3 flex items-center justify-center">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect
              x="12"
              y="8"
              width="40"
              height="48"
              rx="2"
              fill="#2563EB"
              stroke="#1E40AF"
              strokeWidth="1.5"
            />
            <path
              d="M12 20 L52 20"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x="32"
              y="38"
              fontSize="9"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
              fontFamily="Arial"
            >
              DOCX
            </text>
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-900">DOCX</p>
        <p className="text-xs text-gray-500 mt-1">DOCX files</p>
      </div>

      {/* TXT */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-3 flex items-center justify-center">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect
              x="12"
              y="8"
              width="40"
              height="48"
              rx="2"
              fill="#16A34A"
              stroke="#15803D"
              strokeWidth="1.5"
            />
            <line
              x1="18"
              y1="22"
              x2="46"
              y2="22"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="18"
              y1="30"
              x2="46"
              y2="30"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="18"
              y1="38"
              x2="40"
              y2="38"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-900">TXT</p>
        <p className="text-xs text-gray-500 mt-1">TXT files</p>
      </div>
    </div>
  );
}

