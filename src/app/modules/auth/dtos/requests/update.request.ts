export interface UpdateProfileRequest{
  id: number,
  fullName: string,
  email: string,
  emailNotification: boolean,
  appNotification: boolean
  fontSize: string
  role: {
    code: string,
    name: string
  },
  countryCodes: string[]
  language: string,
}
