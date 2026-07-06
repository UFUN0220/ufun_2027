import { GitBranch, Mail } from 'lucide-react'
import { SITE_METADATA } from '~/data/site-metadata'

export function Social() {
  return (
    <div className="flex items-center space-x-4">
      <span className="font-Serif font-bold text-gray-700 dark:text-gray-200">UFUN:)</span>
      <a className="text-gray-700 dark:text-gray-200" href={`mailto:${SITE_METADATA.email}`}>
        <Mail strokeWidth={1.5} size={20} />
      </a>
      <a className="text-gray-700 dark:text-gray-200" href={SITE_METADATA.github}>
        <GitBranch strokeWidth={1.5} size={20} />
      </a>
    </div>
  )
}
