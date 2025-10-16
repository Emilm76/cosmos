'use client'
import Link from 'next/link'
import { ComponentProps, MouseEvent } from 'react'
import { useSectionLoaderStore } from '@/store'

export function MyLink({ href, children, ...props }: ComponentProps<typeof Link>) {
  const sectionLoadingStart = useSectionLoaderStore((s) => s.start)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    sectionLoadingStart(href, false)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
