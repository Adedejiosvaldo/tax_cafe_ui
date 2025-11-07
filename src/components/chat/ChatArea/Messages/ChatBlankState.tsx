'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store'
import Image from 'next/image'

const suggestions = [
  { id: 'payroll-rules', label: 'How much tax for 800k income?' },
  { id: 'explain-changes', label: 'Explain the new tax bill' },
  { id: 'estimate-impact', label: 'Estimate financial impact' },
  { id: 'filing-deadlines', label: 'Penalty for late filing' },
  { id: 'donation-guidance', label: 'Airdrop and Crypto' },
  { id: 'compliance-checklist', label: 'How to register for TIN' },
  { id: 'ask-a-scenario', label: 'Who do you file tax to?' }
]

interface SuggestionButtonProps {
  text: string
  onClick: () => void
}

const SuggestionButton = ({ text, onClick }: SuggestionButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="border-primary/15 bg-accent text-muted hover:bg-primary/10 font-dmmono rounded-xl border px-4 py-2 text-sm transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {text}
    </motion.button>
  )
}

const ChatBlankState = () => {
  const { chatInputRef } = useStore()

  const handleSuggestionClick = (suggestionText: string) => {
    if (chatInputRef.current) {
      // Set the value using the native setter to bypass React's value cache
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set
      nativeInputValueSetter?.call(chatInputRef.current, suggestionText)

      // Dispatch a React synthetic event
      const event = new Event('input', { bubbles: true })
      chatInputRef.current.dispatchEvent(event)

      // Focus the input and move cursor to end
      chatInputRef.current.focus()
      chatInputRef.current.setSelectionRange(
        suggestionText.length,
        suggestionText.length
      )
    }
  }

  return (
    <section
      className="font-geist flex flex-col items-center text-center"
      aria-label="Welcome message"
    >
      <div className="flex max-w-3xl flex-col gap-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-[600] tracking-tight"
        >
          <div className="flex items-center justify-center gap-x-2 whitespace-nowrap font-medium">
            <Image
              src="/tclogo.png"
              alt="Tax Cafe Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="flex items-center justify-center gap-x-2 whitespace-nowrap font-medium">
            <span className="flex items-center font-[600]">
              Tax Cafe <br />
            </span>
          </div>
          <p className="mt-3 text-base font-[300]">
            AI tax bot powered by the <br /> 🇳🇬 Nigeria Tax Administration Act,
            2025.
          </p>
        </motion.h1>

        {/* Sample Questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {suggestions.map((suggestion) => (
            <SuggestionButton
              key={suggestion.id}
              text={suggestion.label}
              onClick={() => handleSuggestionClick(suggestion.label)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ChatBlankState
