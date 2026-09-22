import { useState } from 'react';
import { Lock, LogIn, Eye, EyeOff, ArrowRight } from 'lucide-react';
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

    if (!email || !password) {
      setError('Email and password required.');
      return;
    }

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
    <>
      <div className="dbchat-login-page">
        {/* Background atmosphere */}
        <div className="dbchat-bg-glow dbchat-bg-glow-one" />
        <div className="dbchat-bg-glow dbchat-bg-glow-two" />

        <main className="dbchat-login-shell">

          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <section className="dbchat-login-visual">

            <div className="dbchat-visual-orb dbchat-orb-one" />
            <div className="dbchat-visual-orb dbchat-orb-two" />

            <div className="dbchat-curve dbchat-curve-one" />
            <div className="dbchat-curve dbchat-curve-two" />
            <div className="dbchat-curve dbchat-curve-three" />

            <div className="dbchat-grid" />

            {/* Logo */}
            <div className="dbchat-logo">
              <img
                src="/dbchat-logo.gif"
                alt="DBchat"
              />
            </div>

            {/* Main visual content */}
            <div className="dbchat-visual-content">

              <div className="dbchat-status">
                <span />
                <span>DBchat</span>
              </div>

              <h1>
                Connect.
                <br />
                Automate.
                <br />
                <strong>Grow.</strong>
              </h1>

              <p>
                A smarter workspace for managing WhatsApp conversations,
                customers, and business automation.
              </p>

            </div>
          </section>


          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}
          <section className="dbchat-login-panel">

            <div className="dbchat-login-content">

              {/* Login icon */}
              <div className="dbchat-login-icon">
                <Lock size={17} strokeWidth={2} />
              </div>

              <h2>Welcome back</h2>

              <p className="dbchat-login-description">
                Sign in to continue to your workspace.
              </p>


              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div className="dbchat-field">

                  <label htmlFor="dbchat-email">
                    Email
                  </label>

                  <input
                    id="dbchat-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    autoComplete="email"
                  />

                </div>


                {/* Password */}
                <div className="dbchat-field">

                  <label htmlFor="dbchat-password">
                    Password
                  </label>

                  <div className="dbchat-password-wrapper">

                    <input
                      id="dbchat-password"
                      type={showPw ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      className="dbchat-password-toggle"
                      onClick={() => setShowPw((value) => !value)}
                      aria-label={
                        showPw
                          ? 'Hide password'
                          : 'Show password'
                      }
                    >
                      {showPw ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>

                  </div>

                </div>


                {/* Error */}
                {error && (
                  <div className="dbchat-login-error">
                    {error}
                  </div>
                )}


                {/* Login button */}
                <button
                  type="submit"
                  className="dbchat-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="dbchat-spinner" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

              </form>


              {/* Footer */}
              <div className="dbchat-login-footer">
                <span>Powered by</span>
                <strong>Dashboard Creators</strong>
              </div>

            </div>

          </section>

        </main>
      </div>


      {/* =========================================================
          COMPLETE LOGIN PAGE CSS
      ========================================================== */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        /* =====================================================
           PAGE
        ====================================================== */

        .dbchat-login-page {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100dvh;
          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 28px;

          overflow: auto;

          background:
            radial-gradient(
              circle at 15% 50%,
              rgba(83, 74, 183, 0.14),
              transparent 35%
            ),
            radial-gradient(
              circle at 90% 20%,
              rgba(220, 38, 38, 0.10),
              transparent 32%
            ),
            #050506;

          color: ${C.text};
          font-family: ${FONT};
        }


        /* =====================================================
           BACKGROUND GLOWS
        ====================================================== */

        .dbchat-bg-glow {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(90px);
        }

        .dbchat-bg-glow-one {
          width: 420px;
          height: 420px;
          left: -220px;
          top: 25%;
          background: rgba(83, 74, 183, 0.15);
        }

        .dbchat-bg-glow-two {
          width: 360px;
          height: 360px;
          right: -180px;
          top: -120px;
          background: rgba(220, 38, 38, 0.12);
        }


        /* =====================================================
           MAIN SHELL
        ====================================================== */

        .dbchat-login-shell {
          position: relative;
          z-index: 2;

          width: min(1320px, 100%);
          height: min(820px, calc(100dvh - 56px));

          min-height: 620px;

          display: grid;
          grid-template-columns: 1.02fr 0.98fr;

          overflow: hidden;

          border-radius: 30px;

          background: #080809;

          border: 1px solid rgba(255,255,255,0.08);

          box-shadow:
            0 40px 100px rgba(0,0,0,0.60),
            0 0 0 1px rgba(255,255,255,0.015);
        }


        /* =====================================================
           LEFT VISUAL
        ====================================================== */

        .dbchat-login-visual {
          position: relative;
          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              #101a2c 0%,
              #171630 35%,
              #201127 65%,
              #08070c 100%
            );
        }


        /* =====================================================
           VISUAL ORBS
        ====================================================== */

        .dbchat-visual-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(18px);
        }

        .dbchat-orb-one {
          width: 650px;
          height: 650px;
          right: -300px;
          top: -260px;

          background:
            radial-gradient(
              circle,
              rgba(220,38,38,0.34) 0%,
              rgba(83,74,183,0.28) 35%,
              transparent 70%
            );
        }

        .dbchat-orb-two {
          width: 600px;
          height: 400px;
          left: -250px;
          bottom: -250px;

          background:
            radial-gradient(
              ellipse,
              rgba(83,74,183,0.34) 0%,
              rgba(83,74,183,0.08) 48%,
              transparent 72%
            );
        }


        /* =====================================================
           CURVES
        ====================================================== */

        .dbchat-curve {
          position: absolute;

          width: 130%;
          height: 420px;

          left: -20%;
          top: -30px;

          border-radius: 50%;

          pointer-events: none;

          transform: rotate(18deg);
        }

        .dbchat-curve-one {
          border-top: 1px solid rgba(255,255,255,0.08);
          border-right: 1px solid rgba(220,38,38,0.18);
        }

        .dbchat-curve-two {
          top: 60px;

          border-top: 1px solid rgba(255,255,255,0.045);
          border-right: 1px solid rgba(83,74,183,0.22);
        }

        .dbchat-curve-three {
          top: 150px;

          border-top: 1px solid rgba(255,255,255,0.035);
        }


        /* =====================================================
           GRID
        ====================================================== */

        .dbchat-grid {
          position: absolute;
          inset: 0;

          opacity: 0.20;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );

          background-size: 44px 44px;

          pointer-events: none;
        }


        /* =====================================================
           LEFT LOGO
        ====================================================== */

        .dbchat-logo {
          position: absolute;

          top: 38px;
          left: 42px;

          z-index: 4;

          width: 58px;
          height: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 17px;

          background: rgba(0,0,0,0.72);

          border: 1px solid rgba(255,255,255,0.10);

          box-shadow:
            0 14px 35px rgba(0,0,0,0.30);
        }

        .dbchat-logo img {
          width: 46px;
          height: 46px;

          object-fit: contain;

          display: block;
        }


        /* =====================================================
           LEFT CONTENT
        ====================================================== */

        .dbchat-visual-content {
          position: absolute;

          z-index: 5;

          left: 48px;
          right: 48px;
          bottom: 54px;
        }


        .dbchat-status {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 22px;

          padding: 8px 13px;

          border-radius: 999px;

          background: rgba(255,255,255,0.055);

          border: 1px solid rgba(255,255,255,0.08);

          color: rgba(255,255,255,0.72);

          font-size: 10px;
          font-weight: 750;

          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .dbchat-status span:first-child {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #dc2638;

          box-shadow:
            0 0 12px rgba(220,38,56,0.75);
        }


        .dbchat-visual-content h1 {
          margin: 0;

          max-width: 620px;

          color: #ffffff;

          font-size: clamp(48px, 5vw, 78px);

          line-height: 0.98;

          font-weight: 300;

          letter-spacing: -0.055em;
        }

        .dbchat-visual-content h1 strong {
          font-weight: 800;

          background:
            linear-gradient(
              90deg,
              #ffffff 0%,
              #ffffff 40%,
              #d8d3ff 100%
            );

          -webkit-background-clip: text;
          background-clip: text;

          -webkit-text-fill-color: transparent;
        }


        .dbchat-visual-content p {
          margin: 25px 0 0;

          max-width: 520px;

          color: rgba(255,255,255,0.55);

          font-size: 14px;

          line-height: 1.75;
        }


        /* =====================================================
           RIGHT LOGIN PANEL
        ====================================================== */

        .dbchat-login-panel {
          display: flex;
          align-items: center;
          justify-content: center;

          min-width: 0;

          padding: 60px 80px;

          background:
            radial-gradient(
              circle at 70% 15%,
              rgba(220,38,38,0.035),
              transparent 30%
            ),
            #080809;
        }


        .dbchat-login-content {
          width: 100%;
          max-width: 440px;
        }


        /* =====================================================
           LOGIN ICON
        ====================================================== */

        .dbchat-login-icon {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 20px;

          border-radius: 11px;

          color: #ff3048;

          background: rgba(220,38,38,0.10);

          border: 1px solid rgba(220,38,38,0.18);
        }


        /* =====================================================
           HEADING
        ====================================================== */

        .dbchat-login-content h2 {
          margin: 0;

          color: #ffffff;

          font-size: clamp(36px, 3.2vw, 48px);

          line-height: 1.08;

          font-weight: 700;

          letter-spacing: -0.045em;
        }


        .dbchat-login-description {
          margin: 13px 0 38px;

          color: rgba(255,255,255,0.52);

          font-size: 14px;

          line-height: 1.65;
        }


        /* =====================================================
           FORM
        ====================================================== */

        .dbchat-field {
          margin-bottom: 22px;
        }


        .dbchat-field label {
          display: block;

          margin-bottom: 9px;

          color: rgba(255,255,255,0.66);

          font-size: 11px;

          font-weight: 750;

          letter-spacing: 0.10em;

          text-transform: uppercase;
        }


        .dbchat-field input {
          width: 100%;
          height: 56px;

          padding: 0 16px;

          border-radius: 12px;

          border: 1px solid rgba(255,255,255,0.09);

          outline: none;

          background: #111113;

          color: #ffffff;

          font-family: ${FONT};

          font-size: 14px;

          transition:
            border-color .18s ease,
            box-shadow .18s ease,
            background .18s ease;
        }


        .dbchat-field input::placeholder {
          color: rgba(255,255,255,0.27);
        }


        .dbchat-field input:hover {
          border-color: rgba(255,255,255,0.15);
        }


        .dbchat-field input:focus {
          border-color: rgba(220,38,38,0.75);

          background: #121214;

          box-shadow:
            0 0 0 3px rgba(220,38,38,0.11);
        }


        /* =====================================================
           PASSWORD
        ====================================================== */

        .dbchat-password-wrapper {
          position: relative;
        }


        .dbchat-password-wrapper input {
          padding-right: 52px;
        }


        .dbchat-password-toggle {
          position: absolute;

          top: 50%;
          right: 11px;

          width: 36px;
          height: 36px;

          transform: translateY(-50%);

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0;

          border: none;

          background: transparent;

          color: rgba(255,255,255,0.40);

          cursor: pointer;

          border-radius: 8px;

          transition:
            color .15s ease,
            background .15s ease;
        }


        .dbchat-password-toggle:hover {
          color: rgba(255,255,255,0.78);

          background: rgba(255,255,255,0.05);
        }


        /* =====================================================
           ERROR
        ====================================================== */

        .dbchat-login-error {
          margin: -3px 0 18px;

          padding: 12px 14px;

          border-radius: 10px;

          border: 1px solid rgba(220,38,38,0.22);

          background: rgba(220,38,38,0.08);

          color: #ff7b89;

          font-size: 13px;

          line-height: 1.45;
        }


        /* =====================================================
           SUBMIT
        ====================================================== */

        .dbchat-submit {
          width: 100%;
          height: 56px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 10px;

          margin-top: 7px;

          padding: 0 20px;

          border: none;

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              #ed1f3d 0%,
              #c8172e 100%
            );

          color: #ffffff;

          font-family: ${FONT};

          font-size: 14px;

          font-weight: 750;

          cursor: pointer;

          box-shadow:
            0 14px 32px rgba(220,38,38,0.20);

          transition:
            transform .16s ease,
            box-shadow .16s ease,
            opacity .16s ease;
        }


        .dbchat-submit:hover:not(:disabled) {
          transform: translateY(-1px);

          box-shadow:
            0 18px 38px rgba(220,38,38,0.30);
        }


        .dbchat-submit:active:not(:disabled) {
          transform: translateY(0);
        }


        .dbchat-submit:disabled {
          opacity: 0.70;

          cursor: not-allowed;
        }


        /* =====================================================
           SPINNER
        ====================================================== */

        .dbchat-spinner {
          width: 16px;
          height: 16px;

          border-radius: 50%;

          border:
            2px solid rgba(255,255,255,0.30);

          border-top-color: #ffffff;

          animation:
            dbchat-spin .7s linear infinite;
        }


        @keyframes dbchat-spin {
          to {
            transform: rotate(360deg);
          }
        }


        /* =====================================================
           FOOTER
        ====================================================== */

        .dbchat-login-footer {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 5px;

          margin-top: 42px;
          padding-top: 22px;

          border-top: 1px solid rgba(255,255,255,0.07);

          color: rgba(255,255,255,0.34);

          font-size: 10px;

          font-weight: 650;

          letter-spacing: 0.08em;

          text-transform: uppercase;
        }


        .dbchat-login-footer strong {
          color: rgba(255,255,255,0.58);

          font-weight: 750;
        }


        /* =====================================================
           TABLET
        ====================================================== */

        @media (max-width: 1050px) {

          .dbchat-login-page {
            padding: 18px;
          }

          .dbchat-login-shell {
            height: calc(100dvh - 36px);

            min-height: 600px;

            grid-template-columns: 0.95fr 1.05fr;

            border-radius: 24px;
          }

          .dbchat-login-panel {
            padding: 45px 50px;
          }

          .dbchat-visual-content {
            left: 38px;
            right: 38px;
            bottom: 42px;
          }

          .dbchat-logo {
            top: 30px;
            left: 32px;
          }

          .dbchat-visual-content h1 {
            font-size: clamp(42px, 5vw, 62px);
          }
        }


        /* =====================================================
           TABLET / SMALL LAPTOP
        ====================================================== */

        @media (max-width: 820px) {

          .dbchat-login-page {
            position: relative;

            min-height: 100dvh;
            height: auto;

            padding: 18px;
          }

          .dbchat-login-shell {
            height: auto;
            min-height: calc(100dvh - 36px);

            grid-template-columns: 1fr;

            max-width: 620px;
          }

          .dbchat-login-visual {
            min-height: 350px;
          }

          .dbchat-login-panel {
            min-height: 470px;

            padding: 48px 46px;
          }

          .dbchat-visual-content {
            bottom: 36px;
          }

          .dbchat-visual-content h1 {
            font-size: 50px;
          }

          .dbchat-visual-content p {
            max-width: 500px;
          }
        }


        /* =====================================================
           MOBILE
        ====================================================== */

        @media (max-width: 560px) {

          .dbchat-login-page {
            padding: 0;

            background: #050506;
          }

          .dbchat-login-shell {
            width: 100%;
            min-height: 100dvh;

            border-radius: 0;

            border: none;

            box-shadow: none;
          }

          .dbchat-login-visual {
            min-height: 300px;
          }

          .dbchat-logo {
            top: 24px;
            left: 24px;

            width: 50px;
            height: 50px;

            border-radius: 14px;
          }

          .dbchat-logo img {
            width: 40px;
            height: 40px;
          }

          .dbchat-visual-content {
            left: 26px;
            right: 26px;
            bottom: 28px;
          }

          .dbchat-status {
            margin-bottom: 15px;

            padding: 7px 11px;

            font-size: 9px;
          }

          .dbchat-visual-content h1 {
            font-size: 39px;

            letter-spacing: -0.045em;
          }

          .dbchat-visual-content p {
            display: none;
          }

          .dbchat-login-panel {
            min-height: 0;

            padding: 38px 24px 30px;

            align-items: flex-start;
          }

          .dbchat-login-content h2 {
            font-size: 36px;
          }

          .dbchat-login-description {
            margin-bottom: 30px;
          }

          .dbchat-field {
            margin-bottom: 19px;
          }

          .dbchat-field input {
            height: 54px;
          }

          .dbchat-submit {
            height: 54px;
          }

          .dbchat-login-footer {
            margin-top: 32px;
          }
        }


        /* =====================================================
           VERY SMALL PHONES
        ====================================================== */

        @media (max-width: 380px) {

          .dbchat-login-visual {
            min-height: 270px;
          }

          .dbchat-visual-content h1 {
            font-size: 34px;
          }

          .dbchat-login-panel {
            padding-left: 20px;
            padding-right: 20px;
          }

          .dbchat-login-content h2 {
            font-size: 32px;
          }
        }

      `}</style>
    </>
  );
}