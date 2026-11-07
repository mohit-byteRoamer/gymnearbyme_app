import React from 'react'

export function Chip({
  children,
  color = 'slate', // 'green' | 'blue' | 'yellow' | 'red' | 'slate'
  size = 'sm', // 'xs' | 'sm' | 'md'
  icon: Icon,
  className = '',
  onClick,
  ...props
}) {
  const colorStyles = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    blue: 'bg-blue-50 text-brand-700 border-blue-200/80',
    yellow: 'bg-amber-50 text-amber-800 border-amber-200/80',
    red: 'bg-rose-50 text-rose-700 border-rose-200/80',
    slate: 'bg-slate-100 text-slate-700 border-slate-200/80',
  }

  const sizes = {
    xs: 'text-[11px] px-2 py-0.5 font-medium gap-1',
    sm: 'text-xs px-2.5 py-1 font-medium gap-1.5',
    md: 'text-sm px-3 py-1.5 font-medium gap-2',
  }

  const isClickable = typeof onClick === 'function'

  return (
    <span
      onClick={onClick}
      className={`
        inline-flex items-center rounded-full border border-solid
        ${colorStyles[color] || colorStyles.slate}
        ${sizes[size] || sizes.sm}
        ${isClickable ? 'cursor-pointer hover:opacity-90 active:scale-95 transition-all' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  )
}

