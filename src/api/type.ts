import { ITelegramUser } from "@/provider/telegram/type";

export interface IpostData {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: ITelegramUser;
    auth_date: string;
    hash: string;
  };
}
export interface Ipaginator {
  page: number;
  pageSize: number;
}
export interface Ilogin extends IpostData {}

export interface IgetUser extends IpostData {}

export interface IuserReward extends IpostData {}

export interface IuserRank extends IpostData {}

export interface IinviteRank extends Ipaginator {}

export interface IFriendRank extends IpostData, Ipaginator {}

export interface IfindPid extends IpostData {}

export interface IfindAddress extends IpostData {
  type: string;
}

export interface IbindPid extends IpostData {
  pid: string;
}
