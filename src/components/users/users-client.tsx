'use client'

import React, { useState, useMemo } from 'react'
import { type User } from '@/lib/types'
import { DataTable } from '@/components/users/users-data-table'
import { columns } from '@/components/users/users-columns'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { AddUserDialog } from './add-user-dialog'

type UsersClientProps = {
  initialUsers: User[]
}

export function UsersClient({ initialUsers }: UsersClientProps) {
  const [records] = useState<User[]>(initialUsers)
  const [globalFilter, setGlobalFilter] = useState('')
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      // Global text search
      const nameMatch = record.name
        .toLowerCase()
        .includes(globalFilter.toLowerCase())
      const emailMatch = record.email
        .toLowerCase()
        .includes(globalFilter.toLowerCase())
      const rollNoMatch = record.rollNo
        ?.toLowerCase()
        .includes(globalFilter.toLowerCase())
      
      if (globalFilter && !nameMatch && !emailMatch && !rollNoMatch) {
        return false
      }

      return true
    })
  }, [records, globalFilter])

  return (
    <>
      <AddUserDialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              A list of all the students in the system.
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddUserOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredRecords}
            filters={{
              globalFilter,
              setGlobalFilter,
            }}
          />
        </CardContent>
      </Card>
    </>
  )
}
