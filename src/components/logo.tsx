'use client'

import Image from 'next/image'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function Logo({ className }: { className?: string }) {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const src = theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'

  return (
    <div className={cn('relative h-10 w-10', className)}>
      {isClient ? (
        <Image src={src} alt="AtLink Logo" fill priority sizes="(max-width: 768px) 48px, 40px" />
      ) : (
        // Provide a fallback or placeholder to avoid layout shift,
        // or simply render nothing on the server for the image itself.
        // An SVG placeholder can also be used here.
        <div className="h-full w-full rounded-full bg-muted" />
      )}
    </div>
  )
}
