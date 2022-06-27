export interface ApiResponse<T>{
  data?: T
  error_code: number
  error_type: string
  message: string,
  status: string
}
