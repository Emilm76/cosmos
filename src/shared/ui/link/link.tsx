'use client'
import Link from 'next/link'
import { ComponentProps, MouseEvent } from 'react'
import { useSectionLoaderStore } from '@/store'
import { usePathname } from 'next/navigation'

export function MyLink({
  href,
  isPreviousUrl = false,
  children,
  ...props
}: { isPreviousUrl?: boolean } & ComponentProps<typeof Link>) {
  const setLoadingUrl = useSectionLoaderStore((s) => s.set)
  const pathname = usePathname()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (href !== pathname) {
      setLoadingUrl(href, isPreviousUrl, true)
    }
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
