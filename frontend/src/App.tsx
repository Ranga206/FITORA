import { useEffect, useState, type FormEvent } from 'react'

import { FoodCatalog } from './components/FoodCatalog/FoodCatalog'

import { FitnessView } from './components/Fitness/FitnessView'


import { LoginPage } from './components/Login/LoginPage'


import './App.css'



type Profile = {

  id?: string

  age: number

  height: number

  weight: number

  sex: 'male' | 'female' | 'prefer_not_to_say'

  created_at?: string

  updated_at?: string

}



const emptyProfile: Profile = {

  age: 18,

  height: 165,

  weight: 55,

  sex: 'prefer_not_to_say',

}



const THEME_STORAGE_KEY = 'fitora_theme'

type Theme = 'light' | 'dark'

type View = 'dashboard' | 'food-catalog' | 'fitness'


type View = 'dashboard' | 'food-catalog' | 'login'




function getInitialView(): View {

  if (typeof window === 'undefined') return 'dashboard'

  const hash = window.location.hash.toLowerCase()

  if (

    hash === '#nutrition' ||
    hash === '#/nutrition' ||
    hash === '#food-catalog' ||

    hash === '#catalog' ||

    hash === '#/food-catalog' ||

    hash === '#/nutrition/foods' ||

    hash === '#nutrition-catalog'

  ) {

    return 'food-catalog'

  }

  if (
    hash === '#fitness' ||
    hash === '#/fitness' ||
    hash === '#workout' ||
    hash === '#fitness-demo' ||
    hash.startsWith('#fitness') ||
    hash.startsWith('#/fitness')
  ) {
    return 'fitness'
  }



  return 'dashboard'

}



