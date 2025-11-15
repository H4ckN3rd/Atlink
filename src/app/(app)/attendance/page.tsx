'use client'

import React, { useState, useEffect } from 'react'
import { get, ref, onValue } from 'firebase/database'
import { database } from '@/lib/firebase'
import { type AttendanceRecord, type User } from '@/lib/types'
import { AttendanceClient } from '@/components/attendance/attendance-client'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [users, setUsers] = useState<User[]>([])
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
            email: `${data.Name.toLowerCase().replace(' ', '.')}@example.com`, // Placeholder
            department: data.Department,
            rollNo: data.RollNo,
          })
        )
        setUsers(usersArray)
      } else {
        setUsers([])
      }
    })

    const unsubscribeAttendance = onValue(attendanceRef, async (snapshot) => {
      const attendanceData = snapshot.val()
      setLoading(true)
      if (attendanceData) {
        // We need users to be populated first
        const studentsSnapshot = await get(studentsRef);
        const studentsData = studentsSnapshot.val();
        if (!studentsData) {
           setRecords([]);
           setLoading(false);
           return;
        }

        const usersMap: { [id: string]: User } = Object.entries(
          studentsData
        ).reduce((acc, [id, data]: [string, any]) => {
          acc[id] = {
            id: id,
            name: data.Name,
            email: `${data.Name.toLowerCase().replace(' ', '.')}@example.com`,
            department: data.Department,
            rollNo: data.RollNo,
          }
          return acc
        }, {} as { [id: string]: User })
        
        const allStudentIds = Object.keys(usersMap);

        const recordsArray: AttendanceRecord[] = []
        
        Object.entries(attendanceData).forEach(([date, dailyEntries]: [string, any]) => {
            const presentIds = Object.keys(dailyEntries);
            const absentIds = allStudentIds.filter(id => !presentIds.includes(id));
            
            // Add present records
            Object.entries(dailyEntries).forEach(([id, recordData]: [string, any]) => {
                if (usersMap[id]) {
                    const checkInDateTime = new Date(`${date}T${recordData.Time}`)
                    recordsArray.push({
                        id: `${date}-${id}`,
                        user: usersMap[id],
                        date: new Date(date).toISOString(),
                        status: 'Present',
                        checkIn: checkInDateTime.toISOString(),
                        checkOut: null, // Not in data
                    });
                }
            });

            // Add absent records
            absentIds.forEach(id => {
                if (usersMap[id]) {
                     recordsArray.push({
                        id: `${date}-${id}`,
                        user: usersMap[id],
                        date: new Date(date).toISOString(),
                        status: 'Absent',
                        checkIn: null,
                        checkOut: null,
                    });
                }
            })
        });

        setRecords(recordsArray)
      } else {
        setRecords([])
      }
      setLoading(false)
    })

    return () => {
      unsubscribeStudents()
      unsubscribeAttendance()
    }
  }, [])

  if (loading) {
    return (
      <div className="space-y-4 p-4 lg:p-6">
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return <AttendanceClient initialRecords={records} initialUsers={users} />
}
