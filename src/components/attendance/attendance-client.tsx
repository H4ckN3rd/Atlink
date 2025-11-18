'use client'

import React, { useState, useMemo, useEffect } from 'react'
import {
  type AttendanceRecord,
  type User,
  type AttendanceStatus,
} from '@/lib/types'
import { DataTable } from '@/components/dashboard/data-table'
import { columns } from '@/components/dashboard/columns'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

type AttendanceClientProps = {
  initialRecords: AttendanceRecord[]
  initialUsers: User[]
  initialUserIdFilter?: string
}

export function AttendanceClient({
  initialRecords,
  initialUsers,
  initialUserIdFilter
}: AttendanceClientProps) {
  const [records] = useState<AttendanceRecord[]>(initialRecords)
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | 'all'>(
    'all'
  )
  const [userFilter, setUserFilter] = useState<string | 'all'>(initialUserIdFilter || 'all')
  const [dateFilter, setDateFilter] = useState<Date | undefined>(new Date())

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const filteredRecords = useMemo(() => {
    if (!isClient) {
      return records;
    }

    return records.filter((record) => {
      // Global text search
      const nameMatch = record.user.name
        .toLowerCase()
        .includes(globalFilter.toLowerCase())
      const emailMatch = record.user.email
        .toLowerCase()
        .includes(globalFilter.toLowerCase())
      if (globalFilter && !nameMatch && !emailMatch) {
        return false
      }

      // Status filter
      if (statusFilter !== 'all' && record.status !== statusFilter) {
        return false
      }
      
      // User filter
      if (userFilter !== 'all' && record.user.id !== userFilter) {
        return false
      }

      // Date filter
      if (dateFilter) {
        const recordDate = new Date(record.date)
        if (
          recordDate.getFullYear() !== dateFilter.getFullYear() ||
          recordDate.getMonth() !== dateFilter.getMonth() ||
          recordDate.getDate() !== dateFilter.getDate()
        ) {
          return false
        }
      }

      return true
    })
  }, [records, globalFilter, statusFilter, userFilter, dateFilter, isClient])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Records</CardTitle>
        <CardDescription>
          View and manage user attendance records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={filteredRecords}
          users={initialUsers}
          filters={{
            globalFilter,
            setGlobalFilter,
            statusFilter,
            setStatusFilter,
            userFilter,
            setUserFilter,
            dateFilter,
            setDateFilter,
          }}
        />
      </CardContent>
    </Card>
  )
}
