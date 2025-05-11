'use client'

import { useTheme } from '@/hooks/useTheme'

export default function Header() {
  const { theme, toggle } = useTheme()

  return (
    <header className="px-4 py-3 flex justify-between items-center bg-background text-black transition-colors duration-300 shadow">
      <h1 className="text-xl font-bold">🧳 Travel Log</h1>
      <button
        onClick={toggle}
        className="px-3 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
      >
        {theme === 'dark' ? '🌙 ' : '☀️ '}
      </button>
    </header>
  )
}
