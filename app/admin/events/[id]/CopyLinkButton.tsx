"use client";
import { useState } from "react";

export default function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium shadow-sm transition-all duration-150 relative group ${copied ? 'ring-2 ring-blue-400' : ''}`}
      title={copied ? "Link copiado!" : "Copiar link compartilhável"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 6h2.25A2.25 2.25 0 0 1 18 8.25v7.5A2.25 2.25 0 0 1 15.75 18h-7.5A2.25 2.25 0 0 1 6 15.75V13.5m3-7.5H8.25A2.25 2.25 0 0 0 6 8.25v7.5A2.25 2.25 0 0 0 8.25 18h7.5A2.25 2.25 0 0 0 18 15.75V13.5m-7.5-7.5L15 15"
        />
      </svg>
      {copied ? (
        <span className="text-green-600 font-semibold animate-pulse">Copiado!</span>
      ) : (
        <span>Copiar link</span>
      )}
    </button>
  );
} 