import { RedirectDataModel } from "./redirectdata.model";

export interface NotificationModel{
  id: number,
  userId: number,
  title: string,
  content: string,
  hasAlreadyRead: boolean,
  redirectUrl: string,
  type: string,
  createdDate: Date,
  redirectData: RedirectDataModel
}
