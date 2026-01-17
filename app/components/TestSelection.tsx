'use client'

import { BookOpen, Brain, Clock, FileCheck, ChevronLeft, Lock, Play } from 'lucide-react'

interface TestSelectionProps {
  isGuest: boolean
  onStartTest: () => void
  onBack: () => void
}

export default function TestSelection({ isGuest, onStartTest, onBack }: TestSelectionProps) {
  const testTypes = [
    {
      id: 'chapter',
      title: 'Chapter-wise Tests',
      description: 'Practice specific chapters',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      locked: false,
      tests: 45
    },
    {
      id: 'topic',
      title: 'Topic-wise Tests',
      description: 'Focus on individual topics',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      locked: isGuest,
      tests: 120
    },
    {
      id: 'pyq',
      title: 'Previous Year Questions',
      description: 'NEET 2018-2024 papers',
      icon: FileCheck,
      color: 'from-green-500 to-emerald-500',
      locked: false,
      tests: 7
    },
    {
      id: 'mock',
      title: 'Full Mock Tests',
      description: 'Complete NEET simulations',
      icon: Clock,
      color: 'from-orange-500 to-red-500',
      locked: isGuest,
      tests: 15
    },
  ]

  const subjects = [
    { name: 'Physics', chapters: 15, color: 'bg-blue-500' },
    { name: 'Chemistry', chapters: 18, color: 'bg-purple-500' },
    { name: 'Biology', chapters: 22, color: 'bg-green-500' },
  ]

  return (
    <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Select Test Type</h1>
      </div>

      {/* Test Types */}
      <div className="grid grid-cols-2 gap-4">
        {testTypes.map((type) => {
          const Icon = type.icon
          return (
            <button
              key={type.id}
              onClick={type.locked ? undefined : onStartTest}
              className={`relative bg-gradient-to-br ${type.color} rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-all ${
                type.locked ? 'opacity-60' : 'hover:scale-105'
              }`}
            >
              {type.locked && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4" />
                </div>
              )}
              <Icon className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-sm mb-1">{type.title}</h3>
              <p className="text-xs opacity-90 mb-2">{type.description}</p>
              <div className="text-xs opacity-75">{type.tests} tests</div>
            </button>
          )
        })}
      </div>

      {/* Subject Selection */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Browse by Subject</h2>
        <div className="space-y-3">
          {subjects.map((subject, index) => (
            <button
              key={index}
              onClick={onStartTest}
              className="w-full bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className={`${subject.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{subject.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{subject.chapters} chapters</p>
                </div>
              </div>
              <Play className="w-5 h-5 text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 rounded-xl p-4 border border-indigo-100 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Your Progress</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {isGuest ? '—' : '187'}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Total Qs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {isGuest ? '—' : '75%'}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {isGuest ? '—' : '24'}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Tests Done</div>
          </div>
        </div>
      </div>
    </div>
  )
}
