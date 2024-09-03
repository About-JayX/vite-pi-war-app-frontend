import Header from '@/app/components/header'
import { useTelegram } from '@/provider/telegram'
import { useAppDispatch } from '@/store/hook'
import { initData } from '@/utils/init'
import { Container } from '@material-ui/core'
import { PullRefresh, Toast } from 'react-vant'

export default function Box({ children }: { children?: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const { postData } = useTelegram()
  const onRefresh = async () => {
    try {
      await initData(dispatch, postData)
      Toast.success('刷新成功')
    } catch (error) {
      Toast.fail('刷新失败')
    }
  }
  return (
    <PullRefresh
      onRefresh={() => onRefresh()}
      onRefreshEnd={() => console.log('onRefreshEnd')}
    >
      <Container maxWidth="xl" className="p-4">
        <Header />
        {children}
      </Container>
    </PullRefresh>
  )
}
