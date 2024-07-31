import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    isNewUser: true,
    telegramUserData: {} as any,
    userRank: {} as any,
    inviteRank: {} as any,
    userReward: {} as any,
    friendRank: {} as any,
    bindStatus: {} as any,
  },
  reducers: {
    updateNewUser(stores, actions) {
      stores.isNewUser = actions.payload
    },
    updateTelegramUserData(stores, actions) {
      stores.telegramUserData = { ...actions.payload }
    },
    updateUserRank(stores, actions) {
      stores.userRank = { ...actions.payload }
    },
    updateInviteRank(stores, actions) {
      stores.inviteRank = { ...actions.payload }
    },
    updateUserReward(stores, actions) {
      stores.userReward = { ...actions.payload }
    },
    updateFriendRank(stores, actions) {
      stores.friendRank = { ...actions.payload }
    },
    updateBindStatus(stores, actions) {
      stores.bindStatus = { ...actions.payload }
    },
  },
})

export const {
  updateNewUser,
  updateTelegramUserData,
  updateUserRank,
  updateInviteRank,
  updateUserReward,
  updateFriendRank,
  updateBindStatus,
} = user.actions

export default user.reducer
