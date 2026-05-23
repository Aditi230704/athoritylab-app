'use client';
import { useState } from 'react';
import { Icon } from '../icons';
import { SectionLabel } from '../section-label';
import { PricingCard } from '../home';
import type { Page } from '@/types';

export function ProPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main>
      <section style={{ padding: '96px 0 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 80% 0%,rgba(212,175,55,0.18) 0%,transparent 60%),radial-gradient(50% 60% at 0% 100%,rgba(255,138,0,0.10) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div className="shell" style={{ position: 'relative' }}>
          <SectionLabel tone="gold">AthorityLab Pro</SectionLabel>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px,6.4vw,96px)', margin: '20px 0 18px' }}>
            The full <span className="it">founder ecosystem</span>,<br />for less than a dinner.
          </h1>
          <p className="lead" style={{ fontSize: 20, maxWidth: 700 }}>
            ₹499/month in India. $7/month globally. Community, tools, opportunities, and warm intros. Cancel anytime.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 80 }}>
        <div className="shell" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <PricingCard name="Free" desc="The orientation tier. Pricing-free entry." price="₹0" unit="forever"
            features={[['Community, view-only',true],['Opportunity feed (24h delayed)',true],['Tool previews',true],['1 free Visibility Score',true],['Investor Discovery (full)',false],['Warm intros & DM channels',false],['Founder dinners',false]]}
            cta="Start free" onClick={() => setPage('auth')} />
          <PricingCard featured name="Pro" desc="The founder ecosystem, fully unlocked." price="₹499" unit="/ month · billed monthly" alt="$7 / month globally · cancel anytime"
            features={[['Founder community (all rooms)',true],['Investor Discovery (8,400+)',true],['Startup Readiness tool',true],['Founder Visibility Score',true],['Premium opportunity feed (live)',true],['3 warm intros / month',true],['Founder dinners + retreats',true]]}
            cta="Join Pro now" onClick={() => setPage('auth')} />
        </div>

        <div className="shell mt-14">
          <div className="card" style={{ padding: 36, background: '#fff' }}>
            <SectionLabel>Pro includes</SectionLabel>
            <div className="grid grid-3 mt-6">
              {[
                { icon: 'users' as const, t: 'Founder community access', b: 'Every curated room, every dinner, every Friday open house.' },
                { icon: 'compass' as const, t: 'Investor Discovery tool', b: '8,400+ active investors. Filters, exports, warmth paths.' },
                { icon: 'check' as const, t: 'Startup Readiness tool', b: 'Full readiness score plus a personalised 3-week fix list.' },
                { icon: 'network' as const, t: 'Founder networking', b: 'Warm intros, DM channels, and a 24h response culture.' },
                { icon: 'diamond' as const, t: 'Premium opportunities', b: 'Curated grants, podcast slots, accelerator and platform deals.' },
                { icon: 'eye' as const, t: 'Advanced visibility tools', b: 'Search-surface scans, mention alerts, weekly authority reports.' },
              ].map(p => (
                <div key={p.t} className="flex gap-3" style={{ alignItems: 'flex-start' }}>
                  <span style={{ width:36,height:36,borderRadius:10,background:'var(--bg-soft)',color:'var(--ink)',display:'grid',placeItems:'center',flexShrink:0 }}><Icon name={p.icon} size={16} /></span>
                  <div>
                    <div style={{ fontSize:15,fontWeight:600,color:'var(--ink)' }}>{p.t}</div>
                    <div style={{ fontSize:13.5,color:'var(--ink-3)',marginTop:4,lineHeight:1.55 }}>{p.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="shell mt-10">
          <div className="card" style={{ padding:28,background:'var(--bg-warm)',display:'flex',gap:24,alignItems:'center',flexWrap:'wrap' }}>
            <Icon name="globe" size={20} style={{ color: 'var(--gold)' }} />
            <div style={{ flex:1,minWidth:200 }}>
              <div style={{ fontSize:15,fontWeight:600,color:'var(--ink)' }}>Pricing by geography</div>
              <div className="muted" style={{ fontSize:13.5,marginTop:2 }}>₹499 in India · $7 in US, EU, UK, SEA, AU · cancel anytime, no annual lock-in.</div>
            </div>
            <button className="btn btn-gold" onClick={() => setPage('auth')}>Apply for Pro</button>
          </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  const faqs = [
    ['Is this an agency?', 'We\'re a hybrid — an ecosystem with hands-on services. You can be a free member, a Pro member, or hire us for a service track. Most founders start free, upgrade to Pro, and add a service when they\'re ready.'],
    ['Do you guarantee follower counts?', 'No. We guarantee craft, cadence, and access. Followers follow when the work is good and the distribution is engineered. We won\'t promise vanity numbers.'],
    ['What if I\'m pre-launch?', 'Perfect time. The founders who are visible before launch raise faster, hire better, and get a head start on the trust your product will need.'],
    ['How is Pro different from free?', 'Free is for orientation — community is view-only, opportunities are delayed 24h, tools are preview-only. Pro unlocks every room, the live opportunity feed, full tools, and warm intros.'],
    ['Can I cancel any time?', 'Yes. No contract, no annual lock-in. Cancel from your dashboard.'],
  ] as [string, string][];
  return (
    <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--line-warm)' }}>
      <div className="shell">
        <div className="flex jcb" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          <div>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="h-display" style={{ fontSize: 'clamp(32px,3.6vw,52px)', margin: '16px 0 0' }}>Honest answers.</h2>
          </div>
        </div>
        <div className="card" style={{ background: '#fff', overflow: 'hidden' }}>
          {faqs.map(([q, a], i) => (
            <div key={q} style={{ borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', textAlign: 'left', padding: '22px 28px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 17, fontWeight: 500, color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>{q}</span>
                <span style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .2s ease', color: 'var(--ink-3)' }}>
                  <Icon name="plus" size={18} />
                </span>
              </button>
              <div style={{ maxHeight: open === i ? 220 : 0, overflow: 'hidden', transition: 'max-height .3s ease', padding: open === i ? '0 28px 22px' : '0 28px' }}>
                <p style={{ fontSize: 15, color: 'var(--ink-3)', margin: 0, lineHeight: 1.6, maxWidth: 760 }}>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
