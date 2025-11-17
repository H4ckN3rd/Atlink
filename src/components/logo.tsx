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
    // On the server, or before the client has mounted, we can't know the theme.
    // To avoid a hydration mismatch, we can render a placeholder or a default.
    // A better approach is to render what the server *thinks* is right (default),
    // and let the client-side `useEffect` correct it.
    if (!isClient) {
      // Assuming 'dark' is the default theme specified in ThemeProvider
      return '/logo-dark.svg'
    }

    if (theme === 'dark') {
      return '/logo-dark.svg'
    }
    if (theme === 'light') {
      return '/logo-light.svg'
    }
    // For 'system' theme, decide based on media query
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return '/logo-dark.svg'
    }
    return '/logo-light.svg'
  }

  return (
    <div className={cn('relative', className)}>
      {/* 
        By using a key that changes with the theme, we force React to re-render 
        the Image component from scratch instead of just updating the `src`.
        This is a reliable way to handle theme-dependent image sources.
        The isClient check ensures we don't cause a mismatch during hydration.
      */}
      {isClient && (
        <Image
          key={getLogoSrc()} 
          src={getLogoSrc()}
          alt="AtLink Logo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      {/* 
        This is a server-side rendered placeholder that will be replaced on the client.
        It prevents layout shift and ensures something is visible initially.
      */}
      {!isClient && (
         <Image
          src="/logo-dark.svg" // Default to dark as per layout default
          alt="AtLink Logo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  )
}
