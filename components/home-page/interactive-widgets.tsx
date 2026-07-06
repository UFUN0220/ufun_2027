'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Menu, Music2, RefreshCw, Search, X } from 'lucide-react'
import { useKBar } from 'kbar'
import { Fragment, useEffect, useState } from 'react'
import { Link } from '~/components/ui/link'

type RandomPost = {
  title: string
  slug: string
  summary?: string
}

export function MobileSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
      >
        <Menu size={18} />
        Menu
      </button>
      <Transition show={open} as={Fragment}>
        <Dialog onClose={setOpen} className="relative z-80 lg:hidden">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 flex">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-out duration-250"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="h-full w-full max-w-sm overflow-y-auto bg-[#FAFAFA] p-4 shadow-xl dark:bg-[#0B0B0C]">
                  <div className="mb-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-2xl border border-neutral-200 bg-white p-2 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
                      aria-label="Close menu"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  {children}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export function DailyGreeting({ variant = 'compact' }: { variant?: 'compact' | 'calendar' }) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const current = now || new Date()
  const hour = current.getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'
  const weekday = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(current)
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(current)
  const day = current.getDate()
  const year = current.getFullYear()

  if (variant === 'calendar') {
    const firstDay = new Date(year, current.getMonth(), 1).getDay()
    const daysInMonth = new Date(year, current.getMonth() + 1, 0).getDate()
    const cells = [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ]

    return (
      <div>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">{month}</span>
          <span className="text-neutral-500">{year}</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-400">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((item, index) => (
            <span key={`${item}-${index}`} className="py-1">
              {item}
            </span>
          ))}
          {cells.map((cell, index) => (
            <span
              key={`${cell || 'blank'}-${index}`}
              className={`grid aspect-square place-items-center rounded-lg ${
                cell === day
                  ? 'bg-blue-600 font-semibold text-white'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              {cell}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm font-semibold text-neutral-950 dark:text-white">{greeting}</p>
      <p className="mt-1 text-xs leading-5 text-neutral-500">
        {weekday}, {month} {day}, {year}
      </p>
    </div>
  )
}

export function SearchCommandButton() {
  const { query } = useKBar()

  return (
    <button
      type="button"
      onClick={() => query.toggle()}
      className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-left text-sm text-neutral-500 transition hover:border-blue-200 hover:bg-blue-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10"
    >
      <span className="flex items-center gap-2">
        <Search size={17} />
        Search articles
      </span>
      <kbd className="rounded-lg border border-neutral-200 bg-white px-2 py-1 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950">
        ⌘ K
      </kbd>
    </button>
  )
}

export function RandomArticle({ posts }: { posts: RandomPost[] }) {
  const [index, setIndex] = useState(0)
  const post = posts[index % Math.max(posts.length, 1)]

  function refresh() {
    if (posts.length < 2) return
    setIndex(
      (current) => (current + 1 + Math.floor(Math.random() * (posts.length - 1))) % posts.length
    )
  }

  if (!post) return null

  return (
    <section className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-sm shadow-neutral-200/70 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-black/20">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-neutral-950 dark:text-white">Random Article</h2>
        <button
          type="button"
          onClick={refresh}
          aria-label="Refresh random article"
          className="rounded-xl p-2 text-neutral-500 transition hover:scale-105 hover:bg-neutral-100 hover:text-blue-600 dark:hover:bg-neutral-900"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="mt-4 block rounded-2xl bg-neutral-50 p-4 transition hover:bg-blue-50 dark:bg-neutral-900 dark:hover:bg-blue-500/10"
          >
            <p className="line-clamp-2 text-sm font-semibold text-neutral-900 dark:text-white">
              {post.title}
            </p>
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-neutral-500">
              {post.summary || 'Open this note from the personal wiki.'}
            </p>
          </Link>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

export function MusicWidget() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <section className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-sm shadow-neutral-200/70 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-black/20">
      <button
        type="button"
        onClick={() => setCollapsed((value) => !value)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2 font-semibold text-neutral-950 dark:text-white">
          <Music2 size={18} className="text-emerald-500" />
          Music
        </span>
        <span className="text-xs text-neutral-500">{collapsed ? 'Show' : 'Hide'}</span>
      </button>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-2xl bg-neutral-50 p-4 dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <Music2 size={22} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                    Focus Mode
                  </p>
                  <p className="truncate text-xs text-neutral-500">Lo-fi coding playlist</p>
                </div>
              </div>
              <div className="mt-4 flex h-8 items-end gap-1">
                <span className="h-3 w-1 animate-music-bar-1 rounded-full bg-emerald-500" />
                <span className="h-5 w-1 animate-music-bar-2 rounded-full bg-emerald-500" />
                <span className="h-4 w-1 animate-music-bar-3 rounded-full bg-emerald-500" />
                <span className="h-6 w-1 animate-music-bar-4 rounded-full bg-emerald-500" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function CountUpNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString())
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const unsubscribe = rounded.on('change', setDisplay)
    const controls = animate(motionValue, value, { duration: 1.1, ease: 'easeOut' })

    return () => {
      unsubscribe()
      controls.stop()
    }
  }, [motionValue, rounded, value])

  return <span>{display}</span>
}
