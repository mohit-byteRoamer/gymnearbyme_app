import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGymDetailStore } from '../store/gymDetailStore.ts'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'timings', label: 'Timings' },
  { id: 'location', label: 'Location' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' },
]

export function GymSectionNav() {
  const { activeSection, setActiveSection } = useGymDetailStore()

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(`${SECTIONS[i].id}-section`)
        if (section) {
          const top = section.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  const scrollTo = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(`${id}-section`)
    if (el) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-2">
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar max-w-container mx-auto">
        {SECTIONS.map((tab) => {
          const isActive = activeSection === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`relative px-3.5 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors rounded-xl ${
                isActive
                  ? 'text-brand dark:text-brand-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <span>{tab.label}</span>

              {/* Animated Underline */}
              {isActive && (
                <motion.div
                  layoutId="activeSectionUnderline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

