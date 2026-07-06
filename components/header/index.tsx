'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { KbarSearchTrigger } from '~/components/search/kbar-trigger'
import { Container } from '~/components/ui/container'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { PinkHover } from '~/components/ui/PinkHover'
import { Link } from '~/components/ui/link'
import { HEADER_NAV_LINKS } from '~/data/navigation'
import { SITE_METADATA } from '~/data/site-metadata'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { MoreLinks } from './more-links'
import { ThemeSwitcher } from './theme-switcher'

let logged = false
function logASCIItext() {
  if (logged) return
  console.info(
    " ___                  __                              __              __                    \r\n/\\_ \\                /\\ \\                            /\\ \\            /\\ \\                   \r\n\\//\\ \\      __    ___\\ \\ \\___   __  __  __  __    ___\\ \\ \\___        \\_\\ \\     __   __  __  \r\n  \\ \\ \\   /'__`\\ / __`\\ \\  _ `\\/\\ \\/\\ \\/\\ \\/\\ \\ /' _ `\\ \\  _ `\\      /'_` \\  /'__`\\/\\ \\/\\ \\ \r\n   \\_\\ \\_/\\  __//\\ \\L\\ \\ \\ \\ \\ \\ \\ \\_\\ \\ \\ \\_\\ \\/\\ \\/\\ \\ \\ \\ \\ \\  __/\\ \\L\\ \\/\\  __/\\ \\ \\_/ |\r\n   /\\____\\ \\____\\ \\____/\\ \\_\\ \\_\\ \\____/\\/`____ \\ \\_\\ \\_\\ \\_\\ \\_\\/\\_\\ \\___,_\\ \\____\\\\ \\___/ \r\n   \\/____/\\/____/\\/___/  \\/_/\\/_/\\/___/  `/___/> \\/_/\\/_/\\/_/\\/_/\\/_/\\/__,_ /\\/____/ \\/__/  \r\n                                            /\\___/                                          \r\n                                            \\/__/                                           "
  )
  console.log('🧑‍💻 View source:', SITE_METADATA.siteRepo)
  // console.log(`🙌 Let's connect:`, SITE_METADATA.x)
  logged = true
}

export function Header() {
  const pathname = usePathname()
  useEffect(logASCIItext, [])

  return (
    <Container
      as="header"
      className={clsx(
        'bg-white/50 px-1 py-1 backdrop-blur dark:bg-dark/50',
        'shadow-sm saturate-100 md:rounded-full',
        'mx-auto max-w-lg', //导航栏宽度
        SITE_METADATA.stickyNav && 'sticky top-2 z-50 lg:top-8'
      )}
    >
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="gap-3 sm:flex">
            {HEADER_NAV_LINKS.map(({ title, href }) => {
              const isActive = pathname.startsWith(href)
              return (
                <Link key={title} href={href} className="px-1 py-1 font-medium">
                  {/* <GrowingUnderline */}
                  <PinkHover
                    className={clsx(isActive && 'bg-[length:100%_50%]')}
                    data-umami-event={`nav-${href.replace('/', '')}`}
                  >
                    {title}
                  </PinkHover>
                  {/* </GrowingUnderline> */}
                </Link>
              )
            })}
            <MoreLinks />
          </div>
          <div
            data-orientation="vertical"
            role="separator"
            className="hidden h-4 w-px shrink-0 bg-gray-200 md:block dark:bg-gray-600"
          />
          <div className="flex items-center gap-3">
            {/* <ThemeSwitcher /> */}
            <KbarSearchTrigger />
            <MobileNav />
          </div>
        </div>
      </div>
    </Container>
  )
}
