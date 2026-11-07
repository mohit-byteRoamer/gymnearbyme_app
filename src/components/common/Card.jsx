import React from 'react'

export function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
  padding = 'p-4 sm:p-5',
  ...props
}) {
  const isClickable = typeof onClick === 'function' || hoverable

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-card border border-slate-200/80 shadow-card
        ${padding}
        ${isClickable ? 'cursor-pointer hover:border-slate-300 hover:shadow-md transition-all duration-200 active:scale-[0.99]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

