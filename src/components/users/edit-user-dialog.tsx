'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ref, update } from 'firebase/database'
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
import { type User } from '@/lib/types'

const studentSchema = z.object({
  Name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  Department: z
    .string()
    .min(2, { message: 'Department must be at least 2 characters.' }),
  RollNo: z
    .string()
    .min(5, { message: 'Roll number must be at least 5 characters.' }),
})

type StudentFormValues = z.infer<typeof studentSchema>

type EditUserDialogProps = {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditUserDialog({ user, open, onOpenChange }: EditUserDialogProps) {
  const { toast } = useToast()
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      Name: user.name,
      Department: user.department || '',
      RollNo: user.rollNo || '',
    },
  })
  
  useEffect(() => {
    if (user) {
      form.reset({
        Name: user.name,
        Department: user.department || '',
        RollNo: user.rollNo || '',
      })
    }
  }, [user, form])


  const onSubmit = async (data: StudentFormValues) => {
    try {
      const studentRef = ref(database, `Students/${user.id}`)
      
      const studentData = {
        Name: data.Name,
        Department: data.Department,
        RollNo: data.RollNo,
      }

      await update(studentRef, studentData)
      
      toast({
        title: 'User Updated',
        description: `${data.Name} has been successfully updated.`,
      })
      onOpenChange(false)
    } catch (error) {
      console.error('Error updating student: ', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update the user. Please try again.',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update the details for {user.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
             <FormItem>
              <FormLabel>RFID Tag ID</FormLabel>
              <FormControl>
                <Input value={user.id} disabled />
              </FormControl>
            </FormItem>
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
                  {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
