'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLoaderStore } from '@/store/loader-store'
import { ComponentProps, MouseEvent } from 'react'
import { useSectionLoaderStore } from '@/store'

export function MyLink({ href, children, ...props }: ComponentProps<typeof Link>) {
  //const show = useLoaderStore((s) => s.show)
  //const router = useRouter()
  const sectionLoadingStart = useSectionLoaderStore((s) => s.start)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    sectionLoadingStart(href, false)
    //show()

    // setTimeout(() => {
    //   router.push(href.toString())
    // }, 1000)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