function getInitialTheme(): Theme {

  if (typeof window === 'undefined') return 'light'

  try {

    const saved = localStorage.getItem(THEME_STORAGE_KEY)

    if (saved === 'light' || saved === 'dark') {

      return saved

    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  } catch {

    return 'light'

  }

}



async function requestProfile(

  method: 'GET' | 'POST' | 'PATCH',

  data?: Profile,

): Promise<Profile> {

  const response = await fetch('/api/v1/profile', {

    method,

    headers: data ? { 'Content-Type': 'application/json' } : undefined,

    body: data ? JSON.stringify(data) : undefined,

  })



  if (!response.ok) {

    const message =

      response.status === 404

        ? 'No profile exists yet. Create yours below.'

        : response.status === 409

          ? 'A profile already exists. Refresh and try editing it.'

          : `Request failed (${response.status}). Check the backend and try again.`



    throw new Error(message)

  }



  return response.json()

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



function App() {

  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const [currentView, setCurrentView] = useState<View>(getInitialView)

  const [isWorkoutActive, setIsWorkoutActive] = useState(false)



  const [profile, setProfile] = useState<Profile | null>(null)

  const [form, setForm] = useState<Profile>(emptyProfile)

  const [editing, setEditing] = useState(false)

  const [loading, setLoading] = useState(true)

  const [saving, setSaving] = useState(false)

  const [notice, setNotice] = useState('')

  const [error, setError] = useState('')



  // Hash-based routing synchronization

  useEffect(() => {

    function handleHashChange() {

      const hash = window.location.hash.toLowerCase()

      let targetView: View = 'dashboard'



      if (

        hash === '#nutrition' ||
    hash === '#/nutrition' ||
    hash === '#food-catalog' ||

        hash === '#catalog' ||

        hash === '#/food-catalog' ||

        hash === '#/nutrition/foods' ||

        hash === '#nutrition-catalog'

      ) {

        targetView = 'food-catalog'
      } else if (
        hash === '#fitness' ||
        hash === '#/fitness' ||
        hash === '#workout' ||
        hash === '#fitness-demo' ||
        hash.startsWith('#fitness') ||
        hash.startsWith('#/fitness')
      ) {
        targetView = 'fitness'
      }

      if (currentView === 'fitness' && targetView !== 'fitness' && isWorkoutActive) {
        const confirmLeave = window.confirm(
          'You have a workout in progress. Leaving now will discard your active session. Do you want to leave?'
        )
        if (!confirmLeave) {
          // Revert hash without leaving the active workout
          window.history.pushState(null, '', '#fitness')
          return
        }
        setIsWorkoutActive(false)
      }

      setCurrentView(targetView)


        setCurrentView('food-catalog')

      } else {

        setCurrentView('dashboard')

      }


    }



    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)

  }, [currentView, isWorkoutActive])

  // Guard against browser refresh or tab close while a workout is active
  useEffect(() => {
    if (!isWorkoutActive) return
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isWorkoutActive])


  }, [])




  function navigateTo(view: View) {

    if (currentView === 'fitness' && view !== 'fitness' && isWorkoutActive) {
      const confirmLeave = window.confirm(
        'You have a workout in progress. Leaving now will discard your active session. Do you want to leave?'
      )
      if (!confirmLeave) {
        return
      }
      setIsWorkoutActive(false)
    }



    setCurrentView(view)

    if (view === 'food-catalog') {

      window.location.hash = 'food-catalog'

    } else if (view === 'fitness') {
      window.location.hash = 'fitness'



    } else {

      window.location.hash = 'dashboard'

    }

  }



  // Theme synchronization and OS listener

  useEffect(() => {

    document.documentElement.setAttribute('data-theme', theme)

  }, [theme])



  useEffect(() => {

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleOSThemeChange = (e: MediaQueryListEvent) => {

      // Respect user explicit choice if saved in localStorage

      try {

        if (!localStorage.getItem(THEME_STORAGE_KEY)) {

          setTheme(e.matches ? 'dark' : 'light')

        }

      } catch {

        setTheme(e.matches ? 'dark' : 'light')

      }

    }

    mediaQuery.addEventListener('change', handleOSThemeChange)

    return () => mediaQuery.removeEventListener('change', handleOSThemeChange)

  }, [])



  function toggleTheme() {

    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

    try {

      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)

    } catch {

      // Ignore storage errors if disabled

    }

    setTheme(nextTheme)

  }



  // Profile data fetch

  useEffect(() => {

    let active = true



    requestProfile('GET')

      .then((data) => {

        if (!active) return

        setProfile(data)

        setForm(data)

      })

      .catch((err: Error) => {

        if (!active) return

        if (err.message.startsWith('No profile exists')) {

          setEditing(true)

          setNotice('Welcome! Create your profile to get started.')

        } else {

          setError(err.message)

        }

      })

      .finally(() => {

        if (active) setLoading(false)

      })



    return () => {

      active = false

    }

  }, [])



  function updateField(field: keyof Profile, value: string) {

    setForm((current) => ({

      ...current,

      [field]: field === 'sex' ? value : Number(value),

    }))

  }



  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault()

    setSaving(true)

    setError('')

    setNotice('')



    const payload = {

      age: Number(form.age),

      height: Number(form.height),

      weight: Number(form.weight),

      sex: form.sex,

    }



    try {

      const saved = await requestProfile(

        profile ? 'PATCH' : 'POST',

        payload,

      )

      setProfile(saved)

      setForm(saved)

      setEditing(false)

      setNotice('Your profile has been saved successfully.')

    } catch (err) {

      setError(err instanceof Error ? err.message : 'Unable to save profile.')

    } finally {

      setSaving(false)

    }

  }



  if (currentView === 'login') {

    return (

      <LoginPage

        onNavigateToDashboard={() => navigateTo('dashboard')}

        theme={theme}

        onToggleTheme={toggleTheme}

      />

    )

  }



  return (

    <div className="app-shell">

      <aside className="sidebar" aria-label="Main Navigation">

        <a
          className="brand"
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault()
            navigateTo('dashboard')
          }}
          aria-label="Fitora Home"
        >


        <a className="brand" href="#" aria-label="Fitora Home">


          <span className="brand-mark" aria-hidden="true">f.</span>

          <span>fitora<span className="brand-dot">.</span></span>

        </a>



        <p className="side-label" id="workspace-label">WORKSPACE</p>

        <nav className="navigation" aria-labelledby="workspace-label">

          <a

            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}

            href="#dashboard"

            onClick={(e) => {

              e.preventDefault()

              navigateTo('dashboard')

            }}

            aria-current={currentView === 'dashboard' ? 'page' : undefined}

          >

            <span className="nav-icon" aria-hidden="true">◫</span>

            <span>Dashboard</span>

          </a>

          <a

            className={`nav-item ${currentView === 'food-catalog' ? 'active' : ''}`}

            href="#food-catalog"

            onClick={(e) => {

              e.preventDefault()

              navigateTo('food-catalog')

            }}

            aria-current={currentView === 'food-catalog' ? 'page' : undefined}

          >

            <span className="nav-icon" aria-hidden="true">🥗</span>

            <span>Food Catalog</span>

            <small className="nav-pill">50 Verified</small>

          </a>

          <a
            className={`nav-item ${currentView === 'fitness' ? 'active' : ''}`}
            href="#fitness"
            onClick={(e) => {
              e.preventDefault()
              navigateTo('fitness')
            }}
            aria-current={currentView === 'fitness' ? 'page' : undefined}
          >


          <a className="nav-item" href="#fitness">


            <span className="nav-icon" aria-hidden="true">↗</span>

            <span>Fitness</span>

            <small className="nav-pill">Demo</small>


            <small className="nav-pill">Preview</small>


          </a>

          <a className="nav-item" href="#awareness">

            <span className="nav-icon" aria-hidden="true">✳</span>

            <span>Awareness</span>

            <small className="nav-pill">Preview</small>

          </a>

        </nav>



        <div className="sidebar-bottom">

          <div className="side-note">

            <span className="note-icon" aria-hidden="true">✦</span>

            <strong>Small steps matter.</strong>

            <p>Build habits that work for your life.</p>

          </div>

          <div className="side-footer">FITORA · DEMO BUILD</div>

        </div>

      </aside>



      <main className="main-content" id="dashboard">

        <header className="topbar">

          <div className="breadcrumb" aria-label="Breadcrumb">

            <span>Workspace</span>

            <span className="breadcrumb-sep" aria-hidden="true">/</span>

            {currentView === 'food-catalog' ? (

              <>

                <a

                  href="#dashboard"

                  onClick={(e) => {

                    e.preventDefault()

                    navigateTo('dashboard')

                  }}

                  className="breadcrumb-link"

                >

                  Nutrition

                </a>

                <span className="breadcrumb-sep" aria-hidden="true">/</span>

                <span className="breadcrumb-current">Food Catalog</span>

              </>
dated upstream
            ) : currentView === 'fitness' ? (
              <>
                <a
                  href="#dashboard"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo('dashboard')
                  }}
                  className="breadcrumb-link"
                >
                  Dashboard
                </a>
                <span className="breadcrumb-sep" aria-hidden="true">/</span>
                <span className="breadcrumb-current">Fitness</span>
              </>



            ) : (

              <span className="breadcrumb-current">Dashboard</span>

            )}

          </div>

          <div className="topbar-actions">



            <button



              type="button"



              className="login-topbar-btn"



              onClick={() => navigateTo('login')}



              aria-label="Sign In to Fitora"



            >



              <span aria-hidden="true">🔑</span>



              <span>Sign In</span>



            </button>

            <button

              type="button"

              className="theme-toggle-btn"

              onClick={toggleTheme}

              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}

              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}

            >

              <span className="theme-toggle-icon">

                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}

              </span>

              <span className="theme-toggle-text">

                {theme === 'dark' ? 'Light' : 'Dark'}

              </span>

            </button>



            <div className="demo-badge">

              <span className="pulse-dot" aria-hidden="true" />

              <span>Demo environment</span>

            </div>

          </div>

        </header>



        {currentView === 'food-catalog' ? (

          <FoodCatalog onBackToDashboard={() => navigateTo('dashboard')} />

        ) : currentView === 'fitness' ? (
          <FitnessView
            onBackToDashboard={() => navigateTo('dashboard')}
            onWorkoutActiveChange={setIsWorkoutActive}
            isWorkoutActive={isWorkoutActive}
          />



        ) : (

          <>

            <section className="welcome" aria-label="Welcome banner">

          <div className="welcome-content">

            <p className="eyebrow">YOUR WELLNESS SPACE</p>

            <h1>

              A healthier you,<br />

              <span>one step at a time.</span>

            </h1>

            <p className="welcome-copy">

              Your space to understand your habits, move with purpose, and make informed choices.

            </p>

          </div>

          <div className="welcome-art" aria-hidden="true">

            <div className="art-ring ring-one" />

            <div className="art-ring ring-two" />

            <div className="art-leaf">✳</div>

            <span className="art-caption">GROW AT YOUR PACE</span>

          </div>

        </section>



        <section className="pillar-grid" aria-label="Fitora wellness pillars">

          <article

            className="pillar-card nutrition-card clickable-pillar"

            id="nutrition"

            onClick={() => navigateTo('food-catalog')}

            role="button"

            tabIndex={0}

            onKeyDown={(e) => {

              if (e.key === 'Enter' || e.key === ' ') {

                e.preventDefault()

                navigateTo('food-catalog')

              }

            }}

            title="Explore verified Food Catalog"

          >

            <div className="pillar-top">

              <span className="pillar-icon" aria-hidden="true">◉</span>

              <span className="status-pill status-pill-active">Explore Catalog</span>

            </div>

            <p className="card-kicker">01 / NOURISH</p>

            <h2>Nutrition</h2>

            <p>Get to know your food and build balanced everyday habits.</p>

            <div className="pillar-bottom">

              <span>Explore Food Catalog (50 items)</span>

              <span aria-hidden="true">→</span>

            </div>

          </article>


          <article
            className="pillar-card fitness-card clickable-pillar"
            id="fitness"
            onClick={() => navigateTo('fitness')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                navigateTo('fitness')
              }
            }}
            title="Open Fitness Demo"
          >



          <article className="pillar-card fitness-card" id="fitness">


            <div className="pillar-top">

              <span className="pillar-icon" aria-hidden="true">↗</span>

              <span className="status-pill status-pill-active">Explore Demo</span>


              <span className="status-pill">Preview</span>


            </div>

            <p className="card-kicker">02 / MOVE</p>

            <h2>Fitness</h2>

            <p>Explore movement, exercise guidance, and consistency.</p>

            <div className="pillar-bottom">

              <span>Workout guidance &amp; tracker</span>
              <span aria-hidden="true">→</span>


              <span>Workout guidance</span>

              <span aria-hidden="true">↗</span>



            </div>

          </article>



          <article className="pillar-card awareness-card" id="awareness">

            <div className="pillar-top">

              <span className="pillar-icon" aria-hidden="true">✳</span>

              <span className="status-pill">Preview</span>

            </div>

            <p className="card-kicker">03 / UNDERSTAND</p>

            <h2>Awareness</h2>

            <p>Learn the why behind nutrition, fitness, and daily choices.</p>

            <div className="pillar-bottom">

              <span>Learn & discover</span>

              <span aria-hidden="true">↗</span>

            </div>

          </article>

        </section>



        <section className="profile-section" id="profile" aria-labelledby="profile-heading">

          <div className="section-heading">

            <div>

              <p className="eyebrow">YOUR PERSONAL SPACE</p>

              <h2 id="profile-heading">Profile overview</h2>

              <p className="section-subtitle">

                Manage your basic details. Your changes are saved through the backend.

              </p>

            </div>

            {profile && !editing && (

              <button

                type="button"

                className="secondary-button"

                onClick={() => {

                  setEditing(true)

                  setNotice('')

                  setError('')

                }}

              >

                <span>Edit profile</span>

                <span aria-hidden="true">↗</span>

              </button>

            )}

          </div>



          {notice && (

            <div className="notice success" role="status">

              <span className="notice-icon" aria-hidden="true">✓</span>

              <span>{notice}</span>

            </div>

          )}

          {error && (

            <div className="notice error" role="alert">

              <span className="notice-icon" aria-hidden="true">⚠</span>

              <span>{error}</span>

            </div>

          )}



          {loading ? (

            <div className="profile-panel loading-panel" role="status">

              <span className="spinner" aria-hidden="true" />

              <span>Loading your profile…</span>

            </div>

          ) : editing ? (

            <form className="profile-panel profile-form" onSubmit={handleSubmit}>

              <div className="form-heading">

                <div className="avatar" aria-hidden="true">F</div>

                <div>

                  <h3>{profile ? 'Update your details' : 'Create your profile'}</h3>

                  <p>Fields marked with * are required.</p>

                </div>

              </div>



              <div className="form-grid">

                <div className="form-field">

                  <div className="field-label-row">

                    <label htmlFor="field-age" className="field-label">Age *</label>

                    <span className="field-unit">years</span>

                  </div>

                  <input

                    id="field-age"

                    type="number"

                    min="13"

                    max="100"

                    required

                    className="form-input"

                    value={form.age}

                    onChange={(e) => updateField('age', e.target.value)}

                  />

                </div>



                <div className="form-field">

                  <div className="field-label-row">

                    <label htmlFor="field-height" className="field-label">Height *</label>

                    <span className="field-unit">cm</span>

                  </div>

                  <input

                    id="field-height"

                    type="number"

                    min="100"

                    max="250"

                    step="0.1"

                    required

                    className="form-input"

                    value={form.height}

                    onChange={(e) => updateField('height', e.target.value)}

                  />

                </div>



                <div className="form-field">

                  <div className="field-label-row">

                    <label htmlFor="field-weight" className="field-label">Weight *</label>

                    <span className="field-unit">kg</span>

                  </div>

                  <input

                    id="field-weight"

                    type="number"

                    min="30"

                    max="300"

                    step="0.1"

                    required

                    className="form-input"

                    value={form.weight}

                    onChange={(e) => updateField('weight', e.target.value)}

                  />

                </div>



                <div className="form-field">

                  <div className="field-label-row">

                    <label htmlFor="field-sex" className="field-label">Sex *</label>

                  </div>

                  <select

                    id="field-sex"

                    required

                    className="form-select"

                    value={form.sex}

                    onChange={(e) => updateField('sex', e.target.value)}

                  >

                    <option value="prefer_not_to_say">Prefer not to say</option>

                    <option value="male">Male</option>

                    <option value="female">Female</option>

                  </select>

                </div>

              </div>



              <div className="form-actions">

                {profile && (

                  <button

                    type="button"

                    className="cancel-button"

                    onClick={() => {

                      setForm(profile)

                      setEditing(false)

                      setError('')

                    }}

                  >

                    Cancel

                  </button>

                )}

                <button className="primary-button" type="submit" disabled={saving}>

                  {saving && <span className="spinner-sm" aria-hidden="true" />}

                  <span>{saving ? 'Saving…' : profile ? 'Save changes' : 'Create profile'}</span>

                  {!saving && <span aria-hidden="true">→</span>}

                </button>

              </div>

            </form>

          ) : profile ? (

            <div className="profile-panel">

              <div className="profile-summary">

                <div className="avatar" aria-hidden="true">F</div>

                <div>

                  <h3>Your Fitora profile</h3>

                  <p>Connected to your local development API</p>

                </div>

                <span className="connected-pill">

                  <span aria-hidden="true" />

                  <span>Saved</span>

                </span>

              </div>



              <div className="stats-grid">

                <div className="stat">

                  <span>Age</span>

                  <strong>{profile.age}<small> yrs</small></strong>

                </div>

                <div className="stat">

                  <span>Height</span>

                  <strong>{profile.height}<small> cm</small></strong>

                </div>

                <div className="stat">

                  <span>Weight</span>

                  <strong>{profile.weight}<small> kg</small></strong>

                </div>

                <div className="stat">

                  <span>Sex</span>

                  <strong className="sex-value">

                    {profile.sex === 'prefer_not_to_say'

                      ? 'Not specified'

                      : profile.sex === 'male'

                        ? 'Male'

                        : 'Female'}

                  </strong>

                </div>

              </div>



              <p className="saved-note">

                <span aria-hidden="true">✓</span> Profile loaded from the backend. Reload the page to verify persistence.

              </p>

            </div>

          ) : (

            <div className="profile-panel empty-panel">

              <div className="empty-symbol" aria-hidden="true">＋</div>

              <h3>Your profile starts here</h3>

              <p>Create a profile to test Fitora&apos;s working save and update flow.</p>

              <button

                type="button"

                className="primary-button"

                onClick={() => setEditing(true)}

              >

                <span>Create profile</span>

                <span aria-hidden="true">→</span>

              </button>

            </div>

          )}

        </section>

        </>

      )}



        <footer className="page-footer">

          <div>

            <span className="footer-brand">FITORA<span className="brand-dot">.</span></span>

            <span className="footer-tagline">Eat better. Move better. Live better.</span>

          </div>

          <span className="footer-meta">Working demo · Local development</span>

        </footer>

      </main>

    </div>

  )

}



export default App
