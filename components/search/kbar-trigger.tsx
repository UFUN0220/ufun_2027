import { useKBar } from 'kbar'
import { Search } from 'lucide-react'

export function KbarSearchTrigger() {
  const { query } = useKBar()

  return (
    <button
      aria-label="Search"
      className="rounded p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700"
      data-umami-event="search-the-site"
      onClick={() => query.toggle()}
    >
      <Search size={20} strokeWidth={1.5} />
    </button>
  )
}
