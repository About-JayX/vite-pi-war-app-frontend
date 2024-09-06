import { ITelegramUser } from '@/provider/telegram/type'

export interface IpostData {
  initData: string
  initDataUnsafe: {
    query_id: string
    user: ITelegramUser
    auth_date: string
    hash: string
  }
}
export interface Ipaginator {
  page: number
  pageSize: number
}
export interface Ilogin extends IpostData {}

export interface IgetUser {}

export interface IuserReward {}

export interface IuserRank {}

export interface IinviteRank extends Ipaginator {}

export interface IFriendRank extends Ipaginator {}

export interface IfindPid {}

export interface IfindAddress {
  type: string
}
