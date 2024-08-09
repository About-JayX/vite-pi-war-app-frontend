import request from '@/request'
import {
  IbindPid,
  IfindAddress,
  IfindPid,
  IFriendRank,
  IgetUser,
  IinviteRank,
  Ilogin,
  IuserRank,
  IuserReward,
} from './type'

export const loginAPI = (data: Ilogin) => request.post('/botapp/login', data)

export const getUserAPI = (data?: IgetUser) =>
  request.post('/botapp/current-user', data)

export const userRewardAPI = (data?: IuserReward) =>
  request.post('/botapp/user-rewards', data)

export const userRankAPI = (data?: IuserRank) =>
  request.post('/botapp/user-rank', data)

export const inviteRankAPI = (data?: IinviteRank) =>
  request.post('/botapp/invitation-leaderboard', data)

export const friendRankAPI = (data?: IFriendRank) =>
  request.post('/botapp/user-friends', data)

export const findAddressAPI = (data?: IfindAddress) =>
  request.post('/authorize-Bind/find-address', data)

export const findPidAPI = (data?: IfindPid) =>
  request.post('/authorize-Bind/find-pid', data)

export const bindPidAPI = (data?: IbindPid) =>
  request.post('/authorize-Bind/bind-pid', data)

export const bindWallentAPI = (type?:string,data?: string) => {
  return `https://skeleton-8wov.vercel.app/${type}/${data}`
}
