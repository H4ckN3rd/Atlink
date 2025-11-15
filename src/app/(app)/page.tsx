'use client'

import React, { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { database } from '@/lib/firebase'
import {
  type AttendanceRecord,
  type User,
  type ChartData,
} from '@/lib/types'
import { DashboardClient } from '@/components/dashboard/dashboard-client'
import { Skeleton } from '@/components/ui/skeleton'
import { getChartData } from '@/lib/data' // We'll adapt this

export default function DashboardPage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const studentsRef = ref(database, 'Students')
    const attendanceRef = ref(database, 'Attendance')

    const unsubscribeStudents = onValue(studentsRef, (snapshot) => {
      const studentsData = snapshot.val()
      if (studentsData) {
        const usersArray: User[] = Object.entries(studentsData).map(
          ([id, data]: [string, any]) => ({
            id: id,
            name: data.Name,
            email: `${data.Name.toLowerCase().replace(' ', '.')}@example.com`,
            department: data.Department,
            rollNo: data.RollNo,
          })
        )
        setUsers(usersArray)
      } else {
        setUsers([])
      }
    })

    const unsubscribeAttendance = onValue(attendanceRef, (snapshot) => {
      const attendanceData = snapshot.val()
      setLoading(true)
      if (attendanceData && users.length > 0) {
        const recordsArray: AttendanceRecord[] = []
        const allStudentIds = users.map(u => u.id);

        Object.entries(attendanceData).forEach(([date, dailyEntries]: [string, any]) => {
            const presentIds = Object.keys(dailyEntries);
            const absentIds = allStudentIds.filter(id => !presentIds.includes(id));
            
            Object.entries(dailyEntries).forEach(([id, recordData]: [string, any]) => {
                const user = users.find(u => u.id === id);
                if (user) {
                    const checkInDateTime = new Date(`${date}T${recordData.Time}`)
                    recordsArray.push({
                        id: `${date}-${id}`,
                        user: user,
                        date: new Date(date).toISOString(),
                        status: 'Present',
                        checkIn: checkInDateTime.toISOString(),
                        checkOut: null,
                    });
                }
            });

            absentIds.forEach(id => {
                const user = users.find(u => u.id === id);
                if (user) {
                     recordsArray.push({
                        id: `${date}-${id}`,
                        user: user,
                        date: new Date(date).toISOString(),
                        status: 'Absent',
                        checkIn: null,
                        checkOut: null,
                    });
                }
            })
        });

        setRecords(recordsArray)
        getChartData(recordsArray).then(setChartData)
      } else {
        setRecords([])
        setChartData([])
      }
      setLoading(false)
    })

    return () => {
      unsubscribeStudents()
      unsubscribeAttendance()
    }
  }, [users.length]) // Rerun when users are loaded

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    )
  }

  return (
    <DashboardClient
      initialRecords={records}
      initialUsers={users}
      initialChartData={chartData}
    />
  )
}
