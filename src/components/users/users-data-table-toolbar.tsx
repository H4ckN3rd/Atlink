"use client"

import * as React from "react"
import { type Table } from "@tanstack/react-table"
import { X } from 'lucide-react'

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

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters: {
    globalFilter: string
    setGlobalFilter: (value: string) => void
  }
}

export function DataTableToolbar<TData>({
  table,
  filters,
}: DataTableToolbarProps<TData>) {
  const {
    globalFilter,
    setGlobalFilter,
  } = filters

  const isFiltered = globalFilter !== ''
  
  const handleResetFilters = () => {
    setGlobalFilter('');
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-start gap-2 md:flex-row md:flex-1 md:items-center">
        <Input
          placeholder="Filter by name, email, or roll no..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-10 w-full md:w-[250px] lg:w-[300px]"
        />
        
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
                  {column.id === 'rollNo' ? 'Roll No' : column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
