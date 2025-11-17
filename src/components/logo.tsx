'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme-provider'
import { useState, useEffect } from 'react'

export function Logo({ className }: { className?: string }) {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getLogoSrc = () => {
    if (!isClient) {
      // Default to dark logo for server-side rendering to avoid flash
      return '/logo-dark.svg'
    }
    if (theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return '/logo-dark.svg'
    }
    return '/logo-white.svg'
  }

  return (
    <div className={cn('relative', className)}>
      <Image
        src={getLogoSrc()}
        alt="AtLink Logo"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
