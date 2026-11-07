import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dumbbell } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLocation } from '../context/LocationContext.jsx'
import { useDevState } from '../context/DevStateContext.jsx'

export function LoginPage() {
  const { signIn, isLoading, error, setError } = useAuth()
  const { hasPromptedLocation, openLocationSheet } = useLocation()
  const { forceLoginError } = useDevState()
  const navigate = useNavigate()
  const [localError, setLocalError] = useState(null)

  const handleGoogleLogin = async () => {
    setLocalError(null)
    try {
      // If dev state forces login error, test error state
      await signIn(forceLoginError)
      if (!hasPromptedLocation) {
        openLocationSheet()
      }
      navigate('/home', { replace: true })
    } catch (err) {
      setLocalError(err.message || 'Sign in did not work. Please try again.')
    }
  }

  const displayedError = localError || error

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-form bg-white rounded-card border border-slate-200/80 p-6 sm:p-8 shadow-card text-center">
        {/* Small Logo */}
        <div className="w-14 h-14 rounded-2xl bg-brand text-white flex items-center justify-center mx-auto mb-5 shadow-sm">
          <Dumbbell className="w-7 h-7" />
        </div>

        {/* Title "Welcome to GymApp" (24/700) */}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Welcome to GymApp
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto leading-relaxed">
          Sign in to find gyms near you and manage your plan.
        </p>

        {/* Continue with Google Button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleLogin}
          className="w-full h-12 bg-white hover:bg-slate-50 text-slate-900 font-medium text-sm rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-brand" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Signing in...</span>
            </span>
          ) : (
            <>
              {/* Official Google G Logo */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Error State */}
        {displayedError && (
          <p className="text-xs text-rose-600 font-medium mt-3 animate-fade-in">
            {displayedError}
          </p>
        )}

        {/* Small Terms and Privacy Policy text */}
        <p className="text-xs text-slate-400 mt-8 leading-relaxed">
          By continuing you agree to the{' '}
          <a href="#terms" onClick={(e) => e.preventDefault()} className="text-brand hover:underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-brand hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

