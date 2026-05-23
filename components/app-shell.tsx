'use client';
import { useState, useEffect } from 'react';
import { Nav } from './nav';
import { Footer } from './footer';
import { EntryGate } from './entry-gate';
import { Home } from './home';
import { AboutPage } from './pages/about';
import { ServicesPage } from './pages/services';
import { CommunityPage } from './pages/community';
import { ToolsPage } from './pages/tools';
import { ProPage } from './pages/pro';
import { AuthPage } from './pages/auth';
import type { Page, User } from '@/types';

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback; } catch { return fallback; }
}

export function AppShell() {
  const [entered, setEntered] = useState<boolean>(() => load('al:entered', false));
  const [user, setUser] = useState<User | null>(() => load('al:user', null));
  const [page, setPage] = useState<Page>(() => (load<string>('al:page', 'home') as Page));

  useEffect(() => { localStorage.setItem('al:entered', JSON.stringify(entered)); }, [entered]);
  useEffect(() => { localStorage.setItem('al:user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('al:page', page); }, [page]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [page]);

  const navigate = (p: Page) => setPage(p);

  if (!entered) {
    return (
      <EntryGate
        onContinue={(data) => {
          setUser(data);
          setEntered(true);
          setPage('home');
        }}
      />
    );
  }

  return (
    <div className="app fade-up" style={{ animationDuration: '.5s' }}>
      <Nav page={page} setPage={navigate} user={user} />
      {page === 'home' && <Home user={user} setPage={navigate} tweaks={{}} />}
      {page === 'about' && <AboutPage setPage={navigate} />}
      {page === 'services' && <ServicesPage setPage={navigate} />}
      {page === 'community' && <CommunityPage setPage={navigate} />}
      {page === 'tools' && <ToolsPage setPage={navigate} user={user} />}
      {page === 'pro' && <ProPage setPage={navigate} />}
      {page === 'auth' && <AuthPage user={user} setUser={setUser} setPage={navigate} />}
      <Footer setPage={navigate} />
    </div>
  );
}
