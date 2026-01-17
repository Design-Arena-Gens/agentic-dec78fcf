'use client'

import { BookOpen, TrendingUp, Target, Clock, Award, ChevronRight, Lock } from 'lucide-react'

interface DashboardProps {
  isGuest: boolean
  onStartTest: () => void
}

export default function Dashboard({ isGuest, onStartTest }: DashboardProps) {
  const stats = [
    { label: 'Tests Taken', value: isGuest ? '—' : '24', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Avg. Score', value: isGuest ? '—' : '78%', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Study Streak', value: isGuest ? '—' : '12 days', icon: Target, color: 'bg-purple-500' },
    { label: 'Time Spent', value: isGuest ? '—' : '48h', icon: Clock, color: 'bg-orange-500' },
  ]

  const recommendations = [
    { title: 'Physics - Motion', difficulty: 'Medium', questions: 30, locked: isGuest },
    { title: 'Chemistry - Organic', difficulty: 'Hard', questions: 25, locked: isGuest },
    { title: 'Biology - Genetics', difficulty: 'Easy', questions: 20, locked: false },
  ]

  const recentActivity = [
    { title: 'NEET 2023 Mock Test', score: 85, date: '2 days ago' },
    { title: 'Physics Chapter 5', score: 72, date: '4 days ago' },
    { title: 'Biology Full Test', score: 90, date: '1 week ago' },
  ]

  return (
    <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">
          {isGuest ? 'Welcome, Guest!' : 'Welcome back, Student!'}
        </h1>
        <p className="text-indigo-100 mb-4">
          {isGuest
            ? 'Sign up to unlock full analytics and custom tests'
            : 'Ready to continue your NEET preparation?'}
        </p>
        <button
          onClick={onStartTest}
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-md"
        >
          Start Practice
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {isGuest && stat.value === '—' && (
                  <Lock className="w-3 h-3 text-slate-400" />
                )}
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Recommended Tests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recommended for You</h2>
          <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="space-y-3">
          {recommendations.map((test, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{test.title}</h3>
                  {test.locked && (
                    <Lock className="w-3 h-3 text-amber-500" />
                  )}
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-400">
                  <span className={`px-2 py-1 rounded-full ${
                    test.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    test.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {test.difficulty}
                  </span>
                  <span>{test.questions} Qs</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {!isGuest && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{activity.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      activity.score >= 80 ? 'text-green-600 dark:text-green-400' :
                      activity.score >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {activity.score}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
