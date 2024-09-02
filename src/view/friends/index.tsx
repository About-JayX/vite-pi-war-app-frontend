import Button from '@/components/button'
import { HeaderTitle, Title } from '@/components/title'
import { useAppSelector } from '@/store/hook'
import { CardHeader, Container } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { getTextColorForBackground, semicolon, stringToColor } from '@/utils'
import { Text } from '@/components/text'
import Loader from '@/components/loader'
import Share from './share'
import { useState } from 'preact/hooks'
import { Avatar } from '../leaderboard'
import PullToRefresh from 'react-pull-to-refresh'

export default function Friends() {
  const { t } = useTranslation()

  const { telegramUserData, friendRank } = useAppSelector(state => state.user)

  const [open, setOpen] = useState<boolean>(false)

  const shareUrl = `https://t.me/share/url?url=https://t.me/${
    import.meta.env.VITE_BOOTNAME
  }/?startapp%3D${
    telegramUserData.Invitation_code
  }&text=%0A${encodeURIComponent(t('friends.inviteText'))}`

  const nav: string[] = t('nav', { returnObjects: true })

  const [loading, setLoading] = useState(false)
  return (
    <>
      <Share open={open} onHide={() => setOpen(false)} url={shareUrl} />
      <Container maxWidth="xl" className="p-4 pb-0">
        <div className="grid grid-flow-row grid-rows-[1fr,auto] h-full relative">
          <div class="min-h-[calc(100vh-14rem)]">
            <div className="grid w-full gap-6 overflow-hidden h-fit">
              <div className="grid gap-6 w-100 justify-items-center text-center">
                <Title className="whitespace-pre-line text-center">
                  {nav?.[2]}
                </Title>
                <Text className="text-color mt-[-1rem]">
                  {t('friends.title')}
                </Text>
              </div>
              <HeaderTitle className="text-left w-full">
                {friendRank.total || 0} {t('public.friends')}
              </HeaderTitle>
              {friendRank.friends &&
                friendRank.friends.length > 0 &&
                friendRank.friends.map((item: any, index: number) => (
                  <CardHeader
                    key={index}
                    className="w-full !p-0"
                    avatar={
                      <Avatar
                        name={
                          (item.invited_by_userName &&
                            item.invited_by_userName
                              .slice(0, 2)
                              .toUpperCase()) ||
                          ''
                        }
                        bg={stringToColor(item.invited_by_userName)}
                        color={
                          getTextColorForBackground(item.invited_by_userName)
                            .textColor
                        }
                      />
                    }
                    action={
                      <Text>
                        +{semicolon(item.reward_amount || 0)}&nbsp;PIS
                      </Text>
                    }
                    title={<Text>{item.invited_by_userName || ''}</Text>}
                  />
                ))}
            </div>
            <Loader />
          </div>

          <div className="w-full bg-[#0b141a] sticky bottom-[0] z-1 h-[70px] flex items-center">
            <Button onClick={() => setOpen(true)} className="w-full">
              {t('public.inviteFriends')}
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}
