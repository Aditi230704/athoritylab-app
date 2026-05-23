'use client';
import { Icon } from '../icons';
import { SectionLabel } from '../section-label';
import { Portrait } from '../section-label';
import { FinalCTASmall } from './shared';
import type { Page } from '@/types';

export function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main>
      <section style={{ padding: '96px 0 64px', background: 'var(--bg)' }}>
        <div className="shell">
          <SectionLabel>About AthorityLab</SectionLabel>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px,6vw,92px)', margin: '20px 0 0', lineHeight: 1.02 }}>
            <span style={{ display: 'block' }}>Modern founders</span>
            <span className="it" style={{ display: 'block', color: 'var(--ink-3)' }}>need more than</span>
            <span style={{ display: 'block' }}>good content.</span>
          </h1>
        </div>
      </section>

      <section style={{ padding: '20px 0 96px', background: 'var(--bg)' }}>
        <div className="shell">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 100 }}>
              <Portrait label="FOUNDERS · 2026" ratio="3 / 4" />
              <div className="card" style={{ padding: 18, marginTop: -42, marginLeft: 24, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', maxWidth: 240, position: 'relative' }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Founded 2024</div>
                <p style={{ fontSize: 13.5, color: 'var(--ink-2)', margin: 0, lineHeight: 1.5 }}>Built by founders who got tired of watching better builders stay invisible.</p>
              </div>
            </div>
            <div>
              <p className="lead" style={{ fontSize: 21, color: 'var(--ink-2)', maxWidth: 'none' }}>
                They need <span style={{ color: 'var(--ink)' }}>visibility</span>.{' '}
                They need <span style={{ color: 'var(--ink)' }}>trust</span>.{' '}
                They need <span style={{ color: 'var(--ink)' }}>positioning</span>.{' '}
                They need <span style={{ color: 'var(--ink)' }}>meaningful connections</span>.{' '}
                They need <span style={{ color: 'var(--ink)' }}>opportunity access</span>.
              </p>
              <div className="hairline mt-10 mb-8" />
              <h2 className="h-display" style={{ fontSize: 38, margin: 0 }}>The philosophy.</h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 16 }}>
                The internet rewards founders who are <em>visible</em>, <em>respected</em>, and <em>consistently present</em> online. Authority is no longer a side-effect of being good. It&apos;s a precondition for being chosen.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 14 }}>
                We&apos;re not a marketing agency. We&apos;re not a course. We&apos;re an ecosystem — the place where founders build the voice, the network, and the gravity that opens doors before they have to knock.
              </p>
              <div className="grid grid-2 mt-10">
                {[
                  { t: 'We don\'t grow vanity numbers.', b: 'We grow how easily the right person finds you.' },
                  { t: 'We don\'t write your voice for you.', b: 'We sharpen the one you\'ve been muting.' },
                  { t: 'We don\'t promise viral moments.', b: 'We engineer compounding familiarity.' },
                  { t: 'We don\'t replace the work.', b: 'We make sure the work is finally seen.' },
                ].map((v, i) => (
                  <div key={i} className="card" style={{ padding: 22 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--ink)', margin: 0, fontWeight: 500 }}>{v.t}</h3>
                    <p style={{ fontSize: 14, color: 'var(--ink-3)', margin: '8px 0 0' }}>{v.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--line-warm)' }}>
        <div className="shell">
          <div className="flex jcb" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div>
              <SectionLabel tone="gold">Why we built this</SectionLabel>
              <h2 className="h-display" style={{ fontSize: 'clamp(34px,4vw,56px)', margin: '16px 0 0' }}>The internet&apos;s <span className="it">authority gap</span>.</h2>
            </div>
          </div>
          <div className="grid grid-3">
            {[
              { n: '01', t: 'Talent is no longer the bottleneck.', b: 'There are more good founders than ever. The bottleneck is who gets seen, trusted, and remembered.' },
              { n: '02', t: 'Distribution moved to platforms.', b: 'Every founder is a media company now — whether they wanted that job or not.' },
              { n: '03', t: 'Trust is the new compounding asset.', b: 'Investors, partners and hires bet on familiarity. The visible founder gets the warm intro every time.' },
            ].map(c => (
              <div key={c.n} className="card" style={{ padding: 28, background: '#fff' }}>
                <span className="h-display" style={{ fontSize: 28, color: 'var(--gold)' }}>{c.n}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)', margin: '12px 0 8px', fontWeight: 500 }}>{c.t}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--ink-3)', margin: 0, lineHeight: 1.6 }}>{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="flex jcb" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
            <div>
              <SectionLabel>The team</SectionLabel>
              <h2 className="h-display" style={{ fontSize: 'clamp(34px,4vw,56px)', margin: '16px 0 0' }}>Operators, writers, ex-VCs.</h2>
            </div>
          </div>
          <div className="grid grid-4">
            {[
              { n: 'Naveen Arora', r: 'Founder & CEO', b: '2x founder, ex-Sequoia Surge.', c: 'warm' as const },
              { n: 'Priya Mathur', r: 'Head of Authority', b: 'Ex-newsroom, 12M+ ghostwritten impressions.', c: 'warm' as const },
              { n: 'Sebastian Wu', r: 'Head of Community', b: 'Built On Deck\'s founder circles.', c: 'cool' as const },
              { n: 'Aarav Khanna', r: 'Head of Opportunity', b: 'Ex-VC, scout @ Antler.', c: 'ink' as const },
            ].map(p => (
              <div key={p.n}>
                <Portrait label={p.n.toUpperCase()} ratio="4 / 5" tone={p.c} />
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{p.n}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{p.r}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 6 }}>{p.b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASmall setPage={setPage} />
    </main>
  );
}
