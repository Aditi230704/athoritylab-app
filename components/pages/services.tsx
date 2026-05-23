'use client';
import { useState } from 'react';
import { Icon } from '../icons';
import { SectionLabel } from '../section-label';
import { FinalCTASmall } from './shared';
import type { Page } from '@/types';
import type { IconName } from '../icons';

const FULL_SERVICES = [
  { id: 1, icon: 'linkedin' as IconName, title: 'LinkedIn Personal Branding', tag: 'Solo · most popular', problem: 'Your profile reads like a resume. Your posts read like an apology. Investors and operators check LinkedIn first — yet you treat it like a Rolodex.', included: ['Founder positioning workshop','Profile rewrite (headline, About, featured)','Weekly post strategy + 4 ghost-written posts','Comment strategy on 25 target profiles','Monthly metric review with your strategist'], outcomes: ['Profile views up 5–15× in 60 days','First inbound founder/investor DMs','Recognised in your category'], who: 'Founders, ex-operators, and consultants who already do good work but live invisibly on LinkedIn.' },
  { id: 2, icon: 'x' as IconName, title: 'Twitter / X Personal Branding', tag: 'Solo', problem: 'Your X account has 312 followers and one tweet from 2021. Meanwhile, your competitors\' founders are building loyal audiences in public.', included: ['Founder voice + niche map','Weekly thread strategy + 1 ghost-written thread','Daily post calendar templates','Engagement pod & creator intro list','Quarterly profile + bio refresh'], outcomes: ['First 1,000 real followers (no growth hacks)','Sharper public point of view','DMs from the right people, not the loudest'], who: 'Builders, technical founders, and creators who want public-by-default reps.' },
  { id: 3, icon: 'reddit' as IconName, title: 'Reddit Authority Presence', tag: 'Solo', problem: 'Your audience is asking questions about your problem space on Reddit every day — and you\'re nowhere in the thread.', included: ['Subreddit map for your niche','AMA strategy + setup','Founder-led answer cadence (4 / month)','Reputation safeguards & community guidelines','Quarterly authority report'], outcomes: ['Top-of-thread answers on your topic','Search authority on your category','Genuine trust from a sceptical audience'], who: 'Builders selling to engineers, gamers, indie operators, or technically-curious buyers.' },
  { id: 4, icon: 'layers' as IconName, title: 'Full Digital Authority System', tag: 'System · flagship', problem: 'You don\'t need another channel. You need a system that makes the channels work together — and run without you babysitting it.', included: ['LinkedIn + X + Reddit, fully managed','Founder PR & podcast booking','Newsletter ghostwriting (bi-weekly)','Quarterly narrative refresh','Dedicated strategist + weekly sync'], outcomes: ['Top-3 Google result for your name','Cross-platform familiarity','A real, defensible founder brand'], who: 'Series A founders, second-time founders, and category-defining operators.' },
  { id: 5, icon: 'megaphone' as IconName, title: 'Visibility Amplification', tag: 'Reach', problem: 'Even great content dies in a feed. You need to be talked about — not just posting.', included: ['Creator collab brief & matchmaking','Founder mention drops in 5+ creator accounts','Pull-quote & repost strategy','Podcast pull-quote distribution','Monthly mention audit'], outcomes: ['You get tagged, quoted, referenced','Borrowed trust from larger voices','A reputation that travels without you'], who: 'Founders past their first 1K followers who need to break out of the second circle.' },
  { id: 6, icon: 'users' as IconName, title: 'Creator Collaborations', tag: 'Reach', problem: 'You want to appear on the podcasts and newsletters your buyers already listen to — but cold pitching is brutal.', included: ['Curated creator + podcast list','Outreach copy + booking management','Pre-interview prep with strategist','Repurposing of clips for socials','Post-publication amplification'], outcomes: ['3–6 high-fit features per quarter','Direct buyer/investor pipeline','Distribution that compounds'], who: 'Founders with a sharp opinion ready to put it on someone else\'s stage.' },
  { id: 7, icon: 'handshake' as IconName, title: 'Investor Readiness', tag: 'Capital', problem: 'VCs Google you before they reply. If your digital footprint says "unfinished", they assume the company is unfinished.', included: ['Founder narrative + deck review','Profile sharpening across all platforms','Press hits & quote placements','Curated investor list (50–150 targets)','Pre-pitch readiness call'], outcomes: ['Round-ready public footprint','Investor short-list, warmth-mapped','Higher reply rate to cold/warm outreach'], who: 'Pre-seed → Series A founders 90 days from raising.' },
  { id: 8, icon: 'diamond' as IconName, title: 'Opportunity Access', tag: 'Access', problem: 'The best opportunities don\'t sit on Google. They sit in DMs, in lists, in trusted rooms — and you\'re not in those rooms yet.', included: ['Pro community access','Curated opportunity drops (weekly)','Warm intro requests (3 / month)','Accelerator & platform deal access','Founder dinner invites'], outcomes: ['Real intros, real meetings','First-look on platform deals','A network that compounds quietly'], who: 'Founders who are tired of being one of 200 cold applicants.' },
];

