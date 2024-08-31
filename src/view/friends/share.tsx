import Button from '@/components/button'
import Modals from '@/components/modal'
import { useTranslation } from 'react-i18next'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MessageSuccess } from '@/components/message'
import invite from '@/config/invite'
import { useAppSelector } from '@/store/hook'

export default function Share({
  url = '',
  open = false,
  onHide,
}: {
  url?: string
  open?: boolean
  onHide: () => void
}) {
  const { t } = useTranslation()
  const { telegramUserData } = useAppSelector(state => state.user)
  return (
    <Modals
      title={t('public.invitedFriends')}
      open={open}
      onHide={onHide}
      body={
        <div className="grid w-full gap-2">
          <CopyToClipboard
            text={`https://t.me/${invite.botName}/join?startapp=${
              telegramUserData.Invitation_code
            }\n\n${t('friends.inviteText')}`}
            onCopy={() => MessageSuccess(t('message.copy.success'))}
          >
            <Button onClick={() => onHide && onHide()}>
              {t('public.copyInviteLink')}
            </Button>
          </CopyToClipboard>

          <a href={url} target="_blank">
            <Button
              onClick={() => {
                onHide && onHide()
              }}
            >
              {t('public.shareInviteLink')}
            </Button>
          </a>
        </div>
      }
    />
  )
}
