import api from '@/api'
import Box from '@/components/box'
import Icon from '@/components/icon'
import Loader from '@/components/loader'
import { Text } from '@/components/text'
import { HeaderTitle, Title } from '@/components/title'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { updateInviteRank } from '@/store/user'
import { getTextColorForBackground, semicolon, stringToColor } from '@/utils'
import { Card, CardHeader, Container } from '@material-ui/core'
import { useEffect, useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import { List } from 'react-vant'

export const Avatar = ({
  name = '',
  bg = '',
  color = '',
}: {
  name?: string
  bg?: string
  color?: string
}) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="54"
        height="54"
        rx="54"
        fill={bg || '#091939'}
        stroke="#266395"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-[18px] font-bold"
        fill={color}
      >
        {name}
      </text>
    </svg>
  )
}

const getNameIcon = (index: number) => {
  console.log(index)
  switch (index) {
    case 1:
      return <Icon name="leaderBoard1" className="!w-8 !h-8"></Icon>
    case 2:
      return <Icon name="leaderBoard2" className="!w-8 !h-8"></Icon>
    case 3:
      return <Icon name="leaderBoard3" className="!w-8 !h-8"></Icon>

    default:
      return index
  }
}

export default function Leaderboard() {
  const { t } = useTranslation()
  const { userRank, inviteRank } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const [finished, setFinished] = useState(true)
  const loadData = async () => {
    const page = inviteRank.page + 1
    const pageSize = inviteRank.pageSize

    const result = await api.user.inviteRankAPI({ page, pageSize })
    const nArr = [...inviteRank.data, ...result.data.data]
    dispatch(
      updateInviteRank({ page, pageSize, data: nArr, total: result.data.total })
    )
  }
  useEffect(() => {
    if (
      inviteRank &&
      inviteRank.data &&
      inviteRank.data.length &&
      inviteRank.data.length < 500 &&
      inviteRank.data.length < inviteRank.total
    ) {
      setFinished(false)
    } else {
      setFinished(true)
    }
  }, [inviteRank])
  return (
    <Box>
      <div className="grid gap-6 w-100 justify-items-center">
        <Title>{t('public.leaderboard')}</Title>
        <Card className="w-full card binding-card-bg">
          <CardHeader
            className="text-white"
            avatar={
              <Avatar
                name={
                  (userRank.username &&
                    userRank.username.slice(0, 2).toUpperCase()) ||
                  ''
                }
                bg={stringToColor(userRank.username || '')}
                color={
                  getTextColorForBackground(userRank.username).textColor || ''
                }
              />
            }
            action={
              userRank.rank ? (
                <div className="w-[30px] h-[45px] relative flex items-center justify-center">
                  {userRank.rank <= 3 ? (
                    getNameIcon(userRank.rank)
                  ) : (
                    <Text
                      className="!text-[0.86rem]"
                      style={{
                        textShadow: ' 2px 2px 4px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {'#' + (userRank.rank || 0)}
                    </Text>
                  )}
                </div>
              ) : (
                ''
              )
            }
            title={<Text>{userRank.username || ''}</Text>}
            subheader={
              <Text className="text-white/50">
                {semicolon(userRank.score || 0)} PIS
              </Text>
            }
          />
        </Card>
        <HeaderTitle className="w-full">
          {inviteRank.total || 0} {t('public.holders')}
        </HeaderTitle>
        <List
          loadingText={t('message.refresh.loading')}
          offset={100}
          onLoad={loadData}
          finished={finished}
          className="grid gap-6 w-100 justify-items-center"
        >
          {inviteRank.data &&
            inviteRank.data.length &&
            inviteRank.data.map((item: any, index: number) => (
              <CardHeader
                key={index}
                className="w-full !p-0"
                avatar={
                  <Avatar
                    name={
                      (item.username &&
                        item.username.slice(0, 2).toUpperCase()) ||
                      ''
                    }
                    bg={stringToColor(item.username || '')}
                    color={
                      getTextColorForBackground(item.username).textColor || ''
                    }
                  />
                }
                action={
                  index <= 10 ? (
                    <div className="w-[30px] h-[45px] relative flex items-center justify-center">
                      {(item.rank || index + 1) <= 3 ? (
                        getNameIcon(item.rank || index + 1)
                      ) : (
                        <Text
                          className="!text-[0.86rem]"
                          style={{
                            textShadow: ' 2px 2px 4px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          {'#' + (item.rank || index + 1)}
                        </Text>
                      )}
                    </div>
                  ) : (
                    item.rank || index + 1
                  )
                }
                title={<Text>{item.username || ''}</Text>}
                subheader={
                  <Text className="text-white/50">
                    {semicolon(item.score || 0)} PIS
                  </Text>
                }
              />
            ))}
        </List>

        <Loader />
      </div>
    </Box>
  )
}
