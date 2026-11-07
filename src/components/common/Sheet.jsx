import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export function Sheet({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  maxWidth = 'max-w-lg',
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Sheet Content */}
      <div
        className={`
          relative w-full ${maxWidth} bg-white rounded-t-2xl sm:rounded-2xl shadow-xl z-10 
          max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col transition-all duration-300
          animate-slide-up pb-safe
          ${className}
        `}
      >
        {/* Handle for mobile */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

