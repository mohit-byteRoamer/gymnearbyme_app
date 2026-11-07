import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Dumbbell,
  Home,
  CalendarCheck,
  Receipt,
  User,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { usePlan } from '../../context/PlanContext.jsx'

export function Navbar() {
  const { user } = useAuth()
  const { activePlan } = usePlan()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const hasActivePlan = activePlan && activePlan.status === 'ACTIVE'
  const membershipTitle = hasActivePlan
    ? `${activePlan.planName} Member`
    : 'Member'

  const navItems = [
    { label: 'Home', path: '/home', icon: Home },
    {
      label: 'My plan',
      path: '/my-plan',
      icon: CalendarCheck,
      badge: hasActivePlan,
    },
    { label: 'Transactions', path: '/transactions', icon: Receipt },
    { label: 'Profile', path: '/profile', icon: User },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* 1. Branding Section */}
        <NavLink
          to="/home"
          className="flex items-center gap-3 group select-none shrink-0"
          aria-label="GymApp Home"
        >
          {/* Logo Icon Container */}
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white shadow-xs group-hover:bg-brand-700 group-hover:scale-105 transition-all duration-200">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>

          {/* Brand Name & Location Subtitle */}
          <div className="flex flex-col justify-center">
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand transition-colors block leading-tight">
              GymApp
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold tracking-wider uppercase block -mt-0.5">
              Ludhiana, Punjab
            </span>
          </div>
        </NavLink>

        {/* 2. Desktop Navigation Menu (lg: 1024px and up) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100/70 border border-slate-200/60 rounded-2xl">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-200 select-none
                  ${
                    isActive
                      ? 'bg-brand-50 text-brand font-semibold shadow-2xs border border-brand-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="relative">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isActive
                            ? 'scale-110 stroke-[2.2] text-brand'
                            : 'stroke-[1.8] text-slate-500'
                        }`}
                      />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                      )}
                    </div>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* 3. Desktop User Profile Section */}
        <NavLink
          to="/profile"
          className="hidden lg:flex items-center gap-3 p-1.5 pr-3.5 rounded-2xl hover:bg-slate-100/70 border border-transparent hover:border-slate-200/70 transition-all duration-200 group select-none"
          title="Account & Profile"
        >
          {/* Circular Avatar */}
          <div className="relative shrink-0">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'User'}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-brand/40 shadow-xs transition-all"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-brand-50 text-brand font-bold text-sm flex items-center justify-center border border-brand-100">
                {user?.name?.[0] || 'U'}
              </div>
            )}
            {hasActivePlan && (
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                title="Active Plan"
              />
            )}
          </div>

          {/* User Name and Membership Hierarchy */}
          <div className="text-left flex flex-col justify-center">
            <span className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors block leading-tight truncate max-w-[140px]">
              {user?.name || 'Amritpal Singh'}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-slate-500 block">
                {membershipTitle}
              </span>
            </div>
          </div>
        </NavLink>

        {/* 4. Mobile & Tablet Menu Toggle (< 1024px) */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick Avatar link */}
          <NavLink
            to="/profile"
            className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-slate-100 hover:ring-brand transition"
            title="Profile"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-brand-50 text-brand font-bold text-xs flex items-center justify-center">
                {user?.name?.[0] || 'U'}
              </div>
            )}
          </NavLink>

          {/* Hamburger / Close Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center active:scale-95 transition"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-900" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* 5. Mobile & Tablet Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 py-4 space-y-4">
            {/* User Profile Card Header */}
            <NavLink
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition active:scale-[0.99]"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand/20 shadow-xs"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-brand-50 text-brand font-bold text-base flex items-center justify-center border border-brand-100">
                  {user?.name?.[0] || 'U'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900 truncate">
                    {user?.name || 'Amritpal Singh'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {membershipTitle}
                  </span>
                </div>
                <span className="text-xs text-slate-500 truncate block mt-0.5">
                  {user?.email || 'amrit.singh@gmail.com'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </NavLink>

            {/* Navigation Links with 44px+ touch targets */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${
                        isActive
                          ? 'bg-brand-50 text-brand font-semibold border border-brand-100'
                          : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
