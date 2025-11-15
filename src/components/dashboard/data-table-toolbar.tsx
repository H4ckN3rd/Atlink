"use client"

import * as React from "react"
import { type Table } from "@tanstack/react-table"
import {
  Check,
  ChevronsUpDown,
  X,
} from 'lucide-react'

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { DatePicker } from "@/components/ui/date-picker"
import type { User, AttendanceStatus } from '@/lib/types'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  users: User[]
  filters: {
    globalFilter: string
    setGlobalFilter: (value: string) => void
    statusFilter: AttendanceStatus | 'all'
    setStatusFilter: (value: AttendanceStatus | 'all') => void
    userFilter: string | 'all'
    setUserFilter: (value: string | 'all') => void
    dateFilter: Date | undefined
    setDateFilter: (value: Date | undefined) => void
  }
}

export function DataTableToolbar<TData>({
  table,
  users,
  filters,
}: DataTableToolbarProps<TData>) {
  const {
    globalFilter,
    setGlobalFilter,
    statusFilter,
    setStatusFilter,
    userFilter,
    setUserFilter,
    dateFilter,
    setDateFilter
  } = filters

  const isFiltered = globalFilter !== '' || statusFilter !== 'all' || userFilter !== 'all' || !!dateFilter
  
  const handleResetFilters = () => {
    setGlobalFilter('');
    setStatusFilter('all');
    setUserFilter('all');
    setDateFilter(undefined);
  }

  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-start gap-2 md:flex-row md:flex-1 md:items-center">
        <Input
          placeholder="Filter by name or email..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-10 w-full md:w-[250px] lg:w-[300px]"
        />
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between md:w-[200px]"
            >
              {userFilter !== 'all'
                ? users.find((user) => user.id === userFilter)?.name
                : "Select user..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search user..." />
              <CommandList>
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="all"
                    onSelect={() => {
                      setUserFilter('all')
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        userFilter === 'all' ? "opacity-100" : "opacity-0"
                      )}
                    />
                    All Users
                  </CommandItem>
                  {users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.name}
                      onSelect={(currentValue) => {
                        setUserFilter(user.id)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          userFilter === user.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {user.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Present">Present</SelectItem>
            <SelectItem value="Absent">Absent</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
          </SelectContent>
        </Select>

        <DatePicker date={dateFilter} onDateChange={setDateFilter} />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-10 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
