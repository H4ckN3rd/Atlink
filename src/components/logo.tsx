'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <Image
        src="/logo-dark.svg"
        alt="AtLink Logo Dark"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="block dark:hidden"
      />
      <Image
        src="/logo-light.svg"
        alt="AtLink Logo Light"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="hidden dark:block"
      />
    </div>
  )
}
