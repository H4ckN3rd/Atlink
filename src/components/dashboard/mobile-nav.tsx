
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, CalendarCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

type UserRole = 'admin' | 'student';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: Home, roles: ['admin', 'student'] },
  { href: '/attendance', label: 'Attendance', icon: CalendarCheck, roles: ['admin', 'student'] },
  { href: '/users', label: 'Users', icon: Users, roles: ['admin'] },
]

type MobileNavProps = {
  userRole: UserRole;
}

export function MobileNav({ userRole }: MobileNavProps) {
  const pathname = usePathname()
  const accessibleLinks = navLinks.filter(link => link.roles.includes(userRole));

  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link
        href="/"
        className="mb-4 flex items-center gap-2 text-lg font-semibold"
      >
        <Logo className="h-8 w-8" />
        <span className="text-primary text-xl">AtLink</span>
      </Link>
      {accessibleLinks.map(({ href, label, icon: Icon, badge }) => (
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
