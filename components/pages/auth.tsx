'use client';
import { useState } from 'react';
import { Icon } from '../icons';
import { SectionLabel } from '../section-label';
import { Field } from '../field';
import type { Page, User } from '@/types';
import type { IconName } from '../icons';

export function AuthPage({ user, setUser, setPage }: { user: User | null; setUser: (u: User | null) => void; setPage: (p: Page) => void }) {
  const [mode, setMode] = useState<'signup' | 'signin'>(user ? 'signup' : 'signup');
  return (
    <main>
      <section style={{ padding: '72px 0 96px', minHeight: 'calc(100vh - 68px - 360px)' }}>
        <div className="shell" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'stretch' }}>
          <div className="card" style={{ padding: 40, background: 'var(--bg-warm)', borderColor: 'var(--line-warm)', position: 'relative', overflow: 'hidden' }}>
            <div className="dotted" style={{ position: 'absolute', inset: 0, opacity: 0.4, maskImage: 'radial-gradient(circle at 80% 80%, black, transparent 70%)' }} />
            <div style={{ position: 'relative' }}>
              <SectionLabel tone="gold">Welcome back · or new here</SectionLabel>
              <h1 className="h-display" style={{ fontSize: 'clamp(36px,4.4vw,60px)', margin: '16px 0 14px' }}>
                Free to enter. <span className="it">Free to stay.</span>
              </h1>
              <p className="lead" style={{ fontSize: 17 }}>
                A free AthorityLab account opens the community, the opportunity feed
                (24h delay), and the tool previews. Pro is opt-in — no surprises.
              </p>
              <div className="card mt-10" style={{ padding: 22, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', borderColor: 'rgba(212,175,55,0.25)' }}>
                <Icon name="quote" size={20} style={{ color: 'var(--gold)' }} />
                <p className="h-display" style={{ fontSize: 19, margin: '8px 0 14px', lineHeight: 1.4 }}>
                  &ldquo;I came for the community. Stayed because of the dinners. Raised because of the warm intros.&rdquo;
                </p>
                <div className="flex aic gap-3">
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#FF8A00,#D4AF37)' }} />
                  <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                    <strong style={{ color: 'var(--ink)' }}>Rohan Nair</strong> · Founder, Vertica
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {user
              ? <AccountPanel user={user} setUser={setUser} setPage={setPage} />
              : <AuthForm mode={mode} setMode={setMode} onSubmit={(u) => { setUser(u); setPage('home'); }} />
            }
          </div>
        </div>
      </section>
    </main>
  );
}

function AuthForm({ mode, setMode, onSubmit }: { mode: 'signup' | 'signin'; setMode: (m: 'signup' | 'signin') => void; onSubmit: (u: User) => void }) {
  const isSignup = mode === 'signup';
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: form.name || 'Returning Founder',
      email: form.email || 'founder@athoritylab.com',
      phone: form.phone,
      returning: !isSignup,
    });
  };

  return (
    <form onSubmit={submit} className="card" style={{ padding: 36, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex gap-2" style={{ marginBottom: 24, background: 'var(--bg-soft)', padding: 4, borderRadius: 999, width: 'fit-content' }}>
        <button type="button" onClick={() => setMode('signup')} className={'nav-link' + (isSignup ? ' active' : '')} style={{ height: 36, padding: '0 16px', fontSize: 13.5 }}>Sign up</button>
        <button type="button" onClick={() => setMode('signin')} className={'nav-link' + (!isSignup ? ' active' : '')} style={{ height: 36, padding: '0 16px', fontSize: 13.5 }}>Sign in</button>
      </div>

      <h2 className="h-display" style={{ fontSize: 32, margin: '0 0 8px' }}>
        {isSignup ? 'Create your free account.' : 'Welcome back, founder.'}
      </h2>
      <p className="muted" style={{ fontSize: 14.5, margin: 0 }}>
        {isSignup ? 'It takes 20 seconds. No card required.' : 'Sign back in to your founder profile.'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 26 }}>
        {isSignup && (
          <Field label="Full name" icon="user" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Ananya Kapoor" />
        )}
        <Field label="Email" icon="mail" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="you@founder.com" />
        {isSignup && (
          <Field label="Phone" icon="phone" type="tel" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} placeholder="+91 98•••• ••••" />
        )}
        <Field label="Password" icon="lock" type="password" value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} placeholder="••••••••" />
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-full mt-6">
        {isSignup ? 'Create free account' : 'Sign in'} <Icon name="arrow" size={16} />
      </button>

      <div className="flex aic gap-3 mt-6" style={{ color: 'var(--ink-3)', fontSize: 12.5 }}>
        <span className="hairline" style={{ flex: 1 }} />
        <span>or continue with</span>
        <span className="hairline" style={{ flex: 1 }} />
      </div>

      <div className="flex gap-3 mt-4">
        <button type="button" className="btn btn-ghost w-full">
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)', flexShrink: 0 }} />
          Google
        </button>
        <button type="button" className="btn btn-ghost w-full">
          <Icon name="x" size={14} /> X / Twitter
        </button>
      </div>

      <p className="muted txt-c mt-6" style={{ fontSize: 12.5 }}>
        By continuing you agree to our Terms &amp; Privacy.
      </p>
    </form>
  );
}

