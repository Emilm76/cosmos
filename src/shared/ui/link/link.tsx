'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLoaderStore } from '@/store/loader-store'
import { ComponentProps, MouseEvent } from 'react'

export function MyLink({ href, children, ...props }: ComponentProps<typeof Link>) {
  const show = useLoaderStore((s) => s.show)
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    show()

    setTimeout(() => {
      router.push(href.toString())
    }, 1000)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
