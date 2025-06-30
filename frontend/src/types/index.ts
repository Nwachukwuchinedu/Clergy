export interface Teaching {
  id: string
  title: string
  body: string
  excerpt?: string
  image?: string
  youtubeUrl?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}

export interface CreateTeachingData {
  title: string
  body: string
  image?: File | string
  youtubeUrl?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}