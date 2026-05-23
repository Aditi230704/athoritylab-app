'use client';
import { useState } from 'react';
import { Icon } from './icons';
import type { IconName } from './icons';

interface FieldProps {
  label: string;
  icon: IconName;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string | false;
  placeholder?: string;
  type?: string;
}

export function Field({ label, icon, value, onChange, onBlur, error, placeholder, type = 'text' }: FieldProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div>
      <label className="input-label">{label}</label>
      <div style={{
        position: 'relative',
        border: '1px solid ' + (error ? '#E26B5C' : focus ? 'var(--ink)' : 'var(--line)'),
        borderRadius: 14,
        background: '#fff',
        transition: 'border-color .15s ease, box-shadow .15s ease',
        boxShadow: focus ? '0 0 0 4px rgba(28,28,30,0.06)' : 'none',
      }}>
        <span style={{
          position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
          color: focus ? 'var(--ink)' : 'var(--ink-4)',
        }}>
          <Icon name={icon} size={17} />
        </span>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => { setFocus(false); onBlur?.(); }}
          placeholder={placeholder}
          style={{
            border: 'none', outline: 'none', background: 'transparent',
            height: 52, width: '100%', paddingLeft: 46, paddingRight: 16,
            fontSize: 15, color: 'var(--ink)', borderRadius: 14,
          }}
        />
      </div>
      {error && <div style={{ marginTop: 6, fontSize: 12.5, color: '#C75A4C' }}>{error}</div>}
    </div>
  );
}
