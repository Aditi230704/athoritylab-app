'use client';
import { Icon } from '../icons';
import type { Page } from '@/types';

export function FinalCTASmall({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="shell">
        <div className="card" style={{ padding: 56, background: 'linear-gradient(135deg,#0F0F12 0%,#1A1A1E 100%)', color: '#fff', border: 'none', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 80% 0%,rgba(212,175,55,0.22) 0%,transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'center' }}>
            <div>
              <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <span className="dot" style={{ background: 'var(--gold)', boxShadow: '0 0 0 4px rgba(212,175,55,0.18)' }} />
                Start free
              </span>
              <h2 className="h-display" style={{ color: '#fff', fontSize: 'clamp(30px,3.4vw,48px)', margin: '14px 0 12px' }}>
                Visibility builds trust. Trust unlocks{' '}
                <span className="it" style={{ color: '#F4D58D' }}>opportunities</span>.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: 540 }}>
                Free to start. ₹499 / $7 a month to unlock the full ecosystem.
              </p>
            </div>
            <div className="flex gap-3 jcc">
              <button className="btn btn-gold btn-lg" onClick={() => setPage('auth')}>Start free</button>
              <button className="btn btn-ghost btn-lg" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }} onClick={() => setPage('pro')}>Join Pro</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
