'use client';

import React, { useState } from 'react';
import { 
  Terminal, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  BookOpen, 
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface Citation {
  id: string;
  entity: string;
  url: string;
  publisher: string;
  note: string;
}

interface ApiResponse {
  answer: string;
  citations: Citation[];
  grounded: boolean;
}

export default function AskPage() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const sampleQuestions = [
    'How many GCCs are actually in India and why do reports disagree?',
    'What is the rent difference between Bengaluru and Hyderabad for Grade-A space?',
    'What payroll subsidies does Tamil Nadu offer for high-value GCC hires?',
    'Which multinationals are coming next in the GCC pipeline?',
    'Who are the top setup advisors and what do they charge?',
    'Tell me about Microsoft India Development Center in Bengaluru',
    'Who is the CEO of an unverified speculative startup in 2030?' // Triggers explicit refusal
  ];

  const handleSubmit = async (qText?: string) => {
    const q = qText || question;
    if (!q.trim() || loading) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (e) {
      setResponse({
        answer: 'Failed to retrieve response from intelligence API.',
        citations: [],
        grounded: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0EDE6] text-[#16423C] border border-[#E0DCD3]">
          <Terminal className="w-3.5 h-3.5" />
          <span>Grounded Retrieval Terminal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#14171A] font-editorial">
          Query the GCC Knowledge Graph
        </h1>
        <p className="text-sm sm:text-base text-[#5E646A] leading-relaxed max-w-2xl">
          Ask complex questions about commercial office rents, state subsidy eligibility, count reconciliations, or specific entity structures. Every response is <strong>synthesized strictly from verified dataset rows</strong> and carries verifiable primary citations.
        </p>
      </div>

      {/* Terminal Input Box */}
      <div className="p-6 bg-white border border-[#E8E5DE] rounded-xl shadow-xs space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="e.g., Why do GCC count reports disagree? or What is Grade-A rent in Hyderabad?"
            className="flex-1 bg-[#FDFBF7] border border-[#DCD7CE] rounded-lg px-4 py-3 text-sm text-[#14171A] placeholder-[#8B929A] focus:outline-none focus:border-[#16423C] transition"
          />
          <button
            onClick={() => handleSubmit()}
            disabled={loading || !question.trim()}
            className="px-5 py-3 rounded-lg bg-[#16423C] hover:bg-[#2D6A4F] text-white font-semibold text-sm transition disabled:opacity-50 flex items-center gap-2 shrink-0 shadow-sm"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Execute Query</span>
          </button>
        </div>

        {/* Verification Prompts */}
        <div className="space-y-2 pt-2 border-t border-[#F0EDE6]">
          <span className="text-[11px] text-[#5E646A] font-semibold uppercase tracking-wider block">
            Suggested Verification Inquiries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((sq, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuestion(sq);
                  handleSubmit(sq);
                }}
                className="px-2.5 py-1.5 rounded bg-[#F7F5F0] border border-[#E8E5DE] hover:border-[#D1CDC4] text-[#4A5056] hover:text-[#14171A] text-xs text-left transition"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="p-10 bg-white border border-[#E8E5DE] rounded-xl flex items-center justify-center gap-3 text-[#5E646A] text-xs">
          <Sparkles className="w-4 h-4 text-[#16423C] animate-spin" />
          <span>Searching verified primary rows, resolving entity links, and synthesizing citations...</span>
        </div>
      )}

      {/* Response Display Canvas */}
      {response && !loading && (
        <div className={`p-8 bg-white border rounded-xl shadow-xs space-y-6 ${
          response.grounded ? 'border-[#E8E5DE]' : 'border-[#FFCDD2] bg-[#FFFBFA]'
        }`}>
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-[#E8E5DE] pb-4">
            <div className="flex items-center gap-2">
              {response.grounded ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Grounded in Verified Primary Records
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Explicit Refusal / Out of Dataset Scope
                </span>
              )}
            </div>
            <span className="text-xs font-mono text-[#5E646A]">
              {response.citations.length} Verified Sources Attributed
            </span>
          </div>

          {/* Answer Text */}
          <div className="text-sm sm:text-base text-[#14171A] leading-relaxed whitespace-pre-line">
            {response.answer}
          </div>

          {/* Citation List */}
          {response.citations.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#E8E5DE]">
              <div className="text-xs font-semibold text-[#5E646A] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#16423C]" />
                Primary Source Audit Trail
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {response.citations.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-lg bg-[#F7F5F0] border border-[#E8E5DE] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-[#14171A]">
                      <span>{c.publisher}</span>
                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#16423C] hover:text-[#2D6A4F] flex items-center gap-1 text-[11px]"
                        >
                          Verify Source
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    <div className="text-[#5E646A] text-[11px] leading-relaxed">
                      {c.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
