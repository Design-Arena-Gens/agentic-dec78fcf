'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Flag, Clock, X, Check } from 'lucide-react'

interface TestInterfaceProps {
  onComplete: () => void
  onBack: () => void
}

export default function TestInterface({ onComplete, onBack }: TestInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [flagged, setFlagged] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const questions = [
    {
      id: 1,
      question: 'A particle moves with uniform velocity. Which of the following statements is correct?',
      options: [
        'The particle must be at rest',
        'The particle moves along a curved path',
        'The particle has zero acceleration',
        'The particle has constant speed only'
      ],
      hasImage: false
    },
    {
      id: 2,
      question: 'What is the SI unit of electric charge?',
      options: ['Ampere', 'Coulomb', 'Volt', 'Ohm'],
      hasImage: false
    },
    {
      id: 3,
      question: 'In a double displacement reaction, which of the following occurs?',
      options: [
        'Two elements exchange their ions',
        'One element is displaced by another',
        'Decomposition of a compound',
        'Combination of two elements'
      ],
      hasImage: true
    },
  ]

  const totalQuestions = 30
  const currentQ = questions[currentQuestion % questions.length]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
    }
  }

  const toggleFlag = () => {
    const newFlagged = new Set(flagged)
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion)
    } else {
      newFlagged.add(currentQuestion)
    }
    setFlagged(newFlagged)
  }

  if (showExitConfirm) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-xl">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Exit Test?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Your progress will be lost if you exit now.</p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowExitConfirm(false)}
              className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onBack}
              className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Fixed Header */}
      <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>

            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <span className="font-bold text-slate-900 dark:text-white">{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={toggleFlag}
              className={`p-2 rounded-lg transition-colors ${
                flagged.has(currentQuestion)
                  ? 'bg-amber-100 dark:bg-amber-900/30'
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}
            >
              <Flag className={`w-5 h-5 ${
                flagged.has(currentQuestion)
                  ? 'text-amber-600 dark:text-amber-400 fill-current'
                  : 'text-slate-700 dark:text-slate-300'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Physics • Chapter 5
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-3">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white leading-relaxed mb-4">
            {currentQ.question}
          </h2>

          {currentQ.hasImage && (
            <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-8 mb-4 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Diagram/Image</span>
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedAnswer === index
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-500'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedAnswer === index
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {selectedAnswer === index && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-slate-900 dark:text-white font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg p-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            <span>{currentQuestion === totalQuestions - 1 ? 'Submit' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
