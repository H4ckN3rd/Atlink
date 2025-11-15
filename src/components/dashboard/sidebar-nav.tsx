'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, CalendarCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type UserRole = 'admin' | 'student';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: Home, roles: ['admin', 'student'] },
  { href: '/attendance', label: 'Attendance', icon: CalendarCheck, roles: ['admin', 'student'] },
  { href: '/users', label: 'Users', icon: Users, roles: ['admin'] },
]

type SidebarNavProps = {
  userRole: UserRole;
}

export function SidebarNav({ userRole }: SidebarNavProps) {
  const pathname = usePathname()

  const accessibleLinks = navLinks.filter(link => link.roles.includes(userRole));

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {accessibleLinks.map(({ href, label, icon: Icon, badge }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === href && 'bg-muted text-primary'
          )}
        >
          <Icon className="h-4 w-4" />
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
