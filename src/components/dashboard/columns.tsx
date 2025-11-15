'use client'

import { type ColumnDef, type Column } from '@tanstack/react-table'
import { type AttendanceRecord } from '@/lib/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { format } from 'date-fns'

const SortableHeader = ({
  column,
  children,
}: {
  column: Column<AttendanceRecord, unknown>
  children: React.ReactNode
}) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
)

export const columns: ColumnDef<AttendanceRecord>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
             <span className="text-xs text-muted-foreground">{user.rollNo}</span>
          </div>
        </div>
      )
    },
  },
    {
    accessorKey: 'user.department',
    header: 'Department',
    cell: ({ row }) => {
      const user = row.original.user
      return <div>{user.department}</div>
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <SortableHeader column={column}>Date</SortableHeader>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return <div>{format(date, 'MMM d, yyyy')}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const variant =
        status === 'Present'
          ? 'default'
          : status === 'Absent'
          ? 'destructive'
          : 'secondary'
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: 'checkIn',
    header: 'Time',
    cell: ({ row }) => {
      const checkIn = row.getValue('checkIn') as string | null
      return checkIn ? (
        <div>{format(new Date(checkIn), 'h:mm a')}</div>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const record = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(record.id)}
            >
              Copy record ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View user profile</DropdownMenuItem>
            <DropdownMenuItem>Mark as corrected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
