import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dumbbell } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export function SplashPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/home', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      {/* 96px centered blue rounded-square logo */}
      <div className="w-24 h-24 rounded-3xl bg-brand text-white flex items-center justify-center shadow-card mb-6 transition-transform hover:scale-105 duration-300">
        <Dumbbell className="w-12 h-12 stroke-[2.2]" />
      </div>

      {/* GymApp (28/700) */}
      <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-2">
        GymApp
      </h1>

      {/* Muted Tagline */}
      <p className="text-base text-slate-500 font-normal">
        Find your gym. Join in minutes.
      </p>

      {/* Ludhiana Launch Pill */}
      <div className="mt-8">
        <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
          📍 Ludhiana, Punjab
        </span>
      </div>
    </div>
  )
}

