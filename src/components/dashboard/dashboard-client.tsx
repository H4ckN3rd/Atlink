'use client'

import React, { useState, useEffect } from 'react'
import {
  type AttendanceRecord,
  type User,
  type ChartData,
} from '@/lib/types'
import { MetricCards } from './metric-cards'
import { AttendanceChart } from './attendance-chart'

type DashboardClientProps = {
  initialRecords: AttendanceRecord[]
  initialUsers: User[]
  initialChartData: ChartData[]
}

export function DashboardClient({
  initialRecords,
  initialUsers,
  initialChartData,
}: DashboardClientProps) {
  const [records] = useState<AttendanceRecord[]>(initialRecords)
  const [metrics, setMetrics] = useState({
    present: 0,
    absent: 0,
    totalUsers: 0,
    attendanceRate: 0,
  })

  // This flag ensures date-dependent logic only runs on the client after mounting
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredRecordsForMetrics = records.filter(
      (r) =>
        new Date(r.date).setHours(0, 0, 0, 0) === today.getTime() && r.status !== 'On Leave'
    );

    const presentCount = filteredRecordsForMetrics.filter((r) => r.status === 'Present').length;
    const absentCount = filteredRecordsForMetrics.filter((r) => r.status === 'Absent').length;
    const totalToday = presentCount + absentCount;
    const attendanceRate = totalToday > 0 ? Math.round((presentCount / totalToday) * 100) : 0;

    setMetrics({
      present: presentCount,
      absent: absentCount,
      totalUsers: initialUsers.length,
      attendanceRate,
    });
  }, [records, initialUsers.length, isClient]);


  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="space-y-4">
        <MetricCards metrics={metrics} />
        <div className="grid gap-4">
            <AttendanceChart data={initialChartData} />
        </div>
      </div>
    </>
  )
}
