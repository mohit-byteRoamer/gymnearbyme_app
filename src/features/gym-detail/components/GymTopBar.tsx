import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, Heart, Moon, Sun, ChevronRight } from 'lucide-react'
import { useGymDetailStore } from '../store/gymDetailStore.ts'
import { Gym } from '../types/index.ts'
import { useToast } from '../../../context/ToastContext.jsx'

interface Props {
  gym: Gym
}

export function GymTopBar({ gym }: Props) {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { isFavorite, toggleFavorite, theme, toggleTheme } = useGymDetailStore()

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: gym.name,
          text: `Check out ${gym.name} on GymApp Ludhiana!`,
          url,
        })
        return
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(url)
    showToast('Link copied to clipboard!', 'success')
  }

  return (
    <div className="flex items-center justify-between py-3 mb-2">
      {/* Left: Back button & Breadcrumbs on Desktop */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Desktop Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <button
            onClick={() => navigate('/home')}
            className="hover:text-brand transition"
          >
            Gyms
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            {gym.locality}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-100 font-semibold truncate max-w-[200px]">
            {gym.name}
          </span>
        </nav>
      </div>

      {/* Right: Actions (Theme Toggle, Favorite, Share) */}
      <div className="flex items-center gap-2">
        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-slate-600" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* Save / Favorite */}
        <button
          onClick={toggleFavorite}
          className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center justify-center active:scale-95 transition ${
            isFavorite
              ? 'text-rose-500 fill-rose-500 border-rose-200 dark:border-rose-900'
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
          aria-label="Save gym"
          title={isFavorite ? 'Saved to favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition"
          aria-label="Share gym"
          title="Share gym"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

