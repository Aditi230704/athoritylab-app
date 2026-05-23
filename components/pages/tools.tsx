'use client';
import { useState } from 'react';
import { Icon } from '../icons';
import { SectionLabel } from '../section-label';
import type { Page, User } from '@/types';

// Re-use the tool preview panels from home.tsx via a shared import pattern
// These are duplicated here for simplicity; in production extract to a shared file

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
    ['Antler India','Pre-seed → Seed','$100K–$500K','Generalist · India / SEA','Open · 92%'],
    ['Better Capital','Pre-seed','$200K–$1M','B2B · SaaS · DevTools','Open · 88%'],
    ['Together Fund','Seed','$500K–$2M','Indian SaaS to global','Warm · 81%'],
    ['a16z Speedrun','Pre-seed','$750K','Games · creator tools · AI','Open · 76%'],
    ['Sequoia Surge','Seed','$1M–$2M','Pan-India · founder-led','Warm · 74%'],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 460 }}>
      <div style={{ borderRight: '1px solid var(--line)', padding: 22, background: 'var(--bg-warm)' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Filters</div>
        {[['Stage',['Pre-seed','Seed','Series A']],['Geography',['India','SEA','US','EU']],['Cheque size',['$50K–$250K','$250K–$1M','$1M+']],['Thesis',['B2B SaaS','AI / ML','Consumer','Fintech','Climate']]].map(([h, opts]) => (
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
              <div className="flex aic gap-3"><span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--ink)', color: '#D4AF37', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600 }}>{row[0].split(' ').map(w => w[0]).join('').slice(0,2)}</span><span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{row[0]}</span></div>
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
  const scores: [string, number, string][] = [['Narrative & positioning',78,'Sharpened, with one clear wedge.'],['Founder digital footprint',64,'LinkedIn solid · X thin · Reddit absent.'],['Traction proof points',71,'Two case studies, one social proof gap.'],['Team readiness',82,'Tight co-founder story, hiring next 2.'],['Deck & data room',58,'Deck OK, data room missing financials.']];
  const overall = Math.round(scores.reduce((s,[,n]) => s+n, 0) / scores.length);
  const circum = 276.46;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', minHeight: 460 }}>
      <div style={{ padding: 32, borderRight: '1px solid var(--line)', background: 'var(--bg-warm)' }}>
        <div className="eyebrow">Your readiness score</div>
        <div style={{ position: 'relative', width: 200, height: 200, marginTop: 18 }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="44" fill="none" stroke="var(--line)" strokeWidth="6" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="url(#scoreG2)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${overall/100*circum} ${circum}`} />
            <defs><linearGradient id="scoreG2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF8A00" /><stop offset="100%" stopColor="#D4AF37" /></linearGradient></defs>
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}><div style={{ textAlign: 'center' }}><div className="h-display" style={{ fontSize: 56, color: 'var(--ink)' }}>{overall}</div><div className="eyebrow" style={{ fontSize: 11 }}>of 100</div></div></div>
        </div>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 16 }}>You&apos;re <span style={{ color: 'var(--ink)', fontWeight: 600 }}>institutional-ready in 3 weeks</span> if you ship the gaps on the right.</p>
      </div>
      <div style={{ padding: 28, position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>Breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {scores.map(([n,v,note],i) => (
            <div key={n}>
              <div className="flex jcb aic mb-2"><span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{n}</span><span style={{ fontSize: 13, fontWeight: 600, color: v>=75?'var(--orange)':'var(--ink)' }}>{v}</span></div>
              <div style={{ height: 6, background: 'var(--bg-soft)', borderRadius: 999, overflow: 'hidden' }}><div style={{ width:`${v}%`, height:'100%', background:v>=75?'linear-gradient(90deg,#FF8A00,#D4AF37)':'var(--ink-2)', borderRadius:999 }} /></div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 6, filter: i>1?'blur(2px)':'none' }}>{note}</div>
            </div>
          ))}
        </div>
        <LockedOverlay user={user} setPage={setPage} label="Sign in to see your personalised action plan" />
      </div>
    </div>
  );
}