function AccountPanel({ user, setUser, setPage }: { user: User; setUser: (u: User | null) => void; setPage: (p: Page) => void }) {
  return (
    <div className="card" style={{ padding: 36, background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex aic gap-4">
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#FF8A00,#D4AF37)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 600 }}>
          {(user.name || 'U').trim().slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h2 className="h-display" style={{ fontSize: 28, margin: 0 }}>Hi, {user.name?.split(' ')[0] || 'Founder'}.</h2>
          <p className="muted" style={{ margin: '4px 0 0', fontSize: 14 }}>Free member · joined today</p>
        </div>
      </div>

      <div className="hairline mt-8 mb-8" />

      <div className="eyebrow mb-4">Your founder profile</div>
      <div className="grid grid-2">
        <KV label="Name" v={user.name || '—'} />
        <KV label="Email" v={user.email || '—'} />
        <KV label="Phone" v={user.phone || '—'} />
        <KV label="Plan" v={<span className="chip" style={{ height: 24 }}>Free</span>} />
      </div>

      <div className="hairline mt-8 mb-8" />

      <div className="eyebrow mb-4">Recommended next</div>
      <div className="grid grid-2">
        <NextCard icon="compass" t="Run your Visibility Score" b="See how findable you are right now." cta="Open tool" onClick={() => setPage('tools')} />
        <NextCard icon="users" t="Enter the Community" b="Browse rooms. Introduce yourself in #intros." cta="Open community" onClick={() => setPage('community')} />
        <NextCard icon="diamond" t="Upgrade to Pro" b="Unlock warm intros, dinners, and the full investor database." cta="See Pro" gold onClick={() => setPage('pro')} />
        <NextCard icon="layers" t="Browse services" b="Hands-on tracks led by a dedicated strategist." cta="See services" onClick={() => setPage('services')} />
      </div>

      <div className="hairline mt-8 mb-6" />

      <div className="flex gap-3">
        <button className="btn btn-ghost btn-sm" onClick={() => { setUser(null); setPage('home'); }}>Sign out</button>
        <button className="btn btn-ghost btn-sm">Edit profile</button>
      </div>
    </div>
  );
}

function KV({ label, v }: { label: string; v: React.ReactNode }) {
  return (
    <div>
      <div className="muted" style={{ fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 14.5, color: 'var(--ink)', marginTop: 4 }}>{v}</div>
    </div>
  );
}

function NextCard({ icon, t, b, cta, gold, onClick }: { icon: IconName; t: string; b: string; cta: string; gold?: boolean; onClick: () => void }) {
  return (
    <div className="card card-hover" style={{ padding: 18, background: gold ? 'var(--gold-tint)' : '#fff', borderColor: gold ? 'rgba(212,175,55,0.4)' : 'var(--line)' }}>
      <div className="flex aic gap-3 mb-3">
        <span style={{ width: 32, height: 32, borderRadius: 8, background: gold ? '#fff' : 'var(--bg-soft)', color: gold ? '#7A5A0F' : 'var(--ink)', display: 'grid', placeItems: 'center' }}>
          <Icon name={icon} size={15} />
        </span>
        <div style={{ fontSize: 14, fontWeight: 600, color: gold ? '#7A5A0F' : 'var(--ink)' }}>{t}</div>
      </div>
      <p style={{ fontSize: 13, color: gold ? '#7A5A0F' : 'var(--ink-3)', margin: '0 0 12px', lineHeight: 1.5 }}>{b}</p>
      <button onClick={onClick} className={'btn btn-sm ' + (gold ? 'btn-gold' : 'btn-ghost')}>{cta} <Icon name="arrow" size={12} /></button>
    </div>
  );
}
