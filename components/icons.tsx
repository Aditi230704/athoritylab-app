'use client';

export type IconName =
  | 'arrow' | 'arrowUR' | 'check' | 'spark' | 'user' | 'users' | 'lock' | 'eye'
  | 'chart' | 'handshake' | 'target' | 'compass' | 'megaphone' | 'linkedin' | 'x'
  | 'reddit' | 'sparkle' | 'bolt' | 'grid' | 'play' | 'quote' | 'globe' | 'plus'
  | 'close' | 'chevR' | 'chevD' | 'star' | 'heart' | 'message' | 'repeat' | 'flame'
  | 'rocket' | 'network' | 'layers' | 'crown' | 'flag' | 'book' | 'mail' | 'phone'
  | 'cal' | 'pin' | 'bell' | 'diamond';

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function Icon({ name, size = 18, stroke = 1.6, style, className }: IconProps) {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const, style, className,
  };
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    arrowUR: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
    check: <path d="M5 12.5 10 17.5 19.5 7" />,
    spark: <><path d="M12 3v4" /><path d="M12 17v4" /><path d="M3 12h4" /><path d="M17 12h4" /><path d="m5.6 5.6 2.8 2.8" /><path d="m15.6 15.6 2.8 2.8" /><path d="m18.4 5.6-2.8 2.8" /><path d="m8.4 15.6-2.8 2.8" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4.5 5-7 8-7s6.5 2.5 8 7" /></>,
    users: <><circle cx="9" cy="9" r="3.5" /><path d="M2.5 19c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7" /><path d="M21.5 18c-.5-2.5-2-4-4-4.5" /></>,
    lock: <><rect x="4" y="11" width="16" height="10" rx="2.5" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
    chart: <><path d="M4 20V8" /><path d="M10 20V4" /><path d="M16 20v-8" /><path d="M22 20H2" /></>,
    handshake: <><path d="m11 16-2-2 4-4 2 2" /><path d="M3 12 7 8l3 3" /><path d="m13 18 4-4-2-2" /><path d="m17 14 4-4-4-4-3 3" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m9.5 14.5 1.5-4 4-1.5-1.5 4Z" /></>,
    megaphone: <><path d="M3 11v2a2 2 0 0 0 2 2h1l3 4V7L6 11H5a2 2 0 0 0-2 0Z" /><path d="M9 7v10l11 4V3Z" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7" /><circle cx="8" cy="7" r="1" fill="currentColor" stroke="none" /><path d="M12 17v-4a2 2 0 0 1 4 0v4" /><path d="M12 10v7" /></>,
    x: <><path d="M4 4 20 20" /><path d="M20 4 4 20" /></>,
    reddit: <><circle cx="12" cy="13" r="8" /><circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" /><path d="M9 16c.8.7 1.9 1 3 1s2.2-.3 3-1" /><circle cx="19" cy="6" r="1.5" /><path d="M12 5 14 3" /></>,
    sparkle: <><path d="M12 3 13.6 9 19 10.6 13.6 12.2 12 18 10.4 12.2 5 10.6 10.4 9Z" /><path d="M19 16 19.7 18 21.7 18.7 19.7 19.4 19 21.4 18.3 19.4 16.3 18.7 18.3 18Z" /></>,
    bolt: <path d="M13 3 4 14h6l-1 7 9-11h-6Z" />,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.4" /><rect x="14" y="3" width="7" height="7" rx="1.4" /><rect x="3" y="14" width="7" height="7" rx="1.4" /><rect x="14" y="14" width="7" height="7" rx="1.4" /></>,
    play: <path d="M7 4v16l13-8Z" />,
    quote: <><path d="M7 7h4v6c0 2-1.5 3.5-3.5 3.5" /><path d="M14 7h4v6c0 2-1.5 3.5-3.5 3.5" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9Z" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    close: <><path d="M6 6 18 18" /><path d="M18 6 6 18" /></>,
    chevR: <path d="m9 6 6 6-6 6" />,
    chevD: <path d="m6 9 6 6 6-6" />,
    star: <path d="m12 3 2.6 5.6L20 9.4l-4 4 1 5.6L12 16.5 6.9 19l1.1-5.6-4-4 5.4-.8Z" />,
    heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />,
    message: <path d="M4 5h16v11H8l-4 4Z" />,
    repeat: <><path d="M17 2 21 6l-4 4" /><path d="M3 12V9a3 3 0 0 1 3-3h15" /><path d="M7 22 3 18l4-4" /><path d="M21 12v3a3 3 0 0 1-3 3H3" /></>,
    flame: <path d="M12 3s5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 1-3s1 2 3 2c0-3-1-5-1-7s1-2 2-2Z" />,
    rocket: <><path d="M5 19s-2-4 2-8c3-3 7-4 9-4-1 3-1 6-4 9-4 3-7 3-7 3Z" /><path d="m5 19 3-3" /><circle cx="14" cy="10" r="1.4" /></>,
    network: <><circle cx="5" cy="6" r="2.2" /><circle cx="19" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" /><path d="M7 6h10" /><path d="m7 8 4 8" /><path d="m17 8-4 8" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /><path d="m3 18 9 5 9-5" /></>,
    crown: <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5Z" />,
    flag: <><path d="M5 21V4" /><path d="M5 4h13l-2 4 2 4H5" /></>,
    book: <><path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3 3Z" /><path d="M4 4v17" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></>,
    phone: <path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
    cal: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M8 3v4" /><path d="M16 3v4" /></>,
    pin: <><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.4" /></>,
    bell: <><path d="M6 17V11a6 6 0 1 1 12 0v6" /><path d="M4 17h16" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
    diamond: <path d="M12 2 22 12 12 22 2 12Z" />,
  };
  return <svg {...props}>{paths[name] ?? null}</svg>;
}
