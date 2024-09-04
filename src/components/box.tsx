import Header from '@/app/components/header'
import { Container } from '@material-ui/core'
import { PullRefresh, Toast } from 'react-vant'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/store/hook'
import { useTelegram } from '@/provider/telegram'
import { initData } from '@/utils/init'

export default function Box({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { postData } = useTelegram()
  const onRefresh = async () => {
    try {
      await initData(dispatch, postData)
      Toast.info(t('message.refresh.success'))
    } catch (error) {
      console.log(error, 'err_')
    }
  }
  return (
    <PullRefresh
      onRefresh={() => onRefresh()}
      onRefreshEnd={() => console.log('onRefreshEnd')}
      pullingText={() => t('message.refresh.pulling')}
      loosingText={t('message.refresh.release')}
      loadingText={t('message.refresh.loading')}
    >
      <Container maxWidth="xl" className="p-4">
        <Header />
        {children}
      </Container>
    </PullRefresh>
  )
}
