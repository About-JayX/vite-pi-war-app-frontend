import Loader from '@/components/loader'
import { Text } from '@/components/text'
import { HeaderTitle, Title } from '@/components/title'
import { useAppSelector } from '@/store/hook'
import { getTextColorForBackground, semicolon, stringToColor } from '@/utils'
import { Avatar, Card, CardHeader, Container } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export default function Leaderboard() {
  const { t } = useTranslation()
  const { userRank, inviteRank } = useAppSelector(state => state.user)
  return (
    <Container maxWidth="xl" className="p-4">
      <div className="grid gap-6 w-100 justify-items-center">
        <Title>{t('public.leaderboard')}</Title>
        <Card className="w-full card">
          <CardHeader
            className=""
            avatar={
              <Avatar
                aria-label="recipe"
                style={{
                  background: stringToColor(userRank.username || ''),
                  color:
                    getTextColorForBackground(userRank.username).textColor ||
                    '',
                }}
              >
                {(userRank.username &&
                  userRank.username.slice(0, 2).toUpperCase()) ||
                  ''}
              </Avatar>
            }
            action={
              userRank.rank ? (
                <div className="w-[2.6rem] h-[2.6rem] relative flex items-center justify-center">
                  <img
                    src={`/ranking/${
                      userRank.rank <= 2 ? userRank.rank : 4
                    }.png`}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                  <Text
                    className="!text-[0.86rem]"
                    style={{ textShadow: ' 2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                  >
                    {userRank.rank || 0}
                  </Text>
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
        {inviteRank.data &&
          inviteRank.data.length &&
          inviteRank.data.map((item: any, index: number) => (
            <CardHeader
              key={index}
              className="w-full !p-0"
              avatar={
                <Avatar
                  aria-label="recipe"
                  style={{
                    background: stringToColor(item.username),
                    color: getTextColorForBackground(item.username).textColor,
                  }}
                >
                  {(item.username && item.username.slice(0, 2).toUpperCase()) ||
                    ''}
                </Avatar>
              }
              action={
                index <= 10 ? (
                  <div className="w-[2.6rem] h-[2.6rem] relative flex items-center justify-center">
                    <img
                      src={`/ranking/${index <= 3 ? index + 1 : 4}.png`}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                    <Text
                      className="!text-[0.86rem]"
                      style={{ textShadow: ' 2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                    >
                      {item.rank || index + 1}
                    </Text>
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
        <Loader />
      </div>
    </Container>
  )
}
