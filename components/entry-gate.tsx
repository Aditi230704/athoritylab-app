'use client';
import { useState } from 'react';
import { Logo } from './logo';
import { Icon } from './icons';
import { Field } from './field';
import { SectionLabel } from './section-label';
import type { User } from '@/types';

interface EntryGateProps {
  onContinue: (data: User) => void;
}

export function EntryGate({ onContinue }: EntryGateProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });
  const [submitting, setSubmitting] = useState(false);

  const errs = {
    name: form.name.trim().length < 2 ? 'Tell us your name' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'A valid email helps us reach you' : '',
    phone: form.phone.replace(/\D/g, '').length < 7 ? 'Include a phone number' : '',
  };
  const valid = !errs.name && !errs.email && !errs.phone;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => onContinue(form), 600);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.05fr 1fr', background: 'var(--bg)' }}>
      {/* Left — editorial */}
      <div style={{
        position: 'relative', padding: '44px 56px',
        background: 'radial-gradient(circle at 10% 10%,#FFF4E2 0%,transparent 40%),radial-gradient(circle at 90% 90%,#FBF1D4 0%,transparent 50%),#FAF7F2',
        borderRight: '1px solid var(--line-warm)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden',
      }}>
        <div className="dotted" style={{ position: 'absolute', inset: 0, opacity: 0.5, maskImage: 'radial-gradient(circle at 60% 40%,black 0%,transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}><Logo /></div>
        <div style={{ position: 'relative', zIndex: 2, animation: 'fade-up .8s cubic-bezier(.2,.7,.2,1) both' }}>
          <span className="chip chip-gold" style={{ marginBottom: 28 }}>
            <Icon name="diamond" size={12} /> Founder ecosystem · 2026
          </span>
          <h1 className="h-display" style={{ fontSize: 'clamp(40px,5.2vw,68px)', margin: 0 }}>
            Build Authority<br />
            That <span className="it" style={{ color: 'var(--ink)' }}>Unlocks</span>{' '}
            <span className="gold-underline">Opportunities</span>.
          </h1>
          <p className="lead" style={{ marginTop: 26, fontSize: 17.5, maxWidth: '48ch' }}>
            Join founders building visibility, trust, and meaningful connections online.
            AthorityLab is where you become someone people search for.
          </p>
          <div className="flex gap-6 mt-10" style={{ alignItems: 'center' }}>
            <div className="flex" style={{ marginRight: 4 }}>
              {(['#F4D58D', '#FF8A00', '#C99A22', '#1C1C1E'] as const).map((bg, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: '50%', background: bg,
                  border: '2px solid var(--bg-warm)', marginLeft: i === 0 ? 0 : -10,
                  display: 'grid', placeItems: 'center',
                  color: i === 3 ? '#D4AF37' : 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: 13,
                }}>
                  {(['AK', 'MS', 'RP', '+'] as const)[i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>2,400+ founders inside</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>From pre-seed to Series B</div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="card" style={{ padding: 22, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderColor: 'rgba(212,175,55,0.25)' }}>
            <Icon name="quote" size={20} style={{ color: 'var(--gold)' }} />
            <p style={{ margin: '10px 0 14px', fontSize: 15.5, lineHeight: 1.55, color: 'var(--ink)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
              "I went from invisible to inboxed. Three investor conversations came from posts I never would have written alone."
            </p>
            <div className="flex aic gap-3">
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF37,#FF8A00)' }} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>Priya Raghavan</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>Founder, Lumeo · Bengaluru</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '56px' }}>
        <form onSubmit={submit} style={{ width: '100%', maxWidth: 440, animation: 'fade-up .9s cubic-bezier(.2,.7,.2,1) both' }}>
          <SectionLabel>Welcome · Step 1 of 1</SectionLabel>
          <h2 className="h-display" style={{ fontSize: 34, margin: '14px 0 8px' }}>One quick intro.</h2>
          <p style={{ color: 'var(--ink-3)', fontSize: 15, margin: 0 }}>
            Free to enter. No card, no fluff. We&apos;ll set up your founder profile next.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 32 }}>
            <Field label="Full name" icon="user" value={form.name}
              onChange={v => setForm(f => ({ ...f, name: v }))}
              onBlur={() => setTouched(t => ({ ...t, name: true }))}
              error={touched.name && errs.name} placeholder="Ananya Kapoor" />
            <Field label="Email" icon="mail" type="email" value={form.email}
              onChange={v => setForm(f => ({ ...f, email: v }))}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              error={touched.email && errs.email} placeholder="you@founder.com" />
            <Field label="Phone" icon="phone" type="tel" value={form.phone}
              onChange={v => setForm(f => ({ ...f, phone: v }))}
              onBlur={() => setTouched(t => ({ ...t, phone: true }))}
              error={touched.phone && errs.phone} placeholder="+91 98•••• ••••" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-full"
            style={{ marginTop: 26, opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Opening AthorityLab…' : <><span>Continue</span> <Icon name="arrow" size={16} /></>}
          </button>
          <div className="flex aic gap-3 mt-6" style={{ color: 'var(--ink-3)', fontSize: 12.5 }}>
            <Icon name="lock" size={14} />
            <span>Your details stay private. By continuing you agree to our Terms.</span>
          </div>
          <div className="hairline mt-8" />
          <div className="flex jcb aic mt-6">
            <span style={{ fontSize: 13.5, color: 'var(--ink-3)' }}>Already with us?</span>
            <button type="button" className="btn-link" style={{ fontSize: 13.5 }}
              onClick={() => onContinue({ name: 'Returning Founder', email: 'founder@athoritylab.com', phone: '+91 9876543210', returning: true })}>
              Sign in instead →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
