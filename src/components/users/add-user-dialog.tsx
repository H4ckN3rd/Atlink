'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ref, set } from 'firebase/database'
import { database } from '@/lib/firebase'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const studentSchema = z.object({
  rfid: z.string().min(1, { message: 'RFID is required.' }),
  Name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  Department: z
    .string()
    .min(2, { message: 'Department must be at least 2 characters.' }),
  RollNo: z
    .string()
    .min(5, { message: 'Roll number must be at least 5 characters.' }),
})

type StudentFormValues = z.infer<typeof studentSchema>

type AddUserDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
  const { toast } = useToast()
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      rfid: '',
      Name: '',
      Department: '',
      RollNo: '',
    },
  })

  const onSubmit = async (data: StudentFormValues) => {
    try {
      // Use the RFID as the key
      const studentRef = ref(database, `Students/${data.rfid}`)
      
      // Prepare the data to be saved (without the rfid field itself)
      const studentData = {
        Name: data.Name,
        Department: data.Department,
        RollNo: data.RollNo,
      }

      await set(studentRef, studentData)
      
      toast({
        title: 'User Added',
        description: `${data.Name} has been successfully added.`,
      })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error adding student: ', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add the new user. Please try again.',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new student to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="rfid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RFID Tag ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Scan or enter RFID..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., CSE, ECE" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="RollNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2K22CSUN01001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Adding...' : 'Add Student'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
