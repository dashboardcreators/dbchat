import { useState } from 'react';
import { Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { api } from '../api.js';
import { C, FONT } from '../constants.js';

export default function LoginGate({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Email and password required.'); return; }
    setError('');
    setLoading(true);
    try {
      const { user } = await api.auth.login(email, password);
      onLogin(user);
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      fontFamily: FONT,
      background: '#070708',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Accent glows — red top-right, purple bottom-left */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        right: '-12%',
        width: '72%',
        height: '72%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.24) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-12%',
        width: '68%',
        height: '68%',
        background: 'radial-gradient(circle, rgba(83,74,183,0.30) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        pointerEvents: 'none',
      }} />

      {/* Brand header — centered above the card */}
      <div className="login-brand-panel" style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 28,
      }}>
        <img
          src="/forgemind-logo.gif"
          alt="ForgeMind Logo"
          style={{ height: 44, width: 44, objectFit: 'contain', flexShrink: 0 }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
        <div style={{ lineHeight: 1.15 }}>
          <div style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: C.headerText,
          }}>
            DB<span style={{ color: C.primary }}>Chat</span>
          </div>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#71717a',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: 3,
          }}>
            Dashboard Creators
          </div>
        </div>
      </div>

      {/* Sign-in card */}
      <div className="login-form-panel" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: 420,
        minWidth: 0,
        background: C.cardBg,
        borderRadius: 20,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.55)',
        padding: '36px 36px 32px',
        margin: '0 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Lock size={14} color={C.primary} />
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.primary,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Dashboard Creators
          </span>
        </div>
        <h2 style={{
          fontSize: 24,
          fontWeight: 800,
          color: C.text,
          letterSpacing: '-0.02em',
          marginBottom: 6,
        }}>
          Welcome back
        </h2>
        <p style={{
          fontSize: 13.5,
          color: C.textSecondary,
          lineHeight: 1.5,
          marginBottom: 24,
        }}>
          Sign in to build, manage, and monitor your DB Chat dashboards.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 18 }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.textSecondary,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}>
              Email
            </div>
            <input
              type="email"
              placeholder="admin@forgemind.space"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: `1.5px solid ${C.border}`,
                fontSize: 14,
                fontFamily: FONT,
                outline: 'none',
                background: C.cardBg,
                color: C.text,
                transition: 'border .15s, box-shadow .15s',
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = C.primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(220,38,38,0.13)`;
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 24 }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.textSecondary,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}>
              Password
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 16px',
                  borderRadius: 12,
                  border: `1.5px solid ${C.border}`,
                  fontSize: 14,
                  fontFamily: FONT,
                  outline: 'none',
                  background: C.cardBg,
                  color: C.text,
                  transition: 'border .15s, box-shadow .15s',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.boxShadow = `0 0 0 3px rgba(220,38,38,0.13)`;
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: C.textSecondary,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error && (
            <div style={{
              background: C.primaryLight,
              color: '#A32D2D',
              borderRadius: 10,
              border: '1px solid rgba(220,38,38,0.18)',
              padding: '11px 14px',
              fontSize: 13,
              marginBottom: 16,
              fontWeight: 500,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #E11D48 0%, #B91C1C 100%)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontFamily: FONT,
              boxShadow: '0 12px 28px rgba(220,38,38,0.35)',
              transition: 'opacity .15s, background .15s, box-shadow .15s',
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #C81E45 0%, #A11616 100%)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(220,38,38,0.45)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #E11D48 0%, #B91C1C 100%)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(220,38,38,0.35)';
            }}
          >
            <LogIn size={16} />
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>

      <a
        href="https://forgemind.in/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 10,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        FORGEMIND <span style={{ color: C.primary }}>AI</span>
      </a>

      {/* Responsive: tighten card on small screens */}
      <style>{`
        @media (max-width: 560px) {
          .login-brand-panel { margin-bottom: 20px !important; }
          .login-form-panel { padding: 26px 20px 24px !important; border-radius: 16px !important; }
        }
      `}</style>
    </div>
  );
}