function VisibilityPreview({ user, setPage }: { user: User | null; setPage: (p: Page) => void }) {
  const platforms: [string,number][] = [['LinkedIn',86],['X / Twitter',54],['Reddit',18],['Newsletters',32],['Podcasts',12]];
  const gaps = [
    {t:'Bio mismatch across platforms',b:'Your X bio sells, LinkedIn explains, Reddit is empty. Pick one positioning.'},
    {t:'Cadence collapse',b:'Posted 14 times in March → 2 in May. Algorithms forget faster than people.'},
    {t:'Zero borrowed trust',b:'No quote, mention, or guest slot in the last 90 days.'},
    {t:'Search surface is thin',b:'Page 1 Google for your name = LinkedIn + a 2019 Medium post.'},
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 460 }}>
      <div style={{ padding: 32, borderRight: '1px solid var(--line)', background: 'var(--bg-warm)', position: 'relative' }}>
        <div className="eyebrow">Visibility Score</div>
        <div className="h-display" style={{ fontSize: 96, color: 'var(--ink)', margin: '8px 0', lineHeight: 1 }}>62<span style={{ fontSize: 28, color: 'var(--ink-3)' }}>/100</span></div>
        <div className="flex aic gap-2"><span className="chip chip-orange"><Icon name="arrowUR" size={12} /> +14 last 30 days</span></div>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 20, maxWidth: 320 }}>You&apos;re <strong style={{ color: 'var(--ink)' }}>more findable than 71%</strong> of seed-stage Indian founders, but still beneath the threshold investors search for.</p>
        <div style={{ marginTop: 28 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Where you&apos;re showing up</div>
          {platforms.map(([p,v]) => (<div key={p} className="flex aic gap-3" style={{ marginBottom: 10 }}><span style={{ fontSize: 12.5, color: 'var(--ink-2)', width: 90 }}>{p}</span><div style={{ flex: 1, height: 5, background: 'var(--bg-soft)', borderRadius: 999, overflow: 'hidden' }}><div style={{ width:`${v}%`, height:'100%', background:'var(--ink-2)' }} /></div><span style={{ fontSize: 12, color: 'var(--ink-3)', width: 32, textAlign: 'right' }}>{v}</span></div>))}
        </div>
      </div>
      <div style={{ padding: 28, position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>What&apos;s pulling you down</div>
        {gaps.map((r,i) => (<div key={i} className="flex gap-3" style={{ padding:'12px 0', borderBottom:i<3?'1px solid var(--line)':'none', filter:i>1?'blur(2.5px)':'none' }}><span style={{ width:28,height:28,borderRadius:8,background:'var(--orange-tint)',color:'var(--orange)',display:'grid',placeItems:'center',flexShrink:0 }}><Icon name="bolt" size={14} /></span><div><div style={{ fontSize:14,fontWeight:600,color:'var(--ink)' }}>{r.t}</div><div style={{ fontSize:13,color:'var(--ink-3)',marginTop:4 }}>{r.b}</div></div></div>))}
        <LockedOverlay user={user} setPage={setPage} label="Sign up free to get your personalised fix list" />
      </div>
    </div>
  );
}

const TOOL_CARDS = [
  { i: 0, icon: 'compass' as const, t: 'Investor Discovery', b: '8,400+ active investors. Filter by stage, geo, cheque, thesis, and warmth path.' },
  { i: 1, icon: 'check' as const, t: 'Startup Readiness', b: 'A 5-axis score of how investor-ready you are — with a personalised fix list.' },
  { i: 2, icon: 'eye' as const, t: 'Founder Visibility Score', b: 'How findable, mentionable, and trustworthy you look across the open internet.' },
];

export function ToolsPage({ setPage, user }: { setPage: (p: Page) => void; user: User | null }) {
  const [tab, setTab] = useState(0);
  return (
    <main>
      <section style={{ padding: '96px 0 40px' }}>
        <div className="shell">
          <SectionLabel>Tools</SectionLabel>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px,6vw,88px)', margin: '20px 0 16px' }}>
            Three tools founders <span className="it">actually use</span>.
          </h1>
          <p className="lead" style={{ fontSize: 19 }}>
            Preview each tool freely. Sign up to get your first real result. Go Pro to unlock saved searches, exports, and the full investor & opportunity database.
          </p>
        </div>
      </section>
      <section style={{ paddingBottom: 96 }}>
        <div className="shell">
          <div className="grid grid-3 mb-6">
            {TOOL_CARDS.map(t => (
              <button key={t.i} onClick={() => setTab(t.i)} className="card" style={{ padding: 26, textAlign: 'left', cursor: 'pointer', background: tab===t.i?'var(--ink)':'#fff', color: tab===t.i?'#fff':'var(--ink-2)', borderColor: tab===t.i?'var(--ink)':'var(--line)' }}>
                <span style={{ width:40,height:40,borderRadius:10,background:tab===t.i?'rgba(212,175,55,0.18)':'var(--bg-soft)',color:tab===t.i?'#D4AF37':'var(--ink)',display:'grid',placeItems:'center' }}><Icon name={t.icon} size={18} /></span>
                <h3 style={{ fontFamily:'var(--font-display)',fontSize:22,margin:'16px 0 6px',color:tab===t.i?'#fff':'var(--ink)',fontWeight:500 }}>{t.t}</h3>
                <p style={{ fontSize:13.5,color:tab===t.i?'rgba(255,255,255,0.65)':'var(--ink-3)',margin:0,lineHeight:1.5 }}>{t.b}</p>
              </button>
            ))}
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#fff', boxShadow: 'var(--shadow-md)' }}>
            {tab === 0 && <InvestorDiscoveryPreview user={user} setPage={setPage} />}
            {tab === 1 && <ReadinessPreview user={user} setPage={setPage} />}
            {tab === 2 && <VisibilityPreview user={user} setPage={setPage} />}
          </div>
          <div className="card mt-6" style={{ padding: 28, background: 'var(--bg-warm)', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ width:48,height:48,borderRadius:12,background:'var(--gold-tint)',color:'#7A5A0F',display:'grid',placeItems:'center' }}><Icon name="lock" size={18} /></span>
            <div style={{ flex:1,minWidth:240 }}>
              <h3 style={{ fontFamily:'var(--font-display)',fontSize:22,color:'var(--ink)',margin:0,fontWeight:500 }}>You can preview freely. Pro unlocks the rest.</h3>
              <p className="muted" style={{ fontSize:14,margin:'6px 0 0' }}>Saved searches, CSV export, history, warm-path graph, weekly digest, and the curated opportunity feed.</p>
            </div>
            <div className="flex gap-3">
              <button className="btn btn-ghost" onClick={() => setPage('auth')}>Sign up free</button>
              <button className="btn btn-gold" onClick={() => setPage('pro')}>Go Pro</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
