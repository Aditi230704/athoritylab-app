'use client';
import { useState } from 'react';
import { Logo } from './logo';
import { Icon } from './icons';
import type { Page } from '@/types';

const FOOTER_COLS = [
  { h: 'Platform', items: [['Home', 'home'], ['About', 'about'], ['Services', 'services']] },
  { h: 'Network',  items: [['Community', 'community'], ['Tools', 'tools'], ['Pro', 'pro']] },
  { h: 'Company',  items: [['Careers', '#'], ['Press', '#'], ['Contact', '#']] },
] as const;

export function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const [email, setEmail] = useState('');
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-warm)', marginTop: 80 }}>
      <div className="shell" style={{ padding: '72px 32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1.2fr', gap: 40 }}>
          <div>
            <Logo />
            <p className="lead" style={{ fontSize: 14.5, marginTop: 18, maxWidth: '32ch' }}>
              A founder ecosystem for visibility, authority, and opportunity. Built for the internet-native generation.
            </p>
            <div className="flex gap-2 mt-6">
              <a className="chip" href="#"><Icon name="linkedin" size={14} /> LinkedIn</a>
              <a className="chip" href="#"><Icon name="x" size={14} /> X</a>
            </div>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.h}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{col.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(([label, id]) => (
                  <li key={label}>
                    <button
                      onClick={() => id !== '#' && setPage(id as Page)}
                      style={{ color: 'var(--ink-2)', fontSize: 14, padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Stay in the loop</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input className="input" placeholder="you@founder.com" value={email}
                onChange={e => setEmail(e.target.value)} style={{ height: 44, fontSize: 14 }} />
              <button className="btn btn-primary btn-sm" style={{ height: 44 }}><Icon name="arrow" size={16} /></button>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 10 }}>Founder essays. Once a week. No noise.</p>
          </div>
        </div>
        <div className="hairline" style={{ margin: '48px 0 24px' }} />
        <div className="flex jcb aic" style={{ flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>
            © 2026 AthorityLab. Made for founders who are ready to be seen.
          </p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Security'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'var(--ink-3)' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
