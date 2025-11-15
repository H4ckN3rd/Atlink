'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, CalendarCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

const navLinks = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { href: '/users', label: 'Users', icon: Users },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link
        href="/"
        className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary"
      >
        <Logo />
        <span className="sr-only">AtLink</span>
      </Link>
      {navLinks.map(({ href, label, icon: Icon, badge }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
            pathname === href && 'bg-muted text-foreground'
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
          {badge && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  )
}
