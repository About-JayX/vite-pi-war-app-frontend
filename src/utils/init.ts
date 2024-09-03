import api from '@/api'
import { useTelegram } from '@/provider/telegram'
import { useAppDispatch } from '@/store/hook'
import {
  updateBindStatus,
  updateFriendRank,
  updateInviteRank,
  updateTelegramUserData,
  updateUserRank,
  updateUserReward,
} from '@/store/user'

export const initData = async (
  dispatch: any,
  postData: any,
  callback?: () => void
) => {
  const callbackFun = async (callback: Function, methodName: string) => {
    let result = await callback()

    switch (methodName) {
      case 'userFun': {
        if (result.data && result.data.predict_time === null) {
          result = await new Promise(reslove => {
            setTimeout(async () => {
              reslove(await callbackFun(callback, 'userFun'))
            }, 3000)
          })
        }
        return result
      }
      case 'userRank': {
        if (result.data && result.data.username === '未知') {
          result = await new Promise(reslove => {
            setTimeout(async () => {
              reslove(await callbackFun(callback, 'userRank'))
            }, 2000)
          })
        }
        return result
      }
      case 'userReward': {
        if (
          result.data &&
          result.data.activityLogs &&
          !result.data.activityLogs.length
        ) {
          result = await new Promise(reslove => {
            setTimeout(async () => {
              reslove(await callbackFun(callback, 'userReward'))
            }, 2000)
          })
        }
        return result
      }
      default: {
        console.log('not found')
        break
      }
    }
  }

  if (!postData) return

  const reqls: Array<{
    name: string
    callback: any
    params: any
  }> = [
    {
      name: 'userFun',
      callback: () => {
        return callbackFun(api.user.getUserAPI, 'userFun')
      },
      params: '',
    },
    {
      name: 'userRank',
      callback: () => {
        return callbackFun(api.user.userRankAPI, 'userRank')
      },
      params: '',
    },
    {
      name: 'userReward',
      callback: () => {
        return callbackFun(api.user.userRewardAPI, 'userReward')
      },
      params: '',
    },
    {
      name: 'inviteRank',
      callback: api.user.inviteRankAPI,
      params: {
        page: 1,
        pageSize: 10,
      },
    },
    {
      name: 'friendRank',
      callback: api.user.friendRankAPI,
      params: {
        page: 1,
        pageSize: 10,
      },
    },
    {
      name: 'bindPid',
      callback: api.user.findPidAPI,
      params: '',
    },
    {
      name: 'ercAddress',
      callback: api.user.findAddressAPI,
      params: {
        type: 'erc20',
      },
    },
    {
      name: 'solAddress',
      callback: api.user.findAddressAPI,
      params: {
        type: 'solana',
      },
    },
  ]

  const pReqls = reqls.map(item => {
    return new Promise(async (re, _) => {
      const result = item.params
        ? await item.callback(item.params as any)
        : await item.callback()

      if (result.success) {
        re({ name: item.name, result: result.data, params: item.params })
      } else {
        re({ name: item.name, result: null })
      }
    })
  })

  const results = await Promise.all(pReqls)
  const bindStatus: any = {}
  results.forEach((item: any) => {
    switch (item.name) {
      case 'userFun': {
        dispatch(updateTelegramUserData(item.result))
        break
      }
      case 'userRank': {
        dispatch(updateUserRank(item.result))
        break
      }
      case 'userReward': {
        const userReward = item.result
        let newArr: any = []
        userReward.activityLogs.forEach((item: any) => {
          if (!newArr.length) {
            newArr.push(item)
          } else {
            let obj = newArr.find((child: any) => child.key === item.key)
            if (!obj) {
              newArr.push(item)
            } else {
              obj.value = String(Number(obj.value) + Number(item.value))
            }
          }
        })
        userReward.activityLogs = newArr.filter((item: any) =>
          Number(item.value)
        )
        dispatch(updateUserReward(userReward))
        break
      }
      case 'inviteRank': {
        const nResult = Object.assign(item.params, item.result)
        dispatch(updateInviteRank(nResult))
        break
      }
      case 'friendRank': {
        const nResult = Object.assign(item.params, item.result)
        dispatch(updateFriendRank(nResult))
        break
      }
      case 'bindPid': {
        bindStatus.pid = item.result || null
        break
      }
      case 'ercAddress': {
        bindStatus.erc = item.result || null
        break
      }
      case 'solAddress': {
        bindStatus.sol = item.result || null
        break
      }

      default: {
        console.log('not found')

        break
      }
    }
  })
  dispatch(updateBindStatus(bindStatus))
  callback && callback()
}
