'use client';

interface SectionLabelProps {
  children: React.ReactNode;
  tone?: 'orange' | 'gold';
}

export function SectionLabel({ children, tone = 'orange' }: SectionLabelProps) {
  return (
    <span className="eyebrow">
      <span className="dot" style={{
        background: tone === 'gold' ? 'var(--gold)' : 'var(--orange)',
        boxShadow: tone === 'gold'
          ? '0 0 0 4px rgba(212,175,55,0.18)'
          : '0 0 0 4px rgba(255,138,0,0.12)',
      }} />
      {children}
    </span>
  );
}

interface PortraitProps {
  label: string;
  ratio?: string;
  tone?: 'warm' | 'cool' | 'ink';
}

export function Portrait({ label, ratio = '3 / 4', tone = 'warm' }: PortraitProps) {
  const bg =
    tone === 'cool' ? 'linear-gradient(135deg,#E9EDF1 0%,#C9D2DC 60%,#A9B5C2 100%)' :
    tone === 'ink'  ? 'linear-gradient(135deg,#2A2A2E 0%,#1A1A1C 100%)' :
                      'linear-gradient(135deg,#F0E8D6 0%,#E2D6BA 50%,#C4B895 100%)';
  return (
    <div className="portrait" style={{ aspectRatio: ratio, background: bg }}>
      <span className="portrait-caption"
        style={{ color: tone === 'ink' ? 'rgba(255,255,255,0.5)' : 'rgba(60,40,10,0.65)' }}>
        {label}
      </span>
    </div>
  );
}
