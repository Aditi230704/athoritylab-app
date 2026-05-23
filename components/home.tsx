'use client';
import { useState } from 'react';
import { Icon } from './icons';
import { SectionLabel } from './section-label';
import type { User, Page } from '@/types';

interface HomeProps {
  user: User | null;
  setPage: (p: Page) => void;
  tweaks?: { darkAmplify?: boolean; heroLine1?: string; heroLine2?: string; heroLine3?: string };
}

export function Home({ user, setPage, tweaks }: HomeProps) {
  return (
    <main>
      <Hero setPage={setPage} user={user} tweaks={tweaks} />
      <LogoMarquee />
      <ProblemSection />
      <WhatWeDo />
      <ServicesPreview setPage={setPage} />
      <Amplification dark={tweaks?.darkAmplify !== false} />
      <SocialProof />
      <CommunitySection setPage={setPage} />
      <ToolsPreview setPage={setPage} user={user} />
      <ProSection setPage={setPage} />
      <FinalCTA setPage={setPage} />
    </main>
  );
}

/* ── Hero ── */
function Hero({ setPage, user, tweaks }: HomeProps) {
  const l1 = tweaks?.heroLine1 || 'Become visible.';
  const l2 = tweaks?.heroLine2 || 'Trusted.';
  const l3 = tweaks?.heroLine3 || 'Connected.';
  const [l1First, ...l1Rest] = l1.split(' ');
  const l1RestStr = l1Rest.join(' ');
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '72px 0 96px' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(80% 60% at 70% 10%,rgba(255,194,121,0.20) 0%,transparent 60%),radial-gradient(50% 50% at 10% 80%,rgba(212,175,55,0.10) 0%,transparent 60%)',
      }} />
      <div className="shell" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center' }}>
          <div className="fade-up">
            <SectionLabel>Founders · Creators · Operators</SectionLabel>
            <h1 className="h-display" style={{ fontSize: 'clamp(48px,6.4vw,92px)', margin: '20px 0 0' }}>
              {l1First} {l1RestStr ? <span className="it">{l1RestStr}</span> : null}<br />
              <span style={{ color: 'var(--ink)' }}>{l2}</span>{' '}
              <span className="gold-underline">{l3}</span>
            </h1>
            <p className="lead" style={{ marginTop: 28, fontSize: 19 }}>
              AthorityLab helps founders build authority, grow visibility, strengthen online presence,
              and unlock meaningful opportunities—through one premium, founder-only ecosystem.
            </p>
            <div className="flex gap-3 mt-8">
              <button className="btn btn-primary btn-lg" onClick={() => setPage('auth')}>
                Start free <Icon name="arrow" size={16} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => setPage('services')}>
                Explore services
              </button>
            </div>
            <div className="flex gap-6 mt-10" style={{ flexWrap: 'wrap' }}>
              {[['2,400+', 'founders'], ['38', 'countries'], ['180+', 'monthly opps']].map(([n, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span className="h-display" style={{ fontSize: 26, color: 'var(--ink)' }}>{n}</span>
                  <span className="tag-line">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroVisual user={user} />
        </div>
      </div>
    </section>
  );
}

function HeroVisual({ user }: { user: User | null }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.05', animation: 'fade-up 1s .15s cubic-bezier(.2,.7,.2,1) both' }}>
      <div className="card" style={{ position: 'absolute', inset: '4% 12% 18% 0', padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <div className="portrait" style={{ width: '100%', height: '100%', borderRadius: 0, background: 'linear-gradient(160deg,#F4E5BC 0%,#E6B66D 45%,#B0823A 100%)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 35% 30%,rgba(255,255,255,0.32),transparent 55%)' }} />
          <span className="portrait-caption">PORTRAIT · FOUNDER FEATURE</span>
          <div style={{ position: 'absolute', left: 20, top: 20 }}>
            <span className="chip" style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.6)', height: 26 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--orange)' }} /> LIVE FEATURE
            </span>
          </div>
        </div>
      </div>
      {/* Profile metric card */}
      <div className="card" style={{ position: 'absolute', left: '-2%', top: '8%', padding: 16, width: 230, animation: 'float-soft 6s ease-in-out infinite', boxShadow: 'var(--shadow-md)' }}>
        <div className="flex aic gap-3">
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF37,#FF8A00)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 600, fontSize: 14 }}>
            {(user?.name || 'AK').trim().slice(0, 1).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{user?.name?.split(' ')[0] || 'Ananya'} K.</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Founder · Lumeo</div>
          </div>
          <Icon name="check" size={16} style={{ color: 'var(--gold)' }} />
        </div>
        <div className="hairline" style={{ margin: '12px 0' }} />
        <div className="flex jcb">
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 0.6, textTransform: 'uppercase' }}>Visibility</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>87 <span style={{ fontSize: 12, color: 'var(--orange)' }}>↑ 23</span></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32 }}>
            {[18, 24, 20, 30, 26, 38, 42, 52, 58].map((h, i) => (
              <span key={i} style={{ width: 5, height: h, background: i > 6 ? 'var(--orange)' : 'var(--ink-3)', opacity: i > 6 ? 1 : 0.3, borderRadius: 2 }} />
            ))}
          </div>
        </div>
      </div>
      {/* Opportunity card */}
      <div className="card" style={{ position: 'absolute', right: 0, top: '38%', padding: 14, width: 230, animation: 'float-soft 7s ease-in-out -2s infinite', boxShadow: 'var(--shadow-md)' }}>
        <div className="flex aic gap-2">
          <Icon name="bell" size={14} style={{ color: 'var(--orange)' }} />
          <span className="eyebrow" style={{ fontSize: 11 }}>New Opportunity</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginTop: 8, fontFamily: 'var(--font-display)' }}>
          Antler India seeking pre-seed AI founders.
        </div>
        <div className="flex jcb mt-3 aic">
          <span className="tag-line" style={{ fontSize: 12 }}>Match · 92%</span>
          <button className="btn btn-sm btn-gold">Apply</button>
        </div>
      </div>
      {/* Post card */}
      <div className="card" style={{ position: 'absolute', left: '10%', bottom: 0, padding: 16, width: 340, animation: 'float-soft 8s ease-in-out -4s infinite', boxShadow: 'var(--shadow-lg)' }}>
        <div className="flex aic gap-3">
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'grid', placeItems: 'center' }}>
            <Icon name="x" size={12} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>Marcus Sterling</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>@marcusbuilds · 2h</div>
          </div>
        </div>
        <p style={{ margin: '10px 0 0', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.45 }}>
          Eight months ago nobody replied to my cold DMs. Now five funds DM me first. Visibility is the unfair advantage.
        </p>
        <div className="flex gap-4 mt-3" style={{ color: 'var(--ink-3)', fontSize: 12 }}>
          <span className="flex aic gap-2"><Icon name="heart" size={13} /> 412</span>
          <span className="flex aic gap-2"><Icon name="message" size={13} /> 38</span>
          <span className="flex aic gap-2"><Icon name="repeat" size={13} /> 91</span>
        </div>
      </div>
    </div>
  );
}

