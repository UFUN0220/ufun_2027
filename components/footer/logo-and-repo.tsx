'use client'

import { CheckCheck, Circle, X } from 'lucide-react'
import useSWR from 'swr'
import { Logo } from '~/components/header/logo'
import { SITE_METADATA } from '~/data/site-metadata'
import type { CommitState, GithubRepository } from '~/types/data'
import { fetcher } from '~/utils/misc'

export function LogoAndRepo() {
  const siteRepo = SITE_METADATA.siteRepo.replace('https://github.com/', '')
  const { data: repo } = useSWR<GithubRepository>(`/api/github?repo=${siteRepo}`, fetcher)

  return (
    <div className="flex items-center">
      <Logo className="mr-4" />
      <div className="flex flex-col items-center gap-2 font-sans text-xl font-bold">
        {SITE_METADATA.headerTitle}
      </div>
    </div>
  )
}
