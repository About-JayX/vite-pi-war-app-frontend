import Button from '@/components/button'
import Modals from '@/components/modal'
import { useTranslation } from 'react-i18next'
import { MessageSuccess } from '@/components/message'
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
  const { telegramUserData } = useAppSelector((state) => state.user)

  const handleCopyInviteLink = async () => {
    const inviteLink = `https://t.me/${import.meta.env.VITE_BOOTNAME}/?startapp=${telegramUserData.Invitation_code}\n\n${t('friends.inviteText')}`

    try {
      await navigator.clipboard.writeText(inviteLink)
      MessageSuccess(t('message.copy.success'))
      onHide && onHide()
    } catch (err) {
      console.error('Failed to copy text: ', err)
      // Fallback: manually select and copy the text (for older browsers)
      const textArea = document.createElement('textarea')
      textArea.value = inviteLink
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        MessageSuccess(t('message.copy.success'))
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err)
      }
      document.body.removeChild(textArea)
      onHide && onHide()
    }
  }

  return (
    <Modals
      title={t('public.invitedFriends')}
      open={open}
      onHide={onHide}
      body={
        <div className="grid w-full gap-2">
          <Button onClick={handleCopyInviteLink}>
            {t('public.copyInviteLink')}
          </Button>

          <a href={url} target="_blank" rel="noopener noreferrer">
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
