'use client'

import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import type { AttendanceRecord } from '@/lib/types'

type RecentActivityProps = {
  records: AttendanceRecord[]
}

export function RecentActivity({ records }: RecentActivityProps) {
  return (
    <Card className="md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Recent check-ins from your users.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {records.length > 0 ? (
          records.map((record) => (
            <div key={record.id} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={record.user.avatar} alt={record.user.name} />
                <AvatarFallback>
                  {record.user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {record.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {record.user.email}
                </p>
              </div>
              {record.checkIn && (
                <div className="ml-auto text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(record.checkIn), {
                    addSuffix: true,
                  })}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No recent activity to display.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
