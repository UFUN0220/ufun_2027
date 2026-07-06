'use client'

import { Clock, GitBranch, Map, Star } from 'lucide-react'
import useSWR from 'swr'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { SITE_METADATA } from '~/data/site-metadata'
import type { GithubRepository } from '~/types/data'
import { fetcher } from '~/utils/misc'

export function FooterMeta() {
  const siteRepo = SITE_METADATA.siteRepo.replace('https://github.com/', '')
  const repoName = siteRepo.split('/')[1]
  const { data: repo } = useSWR<GithubRepository>(`/api/github?repo=${siteRepo}`, fetcher)

  return (
    <div className="space-y-2 py-1.5 text-gray-800 dark:text-gray-200">
      <div className="flex items-center gap-1 font-medium">
        <GitBranch className="h-5 w-5" />
        <Link href={SITE_METADATA.siteRepo} className="ml-1">
          {repoName}
        </Link>
      </div>
    </div>
  )
}