/* ── Logo Marquee ── */
const MARQUEE_ITEMS = [
  'TechCrunch','YourStory','Inc42','The Ken','Forbes 30u30','Entrepreneur',
  'Product Hunt','a16z Future',"Lenny's Pod",'Stratechery','Sifted','Tech in Asia',
  'TechCrunch','YourStory','Inc42','The Ken','Forbes 30u30','Entrepreneur',
];

function LogoMarquee() {
  return (
    <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '28px 0', overflow: 'hidden', background: 'var(--bg)' }}>
      <div className="shell flex aic gap-8" style={{ overflow: 'hidden' }}>
        <span className="eyebrow" style={{ whiteSpace: 'nowrap' }}>Where our founders show up</span>
        <div style={{ flex: 1, overflow: 'hidden', maskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)' }}>
          <div className="marquee">
            {MARQUEE_ITEMS.map((n, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink-3)', whiteSpace: 'nowrap', letterSpacing: -0.01 }}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Problem Section ── */
const PROBLEMS = [
  { t: 'Nobody knows you exist.', b: 'You\'re building in silence. Even great work needs a megaphone.' },
  { t: 'Your online presence is thin.', b: 'A bare LinkedIn + a quiet X is not a brand. It\'s a liability.' },
  { t: 'Networking is brutal.', b: 'Cold DMs disappear. Warm intros require visibility you don\'t have.' },
  { t: 'Trust takes too long.', b: 'Investors, partners, and hires Google you. What they find decides.' },
  { t: 'Fundraising feels closed-door.', b: 'The doors open for founders who are already being talked about.' },
  { t: 'You blend in.', b: 'Without distinct positioning, you become "just another founder" in the deck.' },
];

function ProblemSection() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="shell">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px,4vw,56px)', margin: '16px 0 18px' }}>
              Great founders <span className="it">stay invisible</span>{' '}
              for one reason — no one taught them how to be seen.
            </h2>
            <p className="lead" style={{ fontSize: 17 }}>
              Building a product is hard. Becoming visible enough that the right people find you anyway?
              That&apos;s a different game with different rules.
            </p>
          </div>
          <div className="grid grid-2">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="card card-hover" style={{ padding: 26, background: '#fff' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-soft)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', color: 'var(--ink-3)', fontSize: 15 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: 18, color: 'var(--ink)', margin: '18px 0 8px', letterSpacing: -0.01 }}>{p.t}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--ink-3)', margin: 0, lineHeight: 1.55 }}>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── What We Do ── */
const PILLARS = [
  { icon: 'compass' as const, t: 'Build authority', b: 'Position you as the obvious voice in your space — through writing, opinion, and consistent presence.' },
  { icon: 'target' as const, t: 'Improve positioning', b: 'Clarify what you stand for. Sharpen the angle so people remember the shape of you.' },
  { icon: 'chart' as const, t: 'Strengthen social presence', b: 'Turn dormant LinkedIn, X and Reddit profiles into ecosystems that work even while you sleep.' },
  { icon: 'megaphone' as const, t: 'Get talked about', b: 'Distributed across creator networks, podcasts, and founder communities. Familiarity is currency.' },
  { icon: 'network' as const, t: 'Connect with the right people', b: 'Founders, investors, operators and collaborators — curated, not crowd-sourced.' },
  { icon: 'rocket' as const, t: 'Access opportunities', b: 'Investor intros, podcast slots, partnerships, accelerator referrals. Doors open when you are visible.' },
];

function WhatWeDo() {
  return (
    <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--line-warm)', borderBottom: '1px solid var(--line-warm)' }}>
      <div className="shell">
        <div className="flex jcb" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}>
          <div style={{ maxWidth: 640 }}>
            <SectionLabel tone="gold">What We Do</SectionLabel>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px,4vw,58px)', margin: '16px 0 0' }}>
              One ecosystem. Six <span className="it">compounding</span> outcomes.
            </h2>
          </div>
          <p className="lead" style={{ maxWidth: 380, fontSize: 16 }}>
            Personal branding, founder positioning, amplification, networking and opportunity access —
            designed to reinforce each other.
          </p>
        </div>
        <div className="grid grid-3">
          {PILLARS.map((p, i) => (
            <div key={i} className="card card-hover" style={{ padding: 28, background: '#fff' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: i % 3 === 1 ? 'var(--gold-tint)' : 'var(--bg-soft)', display: 'grid', placeItems: 'center', color: i % 3 === 1 ? '#7A5A0F' : 'var(--ink)' }}>
                <Icon name={p.icon} size={20} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)', margin: '20px 0 8px', fontWeight: 500 }}>{p.t}</h3>
              <p style={{ fontSize: 14.5, color: 'var(--ink-3)', margin: 0, lineHeight: 1.6 }}>{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services Preview ── */
const SERVICES = [
  { tag: 'Solo', icon: 'linkedin' as const, t: 'LinkedIn Personal Branding', b: 'Become unmissable on the platform every investor still opens first.', outcome: 'From 0 → trusted operator voice in 90 days.' },
  { tag: 'Solo', icon: 'x' as const, t: 'Twitter / X Personal Branding', b: 'Sharp opinion, founder threads, and the distribution that follows.', outcome: 'Build a public point of view that compounds.' },
  { tag: 'Combo', icon: 'reddit' as const, t: 'LinkedIn + X + Reddit Authority', b: 'Cross-platform familiarity — wherever your audience checks you out.', outcome: 'Be visible in every search a stranger does on your name.' },
  { tag: 'System', icon: 'layers' as const, t: 'Full Digital Authority System', b: 'Everything: writing, posting, distribution, profile, positioning, PR.', outcome: 'A complete operating system for being seen.' },
  { tag: 'Reach', icon: 'megaphone' as const, t: 'Visibility Amplification', b: 'Get talked about, tagged, and referenced across founder communities.', outcome: 'Trust through repeated exposure, not just reach.' },
  { tag: 'Reach', icon: 'users' as const, t: 'Creator Collaborations', b: 'Curated podcasts, newsletter features, and co-content with creators.', outcome: 'Borrow trust from voices your audience already follows.' },
  { tag: 'Capital', icon: 'handshake' as const, t: 'Investor Readiness', b: 'Sharpen the narrative, the deck, the digital footprint. Be ready when they Google.', outcome: 'Be the founder VCs save before you DM them.' },
  { tag: 'Access', icon: 'diamond' as const, t: 'Opportunity Access', b: 'Curated intros, founder lists, accelerator routes, and platform deals.', outcome: 'Stop chasing. Start being asked.' },
];

function ServicesPreview({ setPage }: { setPage: (p: Page) => void }) {
  const [active, setActive] = useState(0);
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="shell">
        <div className="flex jcb" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <div>
            <SectionLabel>Services</SectionLabel>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px,4vw,58px)', margin: '16px 0 0' }}>
              The work itself, in <span className="it">eight tracks</span>.
            </h2>
          </div>
          <button className="btn btn-ghost" onClick={() => setPage('services')}>
            See full services <Icon name="arrowUR" size={14} />
          </button>
        </div>
        <div className="grid grid-4">
          {SERVICES.map((s, i) => (
            <button key={i} onMouseEnter={() => setActive(i)} onClick={() => setPage('services')}
              className="card card-hover"
              style={{ padding: 24, background: '#fff', textAlign: 'left', cursor: 'pointer', position: 'relative', borderColor: active === i ? '#cfb96b' : 'var(--line)', boxShadow: active === i ? 'var(--shadow-md)' : 'none' }}>
              <div className="flex jcb aic">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: active === i ? 'var(--ink)' : 'var(--bg-soft)', color: active === i ? '#fff' : 'var(--ink)', display: 'grid', placeItems: 'center', transition: 'background .2s ease,color .2s ease' }}>
                  <Icon name={s.icon} size={18} />
                </div>
                <span className="chip" style={{ height: 24, fontSize: 11 }}>{s.tag}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--ink)', margin: '20px 0 10px', fontWeight: 500, letterSpacing: -0.01, lineHeight: 1.15 }}>{s.t}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-3)', margin: 0, lineHeight: 1.55 }}>{s.b}</p>
              <div className="hairline" style={{ margin: '18px 0 12px' }} />
              <div className="flex jcb aic">
                <span style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic' }}>{s.outcome}</span>
                <Icon name="arrow" size={14} style={{ color: 'var(--ink)' }} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Amplification ── */
const AMP_ITEMS = [
  { who: 'Lenny Sachs', role: 'Newsletter · 200K', quote: 'Featured in this week\'s founder spotlight.' },
  { who: 'Reema (a16z)', role: 'Investor · X', quote: 'Quoting a thread on second-time PMF.' },
  { who: 'Build in Public Pod', role: 'Podcast', quote: 'Guest episode, dropped Tuesday.' },
  { who: 'ProductDevs sub', role: 'Reddit · 480K', quote: 'Front-page AMA, 1.4K upvotes.' },
];

function Amplification({ dark = true }: { dark?: boolean }) {
  const ink = dark ? '#fff' : 'var(--ink)';
  const muted = dark ? 'rgba(255,255,255,0.7)' : 'var(--ink-3)';
  const subtle = dark ? 'rgba(255,255,255,0.5)' : 'var(--ink-4)';
  const chipBg = dark ? 'rgba(255,255,255,0.06)' : '#fff';
  const chipBorder = dark ? 'rgba(255,255,255,0.12)' : 'var(--line)';
  const chipText = dark ? 'rgba(255,255,255,0.8)' : 'var(--ink-2)';
  const orbitLine = dark ? 'rgba(255,255,255,' : 'rgba(28,28,30,';
  const orbitCardBg = dark ? 'rgba(255,255,255,0.04)' : '#fff';
  const orbitCardBorder = dark ? 'rgba(255,255,255,0.1)' : 'var(--line)';

  return (
    <section className="section" style={{ background: dark ? '#0F0F12' : 'var(--bg-warm)', color: ink, position: 'relative', overflow: 'hidden', borderTop: dark ? 'none' : '1px solid var(--line-warm)', borderBottom: dark ? 'none' : '1px solid var(--line-warm)' }}>
      <div style={{ position: 'absolute', inset: 0, background: dark ? 'radial-gradient(70% 50% at 80% 20%,rgba(255,138,0,0.18) 0%,transparent 60%),radial-gradient(50% 50% at 10% 100%,rgba(212,175,55,0.16) 0%,transparent 60%)' : 'radial-gradient(70% 50% at 80% 20%,rgba(255,138,0,0.10) 0%,transparent 60%),radial-gradient(50% 50% at 10% 100%,rgba(212,175,55,0.10) 0%,transparent 60%)', pointerEvents: 'none' }} />
      <div className="shell" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <SectionLabel>Visibility Amplification</SectionLabel>
            <h2 className="h-display" style={{ color: ink, fontSize: 'clamp(40px,4.6vw,68px)', margin: '16px 0 0' }}>
              We don&apos;t just <span className="it" style={{ color: dark ? '#F4D58D' : 'var(--gold)' }}>grow</span> your profile.
              <br />We make you <span className="gold-underline" style={{ backgroundImage: 'linear-gradient(transparent 60%,rgba(212,175,55,0.55) 60%,rgba(212,175,55,0.55) 90%,transparent 90%)' }}>talked about</span>.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: muted, maxWidth: 520, marginTop: 24 }}>
              Authority is not just follower count. It&apos;s familiarity, repetition, and being referenced
              by people your audience already trusts. We architect that surface area across communities,
              creators and conversations.
            </p>
            <div className="flex gap-3 mt-8" style={{ flexWrap: 'wrap' }}>
              {['Podcasts', 'Newsletters', 'Reddit', 'X', 'LinkedIn', 'Founder Slacks'].map(t => (
                <span key={t} className="chip" style={{ background: chipBg, borderColor: chipBorder, color: chipText }}>{t}</span>
              ))}
            </div>
          </div>
          {/* Orbit visual */}
          <div style={{ position: 'relative', aspectRatio: '1 / 1', maxWidth: 520, marginLeft: 'auto' }}>
            <div style={{ position: 'absolute', inset: 0, border: `1px dashed ${orbitLine}0.15)`, borderRadius: '50%' }} />
            <div style={{ position: 'absolute', inset: '12%', border: `1px dashed ${orbitLine}0.1)`, borderRadius: '50%' }} />
            <div style={{ position: 'absolute', inset: '24%', border: `1px dashed ${orbitLine}0.07)`, borderRadius: '50%' }} />
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg,#FF8A00,#D4AF37)', display: 'grid', placeItems: 'center', boxShadow: '0 0 80px rgba(255,138,0,0.6)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#fff' }}>You</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 2 }}>Founder</div>
              </div>
            </div>
            {AMP_ITEMS.map((it, i) => {
              const angles = [-25, 55, 155, 215];
              const r = 220;
              const x = Math.cos(angles[i] * Math.PI / 180) * r;
              const y = Math.sin(angles[i] * Math.PI / 180) * r;
              return (
                <div key={i} style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y}px))`, width: 200, background: orbitCardBg, border: `1px solid ${orbitCardBorder}`, borderRadius: 14, padding: 12, backdropFilter: 'blur(8px)' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: ink }}>{it.who}</div>
                  <div style={{ fontSize: 11, color: subtle, marginBottom: 6 }}>{it.role}</div>
                  <div style={{ fontSize: 12.5, color: muted, fontStyle: 'italic', lineHeight: 1.4 }}>&ldquo;{it.quote}&rdquo;</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Social Proof ── */
const TESTIMONIALS = [
  { name: 'Priya Raghavan', role: 'Founder, Lumeo · ₹2Cr seed', body: 'Three investors DMed me first after my LinkedIn voice settled in. AthorityLab wrote the playbook with me — I write the words.', platform: 'linkedin' as const, color: 'warm', initials: 'PR' },
  { name: 'Marcus Sterling', role: 'Founder, Northwind', body: "Eight months ago I was invisible. Now I'm quoted in three newsletters and on a TC list. The compounding is real.", platform: 'x' as const, color: 'ink', initials: 'MS' },
  { name: 'Aanya Iyer', role: 'Solo founder, Casa.ai', body: 'I came for "LinkedIn growth". I stayed because of the founder community. Three real friends, one co-founder lead.', platform: 'linkedin' as const, color: 'warm', initials: 'AI' },
  { name: 'Diego Park', role: 'Operator → Founder', body: 'Six warm intros to angels in a quarter. Two cheques. That\'s not luck — that\'s positioning.', platform: 'x' as const, color: 'cool', initials: 'DP' },
  { name: 'Sara Bloom', role: 'Founder, Loomstack', body: 'My profile finally reads like the founder I actually am. Not the apologetic LinkedIn version.', platform: 'linkedin' as const, color: 'warm', initials: 'SB' },
];

function SocialProof() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="shell">
        <div className="flex jcb" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <div>
            <SectionLabel>Founders inside</SectionLabel>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px,4vw,58px)', margin: '16px 0 0' }}>
              Stories from founders who became <span className="it">searchable.</span>
            </h2>
          </div>
          <div className="flex gap-3 aic">
            <div className="flex aic gap-2">
              {[0,1,2,3,4].map(i => <Icon key={i} name="star" size={14} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />)}
            </div>
            <span className="tag-line">4.9 avg founder rating · 312 reviews</span>
          </div>
        </div>
        <div style={{ columnCount: 3, columnGap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card" style={{ padding: 22, background: '#fff', breakInside: 'avoid', marginBottom: 24 }}>
              <div className="flex aic gap-3">
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: t.color === 'ink' ? 'linear-gradient(135deg,#2A2A2E,#1A1A1C)' : t.color === 'cool' ? 'linear-gradient(135deg,#6F86A6,#4F6483)' : 'linear-gradient(135deg,#D4AF37,#FF8A00)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 600, fontSize: 13.5 }}>
                  {t.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{t.role}</div>
                </div>
                <Icon name={t.platform} size={15} style={{ color: 'var(--ink-3)' }} />
              </div>
              <p style={{ margin: '14px 0 0', fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>&ldquo;{t.body}&rdquo;</p>
              <div className="flex gap-4 mt-4" style={{ color: 'var(--ink-3)', fontSize: 12 }}>
                <span className="flex aic gap-2"><Icon name="heart" size={12} /> {120 + i * 73}</span>
                <span className="flex aic gap-2"><Icon name="message" size={12} /> {18 + i * 11}</span>
                <span className="flex aic gap-2"><Icon name="repeat" size={12} /> {22 + i * 19}</span>
              </div>
            </div>
          ))}
          <div className="card" style={{ padding: 28, breakInside: 'avoid', marginBottom: 24, background: 'linear-gradient(135deg,#FBF5E1 0%,#FFF7ED 100%)', borderColor: 'rgba(212,175,55,0.4)' }}>
            <Icon name="quote" size={26} style={{ color: 'var(--gold)' }} />
            <p className="h-display" style={{ fontSize: 22, lineHeight: 1.3, color: 'var(--ink)', marginTop: 12 }}>
              &ldquo;Visibility is the unfair advantage nobody warns you about — and nobody teaches.&rdquo;
            </p>
            <div className="flex aic gap-3 mt-6">
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: '#D4AF37', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600 }}>RN</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Rohan Nair</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Pro member · Founder, Vertica</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Community Section ── */
function CommunitySection({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--line-warm)', borderBottom: '1px solid var(--line-warm)' }}>
      <div className="shell">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <SectionLabel tone="gold">The Community</SectionLabel>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px,4vw,58px)', margin: '16px 0 0' }}>
              A founder room where the doors actually <span className="it">open.</span>
            </h2>
            <p className="lead" style={{ marginTop: 22, fontSize: 17 }}>
              Curated. Quiet enough to think. Loud enough to be heard. Network with other founders,
              swap intros, share decks, and find like-minded people.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Curated rooms by stage, geography, and category',
                'Monthly founder dinners in BLR · BOM · SF · NYC · LDN',
                'Founder-only AMAs with operators & investors',
                'Warm intros with 24h response culture',
              ].map(it => (
                <li key={it} className="flex aic gap-3">
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--gold-tint)', border: '1px solid #EBDDA6', display: 'grid', placeItems: 'center', color: '#7A5A0F' }}>
                    <Icon name="check" size={12} />
                  </span>
                  <span style={{ fontSize: 15, color: 'var(--ink-2)' }}>{it}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-10">
              <button className="btn btn-primary" onClick={() => setPage('community')}>Join Community <Icon name="arrow" size={16} /></button>
              <button className="btn btn-ghost" onClick={() => setPage('community')}>See inside</button>
            </div>
          </div>
          <CommunityVisual />
        </div>
      </div>
    </section>
  );
}

function CommunityVisual() {
  const msgs = [
    { who: 'Aanya I.', color: 'linear-gradient(135deg,#D4AF37,#FF8A00)', text: 'Anyone here pitched Antler India recently? Their new partner is asking deeper market questions than the last memo.', time: '11:02 AM', reactions: ['💡 6', '🔥 4'] },
    { who: 'Marcus S.', color: 'linear-gradient(135deg,#2A2A2E,#1A1A1C)', text: 'Yeah — they want the wedge before the TAM. Happy to share my updated narrative if useful.', time: '11:04 AM', reactions: ['🙏 9'] },
    { who: 'Reema (Pro)', color: 'linear-gradient(135deg,#6F86A6,#4F6483)', text: 'Adding a doc with the 3 questions every Antler partner asks in week 2. Will pin it.', time: '11:06 AM', isOp: true, reactions: ['📌 12', '❤️ 18'] },
  ];
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#fff', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="flex aic gap-3">
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)' }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>#fundraising-pre-seed</span>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>148 founders</span>
        </div>
        <div className="flex">
          {['#D4AF37','#FF8A00','#2A2A2E','#6F86A6'].map((c, i) => (
            <span key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i === 0 ? 0 : -8 }} />
          ))}
          <span style={{ fontSize: 12, color: 'var(--ink-3)', marginLeft: 8 }}>+12 online</span>
        </div>
      </div>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--bg-warm)' }}>
        {msgs.map((m, i) => (
          <div key={i} className="flex gap-3" style={{ alignItems: 'flex-start' }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: m.color, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
              {m.who.split(' ').map(w => w[0]).join('')}
            </span>
            <div style={{ flex: 1 }}>
              <div className="flex aic gap-2">
                <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{m.who}</span>
                {m.isOp && <span className="chip chip-gold" style={{ height: 20, fontSize: 10, padding: '0 8px' }}>OP</span>}
                <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{m.time}</span>
              </div>
              <div style={{ marginTop: 4, fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{m.text}</div>
              <div className="flex gap-2 mt-2">
                {m.reactions.map(r => (
                  <span key={r} style={{ fontSize: 11.5, padding: '2px 8px', borderRadius: 999, background: '#fff', border: '1px solid var(--line)', color: 'var(--ink-2)' }}>{r}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 18px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="plus" size={16} style={{ color: 'var(--ink-3)' }} />
        <span style={{ fontSize: 13.5, color: 'var(--ink-4)', flex: 1 }}>Share what you&apos;re stuck on…</span>
        <span className="kbd">↵</span>
      </div>
    </div>
  );
}

/* ── Tools Preview ── */
const TOOLS_LIST = [
  { name: 'Investor Discovery', icon: 'compass' as const, desc: 'Search 8,400+ active investors by check size, geography, thesis, and warmth-of-intro path.' },
  { name: 'Startup Readiness', icon: 'check' as const, desc: 'Score your fundraising readiness across narrative, traction, team, and digital footprint.' },
  { name: 'Visibility Score', icon: 'eye' as const, desc: 'A live measure of how findable, mentionable, and trustworthy you look online.' },
];

function ToolsPreview({ setPage, user }: { setPage: (p: Page) => void; user: User | null }) {
  const [tab, setTab] = useState(0);
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="shell">
        <div className="flex jcb" style={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          <div>
            <SectionLabel>Founder Tools</SectionLabel>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px,4vw,58px)', margin: '16px 0 0' }}>
              Three tools. <span className="it">No fake SaaS.</span>
            </h2>
          </div>
          <p className="lead" style={{ maxWidth: 380, fontSize: 16 }}>Preview them freely. Use them with an account. Unlock the full set with Pro.</p>
        </div>
        <div className="flex gap-2 mb-6" style={{ flexWrap: 'wrap' }}>
          {TOOLS_LIST.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} className={'nav-link' + (tab === i ? ' active' : '')} style={{ padding: '10px 16px', fontSize: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Icon name={t.icon} size={14} />{t.name}
              </span>
            </button>
          ))}
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#fff', boxShadow: 'var(--shadow-md)' }}>
          {tab === 0 && <InvestorDiscoveryPreview user={user} setPage={setPage} />}
          {tab === 1 && <ReadinessPreview user={user} setPage={setPage} />}
          {tab === 2 && <VisibilityPreview user={user} setPage={setPage} />}
        </div>
      </div>
    </section>
  );
}

function LockedOverlay({ user, setPage, label = 'Sign up free to use' }: { user: User | null; setPage: (p: Page) => void; label?: string }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.95) 70%)', backdropFilter: 'blur(2.5px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 28 }}>
      <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14, background: '#fff', boxShadow: 'var(--shadow-md)' }}>
        <span style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--gold-tint)', color: '#7A5A0F', display: 'grid', placeItems: 'center' }}>
          <Icon name="lock" size={16} />
        </span>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Full results, exports, and saved searches with Pro.</div>
        </div>
        <div className="flex gap-2" style={{ marginLeft: 12 }}>
          <button className="btn btn-sm btn-ghost" onClick={() => setPage(user ? 'tools' : 'auth')}>{user ? 'Open tool' : 'Sign up free'}</button>
          <button className="btn btn-sm btn-gold" onClick={() => setPage('pro')}>Go Pro</button>
        </div>
      </div>
    </div>
  );
}

function InvestorDiscoveryPreview({ user, setPage }: { user: User | null; setPage: (p: Page) => void }) {
  const rows = [
    ['Antler India', 'Pre-seed → Seed', '$100K–$500K', 'Generalist · India / SEA', 'Open · 92%'],
    ['Better Capital', 'Pre-seed', '$200K–$1M', 'B2B · SaaS · DevTools', 'Open · 88%'],
    ['Together Fund', 'Seed', '$500K–$2M', 'Indian SaaS to global', 'Warm · 81%'],
    ['a16z Speedrun', 'Pre-seed', '$750K', 'Games · creator tools · AI', 'Open · 76%'],
    ['Sequoia Surge', 'Seed', '$1M–$2M', 'Pan-India · founder-led', 'Warm · 74%'],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 460 }}>
      <div style={{ borderRight: '1px solid var(--line)', padding: 22, background: 'var(--bg-warm)' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Filters</div>
        {[
          ['Stage', ['Pre-seed', 'Seed', 'Series A']],
          ['Geography', ['India', 'SEA', 'US', 'EU']],
          ['Cheque size', ['$50K–$250K', '$250K–$1M', '$1M+']],
          ['Thesis', ['B2B SaaS', 'AI / ML', 'Consumer', 'Fintech', 'Climate']],
        ].map(([h, opts]) => (
          <div key={h as string} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8 }}>{h as string}</div>
            <div className="flex" style={{ flexWrap: 'wrap', gap: 6 }}>
              {(opts as string[]).map(o => <span key={o} className="chip" style={{ height: 24, fontSize: 11.5 }}>{o}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ padding: 18, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="compass" size={16} style={{ color: 'var(--ink-3)' }} />
          <input className="input" placeholder="Search by name, fund, partner, thesis…" style={{ border: 'none', boxShadow: 'none', height: 36, padding: '0 4px', fontSize: 14 }} readOnly />
          <span className="kbd">⌘K</span>
        </div>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.6fr 1fr auto', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 12, background: i % 2 === 0 ? '#fff' : 'var(--bg-warm)', border: '1px solid var(--line)', filter: i > 1 ? 'blur(3px)' : 'none', opacity: i > 1 ? 0.85 : 1 }}>
              <div className="flex aic gap-3">
                <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--ink)', color: '#D4AF37', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600 }}>
                  {row[0].split(' ').map(w => w[0]).join('').slice(0, 2)}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{row[0]}</span>
              </div>
              <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>{row[1]}</span>
              <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>{row[2]}</span>
              <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{row[3]}</span>
              <span style={{ fontSize: 12, color: row[4].startsWith('Open') ? 'var(--orange)' : 'var(--gold)', fontWeight: 600 }}>{row[4]}</span>
              <button className="btn btn-sm btn-ghost"><Icon name="arrowUR" size={12} /></button>
            </div>
          ))}
          <LockedOverlay user={user} setPage={setPage} label="Sign up free to unlock all 8,400+ investors" />
        </div>
      </div>
    </div>
  );
}

function ReadinessPreview({ user, setPage }: { user: User | null; setPage: (p: Page) => void }) {
  const scores = [
    ['Narrative & positioning', 78, 'Sharpened, with one clear wedge.'],
    ['Founder digital footprint', 64, 'LinkedIn solid · X thin · Reddit absent.'],
    ['Traction proof points', 71, 'Two case studies, one social proof gap.'],
    ['Team readiness', 82, 'Tight co-founder story, hiring next 2.'],
    ['Deck & data room', 58, 'Deck OK, data room missing financials.'],
  ] as [string, number, string][];
  const overall = Math.round(scores.reduce((s, [, n]) => s + n, 0) / scores.length);
  const circum = 276.46;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', minHeight: 460 }}>
      <div style={{ padding: 32, borderRight: '1px solid var(--line)', background: 'var(--bg-warm)' }}>
        <div className="eyebrow">Your readiness score</div>
        <div style={{ position: 'relative', width: 200, height: 200, marginTop: 18 }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="44" fill="none" stroke="var(--line)" strokeWidth="6" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="url(#scoreG)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={`${overall / 100 * circum} ${circum}`} />
            <defs>
              <linearGradient id="scoreG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF8A00" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="h-display" style={{ fontSize: 56, color: 'var(--ink)' }}>{overall}</div>
              <div className="eyebrow" style={{ fontSize: 11 }}>of 100</div>
            </div>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 16 }}>
          You&apos;re <span style={{ color: 'var(--ink)', fontWeight: 600 }}>institutional-ready in 3 weeks</span> if you ship the gaps on the right.
        </p>
      </div>
      <div style={{ padding: 28, position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>Breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {scores.map(([n, v, note], i) => (
            <div key={n}>
              <div className="flex jcb aic mb-2">
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{n}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: v >= 75 ? 'var(--orange)' : 'var(--ink)' }}>{v}</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-soft)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${v}%`, height: '100%', background: v >= 75 ? 'linear-gradient(90deg,#FF8A00,#D4AF37)' : 'var(--ink-2)', borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 6, filter: i > 1 ? 'blur(2px)' : 'none' }}>{note}</div>
            </div>
          ))}
        </div>
        <LockedOverlay user={user} setPage={setPage} label="Sign in to see your personalised action plan" />
      </div>
    </div>
  );
}

