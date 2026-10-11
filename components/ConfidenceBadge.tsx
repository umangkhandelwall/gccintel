import React from 'react';
import { ConfidenceLevel } from '@/lib/types';
import { ShieldCheck, ShieldAlert, AlertCircle } from 'lucide-react';

interface Props {
  level: ConfidenceLevel;
  className?: string;
}

export const ConfidenceBadge: React.FC<Props> = ({ level, className = '' }) => {
  switch (level) {
    case 'high':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] ${className}`}
          title="Verified against multiple primary regulatory and ROC company filings"
        >
          <ShieldCheck className="w-3 h-3 text-[#2E7D32]" />
          Verified
        </span>
      );
    case 'medium':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FFF8E1] text-[#F57F17] border border-[#FFE082] ${className}`}
          title="Sourced from credible secondary publications or executive press releases"
        >
          <ShieldAlert className="w-3 h-3 text-[#F57F17]" />
          Audited
        </span>
      );
    case 'low':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2] ${className}`}
          title="Aggregated estimate or directional signal. Pending primary ROC audit."
        >
          <AlertCircle className="w-3 h-3 text-[#C62828]" />
          Estimate
        </span>
      );
  }
};
