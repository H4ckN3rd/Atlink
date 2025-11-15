'use client'

import React, { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { database } from '@/lib/firebase'
import { type User } from '@/lib/types'
import { UsersClient } from '@/components/users/users-client'
import { Skeleton } from '@/components/ui/skeleton'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const studentsRef = ref(database, 'Students')

    const unsubscribeStudents = onValue(studentsRef, (snapshot) => {
      setLoading(true)
      const studentsData = snapshot.val()
      if (studentsData) {
        const usersArray: User[] = Object.entries(studentsData).map(
          ([id, data]: [string, any]) => ({
            id: id,
            name: data.Name,
            email: `${data.Name.toLowerCase().replace(/\s/g, '.')}@example.com`, // Placeholder
            department: data.Department,
            rollNo: data.RollNo,
          })
        )
        setUsers(usersArray)
      } else {
        setUsers([])
      }
      setLoading(false)
    })

    return () => {
      unsubscribeStudents()
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

  return <UsersClient initialUsers={users} />
}
