'use client';

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <button className="logo" onClick={onClick} aria-label="AthorityLab"
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
      <span className="logo-mark" />
      <span>Athority<span style={{ color: 'var(--ink-3)', fontStyle: 'italic' }}>Lab</span></span>
    </button>
  );
}
