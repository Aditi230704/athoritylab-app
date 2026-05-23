'use client';
import { Logo } from './logo';
import { Icon } from './icons';
import type { Page } from '@/types';
import type { User } from '@/types';

const NAV_PAGES: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'community', label: 'Community' },
  { id: 'tools', label: 'Tools' },
  { id: 'pro', label: 'Pro' },
];

interface NavProps {
  page: Page;
  setPage: (p: Page) => void;
  user: User | null;
}

export function Nav({ page, setPage, user }: NavProps) {
  return (
    <header className="nav">
      <div className="shell nav-inner">
        <Logo onClick={() => setPage('home')} />
        <nav className="nav-links">
          {NAV_PAGES.map(p => (
            <button key={p.id}
              className={'nav-link' + (page === p.id ? ' active' : '')}
              onClick={() => setPage(p.id)}>
              {p.label}
            </button>
          ))}
        </nav>
        <div className="flex aic gap-3">
          {user ? (
            <button className="flex aic gap-3" onClick={() => setPage('auth')}
              style={{ padding: '6px 6px 6px 14px', borderRadius: 999, background: 'var(--bg-soft)', border: '1px solid var(--line)' }}>
              <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>
                {user.name?.split(' ')[0] || 'You'}
              </span>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#FF8A00,#D4AF37)', color: '#fff', fontSize: 12, fontWeight: 600, display: 'grid', placeItems: 'center' }}>
                {(user.name || 'U').trim().slice(0, 1).toUpperCase()}
              </span>
            </button>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => setPage('auth')}>Sign in</button>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => setPage('pro')}>Join Pro</button>
        </div>
      </div>
    </header>
  );
}
