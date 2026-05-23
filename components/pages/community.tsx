'use client';
import { Icon } from '../icons';
import { SectionLabel } from '../section-label';
import { FinalCTASmall } from './shared';
import type { Page } from '@/types';

const ROOMS = [
  { name: 'Fundraising · Pre-seed', count: 148, on: 12, color: '#FF8A00', topic: 'Antler India week-2 questions' },
  { name: 'Indian SaaS Founders', count: 312, on: 28, color: '#D4AF37', topic: 'Pricing pages that convert in 2026' },
  { name: 'Bay Area Founders', count: 196, on: 14, color: '#6F86A6', topic: 'First-3-hire mistakes thread' },
  { name: 'Solo Founders', count: 244, on: 22, color: '#3F3F47', topic: 'Co-founder dating without the cringe' },
  { name: 'AI / ML Builders', count: 421, on: 41, color: '#FF8A00', topic: 'Open-source vs proprietary moats' },
  { name: 'Climate Founders', count: 88, on: 6, color: '#5D7A55', topic: 'Grant runway between rounds' },
  { name: 'Female Founders', count: 178, on: 19, color: '#C46A82', topic: 'Negotiating term sheets' },
  { name: 'Bootstrapped', count: 132, on: 11, color: '#D4AF37', topic: 'When to take the first cheque' },
];

export function CommunityPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main>
      <section style={{ padding: '96px 0 56px' }}>
        <div className="shell">
          <SectionLabel>Founder Community</SectionLabel>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px,6vw,92px)', margin: '20px 0 16px' }}>
            The quiet room<br />where founders <span className="it">actually help</span> each other.
          </h1>
          <p className="lead" style={{ fontSize: 19, maxWidth: 720 }}>
            No Discord chaos. No LinkedIn theatre. Curated rooms by stage, geography, and category — where founders trade real intros, real decks, and real questions with people who&apos;ve shipped.
          </p>
          <div className="flex gap-3 mt-8">
            <button className="btn btn-primary btn-lg" onClick={() => setPage('auth')}>Join Community <Icon name="arrow" size={16} /></button>
            <button className="btn btn-ghost btn-lg" onClick={() => setPage('pro')}>Pro includes everything</button>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--line-warm)', borderBottom: '1px solid var(--line-warm)' }}>
        <div className="shell">
          <div className="flex gap-8 jcb" style={{ flexWrap: 'wrap' }}>
            {[['2,400+','founders inside'],['38','countries'],['180+','monthly opportunities'],['24h','intro response time'],['12','founder dinners / quarter']].map(([n,l]) => (
              <div key={l}>
                <div className="h-display" style={{ fontSize: 34, color: 'var(--ink)' }}>{n}</div>
                <div className="muted" style={{ fontSize: 13 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="flex jcb" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
            <div>
              <SectionLabel>Inside the rooms</SectionLabel>
              <h2 className="h-display" style={{ fontSize: 'clamp(32px,3.6vw,52px)', margin: '16px 0 0' }}>
                {ROOMS.length} curated rooms. <span className="it">Quietly active.</span>
              </h2>
            </div>
            <div className="flex gap-2 aic">
              <Icon name="users" size={14} style={{ color: 'var(--ink-3)' }} />
              <span className="muted" style={{ fontSize: 13.5 }}>193 founders online right now</span>
            </div>
          </div>
          <div className="grid grid-3">
            {ROOMS.map(r => (
              <div key={r.name} className="card card-hover" style={{ padding: 22, background: '#fff' }}>
                <div className="flex jcb aic">
                  <div className="flex aic gap-3">
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: r.color, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 12 }}>
                      {r.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
                    </span>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>{r.name}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{r.count} members</div>
                    </div>
                  </div>
                  <div className="flex aic gap-2">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)' }} />
                    <span style={{ fontSize: 11.5, color: 'var(--orange)', fontWeight: 600 }}>{r.on}</span>
                  </div>
                </div>
                <div className="hairline mt-4 mb-4" />
                <div className="muted" style={{ fontSize: 12.5, marginBottom: 4 }}>Latest thread</div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.4 }}>{r.topic}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--line-warm)' }}>
        <div className="shell">
          <SectionLabel tone="gold">Rituals</SectionLabel>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px,3.6vw,52px)', margin: '16px 0 32px' }}>
            The community has a <span className="it">cadence.</span>
          </h2>
          <div className="grid grid-2">
            {[
              { icon: 'cal' as const, t: 'Founder dinners', b: 'Monthly dinners in Bengaluru, Mumbai, San Francisco, New York and London. Hosted by a Pro member. 12 seats.' },
              { icon: 'users' as const, t: 'Friday office hours', b: 'Open Zoom every Friday with rotating operator-investor guests. Bring a question, leave with a doc.' },
              { icon: 'book' as const, t: 'Founder essays', b: 'A members-only digest of long-form essays — drafted in public, edited by the community.' },
              { icon: 'flag' as const, t: 'Quarterly retreats', b: 'Two days, twenty founders, one undisclosed location. By application.' },
            ].map(it => (
              <div key={it.t} className="card" style={{ padding: 26, background: '#fff' }}>
                <div className="flex aic gap-3 mb-3">
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--gold-tint)', color: '#7A5A0F', display: 'grid', placeItems: 'center' }}>
                    <Icon name={it.icon} size={18} />
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)', margin: 0, fontWeight: 500 }}>{it.t}</h3>
                </div>
                <p style={{ fontSize: 14.5, color: 'var(--ink-3)', margin: 0, lineHeight: 1.6 }}>{it.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASmall setPage={setPage} />
    </main>
  );
}
