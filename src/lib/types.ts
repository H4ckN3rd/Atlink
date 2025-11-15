export type User = {
  id: string
  name: string
  email: string
  department?: string
  rollNo?: string
}

export type AttendanceStatus = 'Present' | 'Absent' | 'On Leave'

export type AttendanceRecord = {
  id: string
  user: User
  date: string // ISO string
  status: AttendanceStatus
  checkIn: string | null // ISO string
  checkOut: string | null // ISO string
}

export type AttendanceMetric = {
  label: 'Present' | 'Absent' | 'Total Users' | 'Attendance Rate'
  value: string
  icon: React.ElementType
}

export type ChartData = {
  date: string
  Present: number
  Absent: number
}
