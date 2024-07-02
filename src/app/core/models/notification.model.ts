export interface NotificationDbModel {
  date: string
  title: string
  body: string
  redirectUrl: string
  role: string
  jsonData: string
  read: boolean
  id: number
}

export interface NotificationRequestModel {
  title: string
  body: string
  token: string
  redirectUrl: string
  type: string
  jsonData: string
  role: string
}

export interface NotificationEntryModel {
  token: string,
  device: string
}
