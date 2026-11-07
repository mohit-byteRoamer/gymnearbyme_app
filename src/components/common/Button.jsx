import React from 'react'

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  icon: Icon,
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer'

  const variants = {
    primary:
      'bg-brand hover:bg-brand-700 text-white shadow-sm focus-visible:ring-brand',
    secondary:
      'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm focus-visible:ring-slate-400',
    outline:
      'bg-transparent hover:bg-brand-50 text-brand border border-brand/30 focus-visible:ring-brand',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus-visible:ring-rose-500',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 focus-visible:ring-slate-400',
  }

  const sizes = {
    sm: 'text-xs h-9 px-3 gap-1.5',
    md: 'text-sm h-11 px-4 gap-2 min-h-[44px]',
    lg: 'text-base h-13 px-6 gap-2.5 min-h-[48px]',
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{typeof children === 'string' ? children : 'Loading...'}</span>
        </span>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
        </>
      )}
    </button>
  )
}