export function ServicesPage({ setPage }: { setPage: (p: Page) => void }) {
  const [active, setActive] = useState(1);
  const s = FULL_SERVICES.find(x => x.id === active)!;
  return (
    <main>
      <section style={{ padding: '96px 0 56px' }}>
        <div className="shell">
          <SectionLabel>Services</SectionLabel>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px,6vw,88px)', margin: '20px 0 16px' }}>
            Eight ways to <span className="it">become unmissable</span>.
          </h1>
          <p className="lead" style={{ fontSize: 19 }}>
            Pick a track. Layer them when you&apos;re ready. Every engagement is led by a dedicated strategist and built around your category, not a template.
          </p>
        </div>
      </section>
      <section style={{ paddingBottom: 96 }}>
        <div className="shell" style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 40, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {FULL_SERVICES.map(svc => (
              <button key={svc.id} onClick={() => setActive(svc.id)} className="card"
                style={{ display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: 14, alignItems: 'center', padding: 14, textAlign: 'left', cursor: 'pointer', background: active === svc.id ? 'var(--ink)' : '#fff', borderColor: active === svc.id ? 'var(--ink)' : 'var(--line)', color: active === svc.id ? '#fff' : 'var(--ink-2)' }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: active === svc.id ? 'rgba(212,175,55,0.18)' : 'var(--bg-soft)', color: active === svc.id ? '#D4AF37' : 'var(--ink)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={svc.icon} size={16} />
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{svc.title}</div>
                  <div style={{ fontSize: 11.5, color: active === svc.id ? 'rgba(255,255,255,0.55)' : 'var(--ink-3)', marginTop: 2 }}>{svc.tag}</div>
                </div>
                <Icon name="chevR" size={14} style={{ opacity: 0.6 }} />
              </button>
            ))}
          </div>
          <div className="card" style={{ padding: 40, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex aic gap-3 mb-4">
              <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--ink)', color: '#D4AF37', display: 'grid', placeItems: 'center' }}>
                <Icon name={s.icon} size={20} />
              </span>
              <span className="chip chip-gold">{s.tag}</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 44, margin: '8px 0 14px', fontWeight: 500 }}>{s.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 28 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 10 }}>The problem</div>
                <p style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{s.problem}</p>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 10 }}>Who it&apos;s for</div>
                <p style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{s.who}</p>
              </div>
            </div>
            <div className="hairline mt-8 mb-8" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}>What&apos;s included</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {s.included.map(it => (
                    <li key={it} className="flex gap-3" style={{ alignItems: 'flex-start' }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--bg-soft)', display: 'grid', placeItems: 'center', flexShrink: 0, color: 'var(--ink)' }}>
                        <Icon name="check" size={11} stroke={2.2} />
                      </span>
                      <span style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 14 }}>Expected outcomes</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {s.outcomes.map(it => (
                    <li key={it} className="flex gap-3" style={{ alignItems: 'flex-start' }}>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--gold-tint)', color: '#7A5A0F', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        <Icon name="sparkle" size={10} stroke={1.8} />
                      </span>
                      <span style={{ fontSize: 14.5, color: 'var(--ink-2)' }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hairline mt-8 mb-8" />
            <div className="flex jcb aic" style={{ flexWrap: 'wrap', gap: 12 }}>
              <div className="muted" style={{ fontSize: 13.5 }}>Engagements start at <span style={{ color: 'var(--ink)', fontWeight: 600 }}>3 months</span>, with monthly reviews.</div>
              <div className="flex gap-3">
                <button className="btn btn-ghost" onClick={() => setPage('auth')}>Book a call</button>
                <button className="btn btn-primary" onClick={() => setPage('auth')}>Start this track <Icon name="arrow" size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FinalCTASmall setPage={setPage} />
    </main>
  );
}