function VisibilityPreview({ user, setPage }: { user: User | null; setPage: (p: Page) => void }) {
  const platforms = [['LinkedIn', 86], ['X / Twitter', 54], ['Reddit', 18], ['Newsletters', 32], ['Podcasts', 12]] as [string, number][];
  const gaps = [
    { t: 'Bio mismatch across platforms', b: 'Your X bio sells, LinkedIn explains, Reddit is empty. Pick one positioning.' },
    { t: 'Cadence collapse', b: 'Posted 14 times in March → 2 in May. Algorithms forget faster than people.' },
    { t: 'Zero borrowed trust', b: 'No quote, mention, or guest slot in the last 90 days.' },
    { t: 'Search surface is thin', b: 'Page 1 Google for your name = LinkedIn + a 2019 Medium post.' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 460 }}>
      <div style={{ padding: 32, borderRight: '1px solid var(--line)', background: 'var(--bg-warm)', position: 'relative' }}>
        <div className="eyebrow">Visibility Score</div>
        <div className="h-display" style={{ fontSize: 96, color: 'var(--ink)', margin: '8px 0', lineHeight: 1 }}>
          62<span style={{ fontSize: 28, color: 'var(--ink-3)' }}>/100</span>
        </div>
        <div className="flex aic gap-2">
          <span className="chip chip-orange"><Icon name="arrowUR" size={12} /> +14 last 30 days</span>
        </div>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 20, maxWidth: 320 }}>
          You&apos;re <strong style={{ color: 'var(--ink)' }}>more findable than 71%</strong> of seed-stage Indian founders, but still beneath the threshold investors search for.
        </p>
        <div style={{ marginTop: 28 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Where you&apos;re showing up</div>
          {platforms.map(([p, v]) => (
            <div key={p} className="flex aic gap-3" style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 12.5, color: 'var(--ink-2)', width: 90 }}>{p}</span>
              <div style={{ flex: 1, height: 5, background: 'var(--bg-soft)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${v}%`, height: '100%', background: 'var(--ink-2)' }} />
              </div>
              <span style={{ fontSize: 12, color: 'var(--ink-3)', width: 32, textAlign: 'right' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: 28, position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>What&apos;s pulling you down</div>
        {gaps.map((r, i) => (
          <div key={i} className="flex gap-3" style={{ padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none', filter: i > 1 ? 'blur(2.5px)' : 'none' }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--orange-tint)', color: 'var(--orange)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Icon name="bolt" size={14} />
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.t}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>{r.b}</div>
            </div>
          </div>
        ))}
        <LockedOverlay user={user} setPage={setPage} label="Sign up free to get your personalised fix list" />
      </div>
    </div>
  );
}

/* ── Pro Section ── */
export function PricingCard({ name, desc, price, unit, alt, features, cta, featured, onClick }: {
  name: string; desc: string; price: string; unit: string; alt?: string;
  features: [string, boolean][]; cta: string; featured?: boolean; onClick: () => void;
}) {
  return (
    <div className="card" style={{ padding: 36, background: featured ? '#0F0F12' : '#fff', color: featured ? '#fff' : 'var(--ink-2)', border: featured ? '1px solid #2a2a30' : '1px solid var(--line)', boxShadow: featured ? 'var(--shadow-lg)' : 'var(--shadow-xs)', position: 'relative', overflow: 'hidden' }}>
      {featured && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 80% 0%,rgba(212,175,55,0.16) 0%,transparent 60%)', pointerEvents: 'none' }} />
          <span className="chip" style={{ position: 'absolute', top: 22, right: 24, background: 'var(--gold-tint)', borderColor: 'rgba(212,175,55,0.5)', color: '#7A5A0F', height: 26 }}>Most chosen</span>
        </>
      )}
      <div style={{ position: 'relative' }}>
        <div className="eyebrow" style={{ color: featured ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)' }}>{name}</div>
        <h3 className="h-display" style={{ fontSize: 30, color: featured ? '#fff' : 'var(--ink)', margin: '10px 0 8px', fontWeight: 500 }}>{desc}</h3>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 20 }}>
          <span className="h-display" style={{ fontSize: 56, color: featured ? '#fff' : 'var(--ink)', lineHeight: 1 }}>{price}</span>
          <span style={{ fontSize: 14, color: featured ? 'rgba(255,255,255,0.55)' : 'var(--ink-3)' }}>{unit}</span>
        </div>
        {alt && <div style={{ fontSize: 12.5, color: featured ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)', marginTop: 4 }}>{alt}</div>}
        <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {features.map(([f, on]) => (
            <li key={f} className="flex aic gap-3" style={{ fontSize: 14.5, color: featured ? 'rgba(255,255,255,0.9)' : 'var(--ink-2)', opacity: on ? 1 : 0.45 }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: on ? featured ? '#D4AF37' : 'var(--ink)' : 'transparent', border: on ? 'none' : '1px dashed ' + (featured ? 'rgba(255,255,255,0.3)' : 'var(--line)'), display: 'grid', placeItems: 'center', color: featured && on ? '#1C1C1E' : '#fff', flexShrink: 0 }}>
                {on && <Icon name="check" size={12} stroke={2} />}
              </span>
              {f}
            </li>
          ))}
        </ul>
        <button onClick={onClick} className={featured ? 'btn btn-gold w-full btn-lg' : 'btn btn-ghost w-full btn-lg'}>
          {cta} <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );
}

function ProSection({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="section" style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--line-warm)' }}>
      <div className="shell">
        <div className="txt-c" style={{ marginBottom: 48 }}>
          <SectionLabel tone="gold">AthorityLab Pro</SectionLabel>
          <h2 className="h-display" style={{ fontSize: 'clamp(36px,4vw,58px)', margin: '16px 0 12px' }}>
            The whole ecosystem, <span className="it">unlocked.</span>
          </h2>
          <p className="lead" style={{ margin: '0 auto', fontSize: 17 }}>One quiet monthly fee. The community, the tools, the introductions.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 920, margin: '0 auto' }}>
          <PricingCard name="Free" desc="Get oriented. Read essays, scan opportunities, preview tools." price="₹0" unit="forever"
            features={[['Community, view-only', true],['Opportunity feed (delayed)', true],['Tool previews', true],['Founder Visibility Score', false],['Investor Discovery', false],['Warm intros & DM channels', false]]}
            cta="Start free" onClick={() => setPage('auth')} />
          <PricingCard featured name="Pro" desc="The full founder ecosystem — visibility, community, and access." price="₹499" unit="/ month · billed monthly" alt="$7 / month globally"
            features={[['Founder community access', true],['Investor Discovery tool', true],['Startup Readiness tool', true],['Founder Visibility Score', true],['Premium opportunity feed', true],['Warm intro channels & dinners', true]]}
            cta="Join Pro" onClick={() => setPage('pro')} />
        </div>
        <p className="txt-c muted mt-8" style={{ fontSize: 13 }}>Cancel anytime. No card on the free plan. Founders only — applications reviewed within 24h.</p>
      </div>
    </section>
  );
}

/* ── Final CTA ── */
function FinalCTA({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="section" style={{ background: 'var(--bg)', padding: '120px 0' }}>
      <div className="shell">
        <div className="txt-c" style={{ maxWidth: 820, margin: '0 auto' }}>
          <SectionLabel>Begin</SectionLabel>
          <h2 className="h-display" style={{ fontSize: 'clamp(42px,5.6vw,84px)', margin: '20px 0 18px' }}>
            Build your authority.<br />Unlock <span className="it">better opportunities</span>.
          </h2>
          <p className="lead" style={{ fontSize: 19, margin: '0 auto' }}>
            Visibility builds trust. Trust unlocks opportunities. The founders who show up consistently are the founders the internet rewards.
          </p>
          <div className="flex gap-3 jcc mt-10">
            <button className="btn btn-primary btn-lg" onClick={() => setPage('auth')}>Start free <Icon name="arrow" size={16} /></button>
            <button className="btn btn-gold btn-lg" onClick={() => setPage('pro')}>Join Pro <Icon name="diamond" size={14} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
