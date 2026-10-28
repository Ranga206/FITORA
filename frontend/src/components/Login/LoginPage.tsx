import { useState, type FormEvent, type ChangeEvent } from 'react'
import './LoginPage.css'

export interface LoginPageProps {
  onNavigateToDashboard: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

interface AlertState {
  type: 'error' | 'warning' | 'info'
  title: string
  message: string
}

interface ModalState {
  title: string
  content: React.ReactNode
}

// --------------------------------------------------------------------------
// INLINE VECTOR ICONS
// --------------------------------------------------------------------------

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
      />
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
      />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function AlertCircleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function InfoCircleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------------------------------

export function LoginPage({
  onNavigateToDashboard,
  theme,
  onToggleTheme,
}: LoginPageProps) {
  // Form input states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Validation & status states
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<AlertState | null>(null)

  // Modal inspection dialog
  const [modal, setModal] = useState<ModalState | null>(null)

  // Validation helper
  function validateEmail(value: string): boolean {
    const trimmed = value.trim()
    if (!trimmed) {
      setEmailError('Email address is required.')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      setEmailError('Please enter a valid email address (e.g., alex@fitora.app).')
      return false
    }
    setEmailError('')
    return true
  }

  function validatePassword(value: string): boolean {
    if (!value) {
      setPasswordError('Password is required.')
      return false
    }
    if (value.length < 8) {
      setPasswordError('Password must contain at least 8 characters.')
      return false
    }
    setPasswordError('')
    return true
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setEmail(val)
    if (emailError) {
      validateEmail(val)
    }
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setPassword(val)
    if (passwordError) {
      validatePassword(val)
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAlert(null)

    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (!isEmailValid || !isPasswordValid) {
      return
    }

    setLoading(true)

    try {
      // Direct call to check if backend authentication endpoint exists
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })

      if (!response.ok) {
        if (response.status === 404) {
          // Documented requirement: If backend authentication is not implemented,
          // explain clearly that real login requires backend authentication without
          // simulating fake success.
          setAlert({
            type: 'warning',
            title: 'Backend Authentication Notice',
            message:
              'The backend authentication endpoint (/api/v1/auth/login) has not been implemented yet. Your email format and password were fully validated on the client side, but session authentication requires backend route implementation.',
          })
        } else {
          setAlert({
            type: 'error',
            title: 'Sign In Failed',
            message: `Server returned status ${response.status}. Please check your credentials or review backend logs.`,
          })
        }
      } else {
        // In the future when backend auth endpoint is implemented
        setAlert({
          type: 'info',
          title: 'Authentication Response',
          message: 'Received response from backend authentication service.',
        })
      }
    } catch {
      // When offline or backend service is unreachable
      setAlert({
        type: 'warning',
        title: 'Backend Service Unavailable',
        message:
          'Unable to reach backend service at /api/v1/auth/login. Client-side input validation succeeded. Real authentication requires a running backend with authentication routes.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Placeholder handlers for features without backend flows yet
  function handleForgotPasswordClick() {
    setModal({
      title: 'Password Recovery (In Development)',
      content: (
        <div>
          <h4>Self-Service Password Reset</h4>
          <p>
            The automated email password-recovery workflow will be connected in
            Phase 2 once transactional email and token dispatch are configured on
            the backend.
          </p>
          <h4>Current Demo Workstation Instructions</h4>
          <p>
            For local evaluation, your session data and personal biometric metrics
            can be managed directly within the <strong>Dashboard Workspace</strong>{' '}
            without requiring password resets.
          </p>
        </div>
      ),
    })
  }

  function handleCreateAccountClick() {
    setModal({
      title: 'Account Registration (Phase 2)',
      content: (
        <div>
          <h4>Registration Roadmap</h4>
          <p>
            User self-registration and credential onboarding will be enabled
            once user authentication tables and cryptographic hashing are finalized.
          </p>
          <h4>Explore Available Capabilities</h4>
          <p>
            You can immediately test the <strong>Food Catalog (50 verified items)</strong>,
            custom filters, macros, and profile biometrics in the workspace.
          </p>
        </div>
      ),
    })
  }

  function handleGoogleOAuthClick() {
    setModal({
      title: 'Google OAuth Integration',
      content: (
        <div>
          <h4>OAuth Provider Status</h4>
          <p>
            Google Sign-In requires active OAuth 2.0 client credentials (`CLIENT_ID` and `CLIENT_SECRET`)
            configured in the backend environment.
          </p>
          <p>
            This demo application strictly avoids dummy social callbacks. Once your Google Cloud Console
            OAuth credentials are provisioned in `.env`, one-click social authentication will activate.
          </p>
        </div>
      ),
    })
  }

  function handleTermsClick() {
    setModal({
      title: 'FITORA Terms of Service',
      content: (
        <div>
          <h4>1. Nature of the Platform</h4>
          <p>
            FITORA is a lifestyle, nutrition, and wellness educational platform.
            Content, biometrics, and caloric estimates are provided for screening
            and informational purposes only and do not constitute medical advice or diagnosis.
          </p>
          <h4>2. Personal Responsibility</h4>
          <p>
            Users are encouraged to consult certified healthcare or dietary professionals
            before undertaking significant dietary changes or strenuous workout programs.
          </p>
          <h4>3. Account Integrity</h4>
          <p>
            You are responsible for maintaining the confidentiality of your credentials
            and for all activities that occur under your account.
          </p>
        </div>
      ),
    })
  }

  function handlePrivacyClick() {
    setModal({
      title: 'FITORA Privacy Policy',
      content: (
        <div>
          <h4>1. Biometric Data Privacy</h4>
          <p>
            Your health metrics (age, height, weight, dietary logs) are strictly reserved
            for calculating baseline metabolic context (BMR/TDEE). They are never shared,
            sold, or utilized for advertising networks.
          </p>
          <h4>2. Security Standards</h4>
          <p>
            Data persistence utilizes relational integrity constraints and prepared statements.
            Passwords are never stored in browser local storage or transmitted in plaintext.
          </p>
          <h4>3. User Control</h4>
          <p>
            You have full ownership of your logged nutritional entries and personal profile metrics,
            with the ability to update or reset them at any time.
          </p>
        </div>
      ),
    })
  }

  return (
    <div className="login-page">
      {/* ------------------------------------------------------------------
          LEFT SECTION — BRAND & VISUAL STORYTELLING
          ------------------------------------------------------------------ */}
      <section className="login-story-column" aria-label="FITORA Brand and Wellness Pillars">
        {/* Decorative Background Geometry */}
        <div className="login-bg-decor" aria-hidden="true">
          <div className="login-ambient-ring ring-outer" />
          <div className="login-ambient-ring ring-inner" />
          <div className="login-ambient-glow" />
        </div>

        {/* Story Header */}
        <div className="login-story-header">
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault()
              onNavigateToDashboard()
            }}
            className="login-brand-link"
            aria-label="Fitora Home"
          >
            <span className="login-brand-mark" aria-hidden="true">f.</span>
            <span>fitora<span className="login-brand-dot">.</span></span>
          </a>

          <div className="login-platform-badge">
            <span className="login-badge-dot" aria-hidden="true" />
            <span>Unified Wellness Platform</span>
          </div>
        </div>

        {/* Story Content */}
        <div className="login-story-content">
          <span className="login-story-eyebrow">Eat Better • Move Better • Live Better</span>
          <h1 className="login-story-headline">
            Your journey to a <span>healthier you</span> starts here.
          </h1>
          <p className="login-story-description">
            Fuel your goals with smarter nutrition, personalized insights, and healthier everyday choices.
          </p>

          {/* Visual Showcase Card */}
          <div className="login-preview-card" aria-label="Wellness Dashboard Snapshot">
            <div className="preview-card-header">
              <span className="preview-card-title">
                <span style={{ color: 'var(--primary)' }}>●</span>
                Today&apos;s Wellness Snapshot
              </span>
              <span className="preview-pill-badge">3 Core Pillars</span>
            </div>

            <div className="preview-pillars-row">
              {/* Pillar 1: Nutrition */}
              <div className="preview-pillar-item">
                <span className="pillar-item-icon" aria-hidden="true">🥗</span>
                <span className="pillar-item-label">Nourish</span>
                <span className="pillar-item-value">2,150 kcal</span>
                <span className="pillar-item-sub">Balanced target</span>
                <div className="pillar-mini-bar" aria-hidden="true">
                  <div className="pillar-mini-fill fill-nutrition" />
                </div>
              </div>

              {/* Pillar 2: Fitness */}
              <div className="preview-pillar-item">
                <span className="pillar-item-icon" aria-hidden="true">↗</span>
                <span className="pillar-item-label">Move</span>
                <span className="pillar-item-value">4 / 5 days</span>
                <span className="pillar-item-sub">Weekly activity</span>
                <div className="pillar-mini-bar" aria-hidden="true">
                  <div className="pillar-mini-fill fill-fitness" />
                </div>
              </div>

              {/* Pillar 3: Awareness */}
              <div className="preview-pillar-item">
                <span className="pillar-item-icon" aria-hidden="true">✳</span>
                <span className="pillar-item-label">Understand</span>
                <span className="pillar-item-value">8h 12m</span>
                <span className="pillar-item-sub">Restorative sleep</span>
                <div className="pillar-mini-bar" aria-hidden="true">
                  <div className="pillar-mini-fill fill-awareness" />
                </div>
              </div>
            </div>

            <div className="login-trust-row">
              <span className="trust-item">
                <span className="trust-item-icon" aria-hidden="true">
                  <ShieldCheckIcon />
                </span>
                Evidence-based dietary models
              </span>
              <span className="trust-item">
                <span className="trust-item-icon" aria-hidden="true">
                  <CheckIcon />
                </span>
                Private &amp; self-hosted
              </span>
            </div>
          </div>
        </div>

        {/* Story Footer */}
        <div className="login-story-footer">
          <span className="story-tagline">FITORA Wellness Systems</span>
          <span className="story-meta">Version 0.1 • Production UI</span>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          RIGHT SECTION — LOGIN FORM
          ------------------------------------------------------------------ */}
      <section className="login-form-column" aria-label="Sign In Form">
        {/* Top Utility Bar */}
        <header className="login-topbar">
          <button
            type="button"
            className="login-back-btn"
            onClick={onNavigateToDashboard}
            aria-label="Return to Dashboard Workspace"
          >
            <ArrowLeftIcon />
            <span>Back to Workspace</span>
          </button>

          <div className="login-topbar-actions">
            <button
              type="button"
              className="login-theme-btn"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </header>

        {/* Centered Form Wrapper */}
        <div className="login-form-wrapper">
          {/* Mobile Brand Mark */}
          <div className="login-mobile-header">
            <span className="login-brand-mark" aria-hidden="true">f.</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px' }}>
              fitora<span style={{ color: 'var(--primary)' }}>.</span>
            </span>
          </div>

          <div className="login-form-heading">
            <div className="login-form-kicker">SECURE SIGN IN</div>
            <h2 className="login-form-title">Welcome back</h2>
            <p className="login-form-subtitle">
              Sign in to continue your wellness journey.
            </p>
          </div>

          {/* Status / Alert Banner */}
          {alert && (
            <div className={`login-alert ${alert.type}`} role="alert" aria-live="assertive">
              <span className="login-alert-icon" aria-hidden="true">
                {alert.type === 'error' ? (
                  <AlertCircleIcon />
                ) : (
                  <InfoCircleIcon />
                )}
              </span>
              <div className="login-alert-content">
                <div className="login-alert-title">{alert.title}</div>
                <div className="login-alert-body">{alert.message}</div>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="login-field">
              <div className="login-field-header">
                <label htmlFor="login-email" className="login-label">
                  Email address <span className="login-label-req">*</span>
                </label>
              </div>
              <div className="login-input-group">
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="alex@fitora.app"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => validateEmail(email)}
                  disabled={loading}
                  className={`login-input ${emailError ? 'has-error' : ''}`}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error-msg' : undefined}
                />
                <span className="login-input-icon">
                  <MailIcon />
                </span>
              </div>
              {emailError && (
                <div className="login-field-error" id="email-error-msg" role="alert">
                  <span aria-hidden="true">⚠</span>
                  <span>{emailError}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="login-field">
              <div className="login-field-header">
                <label htmlFor="login-password" className="login-label">
                  Password <span className="login-label-req">*</span>
                </label>
              </div>
              <div className="login-input-group">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => validatePassword(password)}
                  disabled={loading}
                  className={`login-input ${passwordError ? 'has-error' : ''}`}
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? 'password-error-msg' : undefined}
                />
                <span className="login-input-icon">
                  <LockIcon />
                </span>
                <button
                  type="button"
                  className="login-toggle-pw"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {passwordError && (
                <div className="login-field-error" id="password-error-msg" role="alert">
                  <span aria-hidden="true">⚠</span>
                  <span>{passwordError}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="login-options-row">
              <label className="login-remember-label">
                <input
                  type="checkbox"
                  name="remember"
                  className="login-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="login-forgot-btn"
                onClick={handleForgotPasswordClick}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="login-spinner" aria-hidden="true" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="login-divider" aria-hidden="true">
              <span>OR CONTINUE WITH</span>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              className="login-social-btn"
              onClick={handleGoogleOAuthClick}
              aria-label="Continue with Google"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            {/* Create Account Switch */}
            <div className="login-create-account-row">
              <span>Don&apos;t have an account? </span>
              <button
                type="button"
                className="login-create-btn"
                onClick={handleCreateAccountClick}
              >
                Create account
              </button>
            </div>
          </form>
        </div>

        {/* Legal Footer */}
        <footer className="login-form-footer">
          <p className="login-legal-copy">
            By signing in, you agree to FITORA&apos;s{' '}
            <button
              type="button"
              className="login-legal-link"
              onClick={handleTermsClick}
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button
              type="button"
              className="login-legal-link"
              onClick={handlePrivacyClick}
            >
              Privacy Policy
            </button>
            .
          </p>
        </footer>
      </section>

      {/* ------------------------------------------------------------------
          INTERACTIVE INFORMATION MODAL
          ------------------------------------------------------------------ */}
      {modal && (
        <div
          className="login-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
          onClick={() => setModal(null)}
        >
          <div
            className="login-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="login-modal-header">
              <h3 id="login-modal-title" className="login-modal-title">
                {modal.title}
              </h3>
              <button
                type="button"
                className="login-modal-close"
                onClick={() => setModal(null)}
                aria-label="Close dialog"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="login-modal-body">{modal.content}</div>
            <div className="login-modal-footer">
              <button
                type="button"
                className="login-back-btn"
                onClick={() => setModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
