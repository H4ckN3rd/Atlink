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

  const src = theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'

  return (
    <div className={cn('relative h-[52px] w-[52px]', className)}>
      {isClient ? (
        <Image src={src} alt="AtLink Logo" fill priority sizes="(max-width: 768px) 112px, 52px" />
      ) : (
        <div className="h-full w-full rounded-full bg-muted" />
      )}
    </div>
  )
}
