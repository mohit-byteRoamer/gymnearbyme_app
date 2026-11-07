import React from 'react'
import { Settings2, X, RefreshCw, Smartphone } from 'lucide-react'
import { useDevState } from '../../context/DevStateContext.jsx'
import { useNavigate } from 'react-router-dom'

export function DevStateSwitcher() {
  const {
    isOfflineForced,
    setIsOfflineForced,
    forceEmptyGyms,
    setForceEmptyGyms,
    forceLoading,
    setForceLoading,
    forceLoginError,
    setForceLoginError,
    forceGymNotJoining,
    setForceGymNotJoining,
    activePlanOverride,
    setActivePlanOverride,
    isDevSwitcherOpen,
    setIsDevSwitcherOpen,
    resetAllOverrides,
  } = useDevState()

  const navigate = useNavigate()

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50">
      {/* Floating Toggle Button */}
      {!isDevSwitcherOpen ? (
        <button
          onClick={() => setIsDevSwitcherOpen(true)}
          className="bg-slate-900 text-white p-2.5 rounded-full shadow-lg border border-slate-700 hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold px-3"
          title="Dev State Preview Switcher"
        >
          <Settings2 className="w-4 h-4 text-brand-500" />
          <span>Dev States</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-72 max-h-[80vh] overflow-y-auto no-scrollbar text-slate-800 animate-slide-up text-xs">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <Settings2 className="w-4 h-4 text-brand-600" />
              <span>Dev State Switcher</span>
            </div>
            <button
              onClick={() => setIsDevSwitcherOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Reset */}
            <button
              onClick={resetAllOverrides}
              className="w-full py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center gap-1.5 font-medium transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Overrides</span>
            </button>

            {/* General Toggles */}
            <div>
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] mb-1.5">
                Simulated States
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                  <span>Offline Banner</span>
                  <input
                    type="checkbox"
                    checked={isOfflineForced}
                    onChange={(e) => setIsOfflineForced(e.target.checked)}
                    className="accent-brand"
                  />
                </label>
                <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                  <span>Empty Gyms</span>
                  <input
                    type="checkbox"
                    checked={forceEmptyGyms}
                    onChange={(e) => setForceEmptyGyms(e.target.checked)}
                    className="accent-brand"
                  />
                </label>
                <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                  <span>Force Skeleton Loading</span>
                  <input
                    type="checkbox"
                    checked={forceLoading}
                    onChange={(e) => setForceLoading(e.target.checked)}
                    className="accent-brand"
                  />
                </label>
                <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                  <span>Login Error Simulation</span>
                  <input
                    type="checkbox"
                    checked={forceLoginError}
                    onChange={(e) => setForceLoginError(e.target.checked)}
                    className="accent-brand"
                  />
                </label>
                <label className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                  <span>Gym Not Accepting Online</span>
                  <input
                    type="checkbox"
                    checked={forceGymNotJoining}
                    onChange={(e) => setForceGymNotJoining(e.target.checked)}
                    className="accent-brand"
                  />
                </label>
              </div>
            </div>

            {/* Plan States Preview */}
            <div>
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] mb-1.5">
                Plan States (My Plan)
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'Active (12d)', val: 'ACTIVE' },
                  { label: 'Expiring (5d)', val: 'EXPIRING' },
                  { label: 'Not Activated', val: 'PAID_NOT_ACTIVATED' },
                  { label: 'Expired', val: 'EXPIRED' },
                  { label: 'Empty (None)', val: 'EMPTY' },
                  { label: 'Clear Override', val: null },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActivePlanOverride(item.val)
                      navigate('/my-plan')
                    }}
                    className={`py-1 px-2 rounded border text-[11px] font-medium text-left truncate transition ${
                      activePlanOverride === item.val
                        ? 'border-brand bg-brand-50 text-brand-700 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] mb-1.5">
                Direct Screen Jump
              </div>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <button
                  onClick={() => navigate('/home')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                >
                  • Home
                </button>
                <button
                  onClick={() => navigate('/gym/iron-forge-fitness')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                >
                  • Gym Detail
                </button>
                <button
                  onClick={() => navigate('/gym/legacy-fitness-civil-lines')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                  title="Gym variant not accepting online joining"
                >
                  • Not Joining Gym
                </button>
                <button
                  onClick={() => navigate('/checkout?gym=iron-forge-fitness&plan=plan-iron-monthly')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                >
                  • Checkout
                </button>
                <button
                  onClick={() => navigate('/payment/confirming')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                >
                  • Confirming
                </button>
                <button
                  onClick={() => navigate('/payment/success')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                >
                  • Payment Success
                </button>
                <button
                  onClick={() => navigate('/payment/failed')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                >
                  • Payment Failed
                </button>
                <button
                  onClick={() => navigate('/transactions')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                >
                  • Transactions
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                >
                  • Profile
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="p-1 text-left rounded hover:bg-slate-100 text-slate-700 truncate"
                >
                  • Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

