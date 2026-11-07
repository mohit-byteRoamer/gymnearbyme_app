import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, CalendarCheck, Receipt, User } from 'lucide-react'
import { usePlan } from '../../context/PlanContext.jsx'

export function BottomTabs() {
  const { activePlan } = usePlan()

  const tabs = [
    { label: 'Home', path: '/home', icon: Home },
    {
      label: 'My plan',
      path: '/my-plan',
      icon: CalendarCheck,
      badge: activePlan && activePlan.status === 'ACTIVE',
    },
    { label: 'Transactions', path: '/transactions', icon: Receipt },
    { label: 'Profile', path: '/profile', icon: User },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg pb-safe">
      <div className="grid grid-cols-4 h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) => `
                relative flex flex-col items-center justify-center py-1 transition-all select-none
                ${isActive ? 'text-brand' : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 transition-transform duration-150 ${
                        isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                      }`}
                    />
                    {tab.badge && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>
                  <span
                    className={`text-[11px] mt-1 transition-all ${
                      isActive ? 'font-bold text-brand' : 'font-medium'
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

