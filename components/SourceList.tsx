import React from 'react';
import { Source } from '@/lib/types';
import { ExternalLink, Calendar, BookOpen } from 'lucide-react';

interface Props {
  sources: Source[];
  className?: string;
}

export const SourceList: React.FC<Props> = ({ sources, className = '' }) => {
  if (!sources || sources.length === 0) {
    return <span className="text-xs text-[#8B929A] italic">No direct primary citations attributed.</span>;
  }

  return (
    <div className={`space-y-2 text-xs ${className}`}>
      <div className="text-[#5E646A] font-semibold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
        <BookOpen className="w-3 h-3 text-[#16423C]" />
        Primary Source & Filing Citations
      </div>
      <div className="space-y-1.5">
        {sources.map((src, i) => (
          <div
            key={i}
            className="p-2.5 rounded bg-[#F7F5F0] border border-[#E8E5DE] flex flex-col gap-1 text-[11px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#14171A]">{src.publisher}</span>
              <span className="text-[#8B929A] font-mono text-[10px] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {src.date}
              </span>
            </div>
            <p className="text-[#5E646A] leading-relaxed">{src.note}</p>
            {src.url && (
              <a
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#16423C] hover:text-[#2D6A4F] font-semibold mt-0.5"
              >
                Inspect official publication
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
