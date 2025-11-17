'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme-provider'
import { useEffect, useState } from 'react'

export function Logo({ className }: { className?: string }) {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getLogoSrc = () => {
    if (theme === 'dark') {
      return '/logo-dark.svg'
    }
    if (theme === 'light') {
      return '/logo-light.svg'
    }
    // Default for system or while loading
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return '/logo-dark.svg'
    }
    return '/logo-light.svg'
  }

  if (!isClient) {
    // Render a placeholder or nothing on the server to avoid hydration mismatch
    return <div className={cn('relative', className)} />
  }

  return (
    <div className={cn('relative', className)}>
      <Image
        src={getLogoSrc()}
        alt="AtLink Logo"
        fill
        priority
        sizes="112px"
      />
    </div>
  )
}
