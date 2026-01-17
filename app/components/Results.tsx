'use client'

import { Award, TrendingUp, TrendingDown, Target, Clock, CheckCircle, XCircle, Home, Lock } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface ResultsProps {
  isGuest: boolean
  onReturnHome: () => void
}

export default function Results({ isGuest, onReturnHome }: ResultsProps) {
  const score = 75
  const totalQuestions = 30
  const correct = 23
  const incorrect = 5
  const unattempted = 2
  const timeSpent = '42:15'

  const pieData = [
    { name: 'Correct', value: correct, color: '#10B981' },
    { name: 'Incorrect', value: incorrect, color: '#EF4444' },
    { name: 'Unattempted', value: unattempted, color: '#94A3B8' },
  ]

  const topicData = [
    { topic: 'Motion', accuracy: 85, total: 8 },
    { topic: 'Forces', accuracy: 70, total: 7 },
    { topic: 'Energy', accuracy: 60, total: 6 },
    { topic: 'Waves', accuracy: 80, total: 9 },
  ]

  return (
    <div className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
      {/* Score Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6" />
            <span className="font-semibold">Test Complete!</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{timeSpent}</span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold mb-2">{score}%</div>
          <p className="text-indigo-100">Your Score</p>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>{correct} Correct</span>
            </div>
            <div className="flex items-center space-x-1">
              <XCircle className="w-4 h-4" />
              <span>{incorrect} Wrong</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {((correct / totalQuestions) * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Accuracy</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Top 25%</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {isGuest ? '—' : '850'}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Your Rank</div>
          {isGuest && <Lock className="absolute top-2 right-2 w-3 h-3 text-slate-400" />}
        </div>
      </div>

      {/* Performance Distribution */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Performance Distribution</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center space-x-6 mt-4">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Topic-wise Analysis */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Topic-wise Analysis</h2>
          {isGuest && <Lock className="w-4 h-4 text-amber-500" />}
        </div>

        {isGuest ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Sign up to unlock detailed analytics</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topicData.map((topic, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{topic.topic}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">({topic.total} Qs)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 dark:text-white">{topic.accuracy}%</span>
                    {topic.accuracy >= 75 ? (
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      topic.accuracy >= 75 ? 'bg-green-500' :
                      topic.accuracy >= 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${topic.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weak Topics */}
      {!isGuest && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start space-x-3">
            <div className="bg-amber-500 p-2 rounded-lg">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Focus Areas</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Energy concepts need more practice. Try 5-10 more questions on this topic.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3 pb-4">
        <button
          onClick={onReturnHome}
          className="flex-1 flex items-center justify-center space-x-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-4 rounded-xl font-semibold border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button className="flex-1 bg-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          Review Answers
        </button>
      </div>
    </div>
  )
}
