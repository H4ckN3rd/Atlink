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
      return '/logo-dark.svg'
    }
    return theme === 'light' ? '/logo-white.svg' : '/logo-dark.svg'
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
