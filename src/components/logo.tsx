'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <Image
        src="/logo-light.svg"
        alt="AtLink Logo"
        fill
        priority
        sizes="(max-width: 768px) 112px, 112px"
        className="block dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        alt="AtLink Logo"
        fill
        priority
        sizes="(max-width: 768px) 112px, 112px"
        className="hidden dark:block"
      />
    </div>
  )
}
