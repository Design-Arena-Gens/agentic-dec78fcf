'use client'

import { User, Mail, Calendar, Award, BookOpen, TrendingUp, Settings, LogOut, LogIn, Bell, Shield, HelpCircle } from 'lucide-react'

interface ProfileProps {
  isGuest: boolean
  onToggleGuest: () => void
}

export default function Profile({ isGuest, onToggleGuest }: ProfileProps) {
  const userStats = [
    { label: 'Tests Taken', value: isGuest ? '3' : '24', icon: BookOpen },
    { label: 'Total Questions', value: isGuest ? '60' : '720', icon: Award },
    { label: 'Avg Score', value: isGuest ? '—' : '78%', icon: TrendingUp },
    { label: 'Study Days', value: isGuest ? '2' : '45', icon: Calendar },
  ]

  const settingsItems = [
    { icon: Bell, label: 'Notifications', action: 'toggle' },
    { icon: Shield, label: 'Privacy', action: 'navigate' },
    { icon: HelpCircle, label: 'Help & Support', action: 'navigate' },
    { icon: Settings, label: 'Preferences', action: 'navigate' },
  ]

  return (
    <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">
              {isGuest ? 'Guest User' : 'Priya Sharma'}
            </h1>
            <div className="flex items-center space-x-2 text-indigo-100">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{isGuest ? 'Not signed in' : 'priya.sharma@email.com'}</span>
            </div>
          </div>
        </div>

        {isGuest ? (
          <button
            onClick={onToggleGuest}
            className="w-full bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign Up / Login</span>
          </button>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-indigo-100 mb-1">Member Since</div>
              <div className="font-semibold">January 2024</div>
            </div>
            <Award className="w-8 h-8 text-yellow-300" />
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {userStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Achievement Badges */}
      {!isGuest && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Achievements</h2>
          <div className="grid grid-cols-3 gap-4">
            {['🔥', '🎯', '⭐', '🏆', '📚', '💪'].map((emoji, index) => (
              <div
                key={index}
                className="aspect-square bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-700 rounded-xl flex items-center justify-center text-3xl hover:scale-110 transition-transform"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Streak */}
      {!isGuest && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">Study Streak</div>
              <div className="text-4xl font-bold">12 Days 🔥</div>
              <div className="text-sm opacity-90 mt-1">Keep it going!</div>
            </div>
            <div className="text-6xl">📈</div>
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          Settings
        </h2>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {settingsItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span className="font-medium text-slate-900 dark:text-white">{item.label}</span>
                </div>
                <Settings className="w-4 h-4 text-slate-400" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Logout */}
      {!isGuest && (
        <button
          onClick={onToggleGuest}
          className="w-full flex items-center justify-center space-x-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-4 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      )}
    </div>
  )
}
