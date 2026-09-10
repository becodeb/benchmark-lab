export type StudentStatus = 'active' | 'inactive' | 'scholarship'

export type Student = {
  id: string
  name: string
  email: string
  course: string
  status: StudentStatus
  progress: number
  grade: number
  lastActive: string
}

export type SortKey = 'name' | 'course' | 'status' | 'progress' | 'grade' | 'lastActive'

export type SortDirection = 'asc' | 'desc'
