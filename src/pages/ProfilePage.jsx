import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  HelpCircle,
  FileText,
  Shield,
  RotateCcw,
  LogOut,
  Trash2,
  Edit2,
  Check,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export function ProfilePage() {
  const { user, signOut, updatePhone } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '+919876543210')

  const handleSavePhone = () => {
    updatePhone(phoneNumber)
    setIsEditingPhone(false)
    showToast('Phone number updated successfully', 'info')
  }

  const handleLogout = () => {
    signOut()
    navigate('/login')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your demo account and personal data?')) {
      signOut()
      localStorage.clear()
      showToast('Account data cleared successfully', 'info')
      navigate('/login')
    }
  }

  const navRows = [
    {
      label: 'Help and support',
      icon: HelpCircle,
      action: () => alert('Support: Email help@gymapp.in or call 1800-120-GYM (Ludhiana)'),
    },
    {
      label: 'Terms of service',
      icon: FileText,
      action: () => alert('GymApp Terms: Valid across participating gym clubs in Ludhiana.'),
    },
    {
      label: 'Privacy policy',
      icon: Shield,
      action: () => alert('Privacy Policy: We protect your phone and payment identifiers securely.'),
    },
    {
      label: 'Refund policy',
      icon: RotateCcw,
      action: () => alert('Refund Policy: 100% money back before QR voucher scanning at the gym.'),
    },
  ]

  return (
    <div className="max-w-form mx-auto px-4 py-4 sm:py-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        Profile
      </h1>

      {/* User Info Card */}
      <div className="bg-white rounded-card border border-slate-200/80 p-5 shadow-card text-center space-y-3">
        {/* Round Google Photo */}
        <div className="relative inline-block mx-auto">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-100 mx-auto shadow-xs"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-brand text-white text-2xl font-bold flex items-center justify-center mx-auto">
              {user?.name?.[0] || 'A'}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">{user?.name || 'Amritpal Singh'}</h2>
          <p className="text-xs text-slate-400">{user?.email || 'amrit.singh@gmail.com'}</p>
        </div>

        {/* Editable Phone */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2">
          {isEditingPhone ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-xs border border-brand rounded-lg px-2.5 py-1.5 focus:outline-none"
              />
              <button
                onClick={handleSavePhone}
                className="p-1.5 rounded-lg bg-brand text-white hover:bg-brand-700"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 font-medium">
                {user?.phone || '+919876543210'}
              </span>
              <button
                onClick={() => setIsEditingPhone(true)}
                className="text-slate-400 hover:text-brand p-1"
                title="Edit phone number"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Rows with Chevrons */}
      <div className="bg-white rounded-card border border-slate-200/80 shadow-card divide-y divide-slate-100 overflow-hidden">
        {navRows.map((row) => {
          const Icon = row.icon
          return (
            <button
              key={row.label}
              onClick={row.action}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-slate-500 group-hover:text-brand transition-colors" />
                <span className="text-sm font-medium text-slate-800">
                  {row.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          )
        })}
      </div>

      {/* Muted red text buttons: Log out & Delete my account */}
      <div className="pt-2 space-y-3 text-center">
        <button
          onClick={handleLogout}
          className="w-full py-2.5 px-4 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50/50 rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>

        <button
          onClick={handleDeleteAccount}
          className="text-xs text-slate-400 hover:text-rose-600 transition underline block mx-auto"
        >
          Delete my account
        </button>
      </div>

      {/* App Version at Bottom */}
      <div className="text-center pt-4 text-[11px] text-slate-400">
        GymApp v1.0.0 • Ludhiana, Punjab
      </div>
    </div>
  )
}

