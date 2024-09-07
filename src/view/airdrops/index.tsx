import Input from '@/components/input'
import { Text } from '@/components/text'
import { HeaderTitle, Title } from '@/components/title'
import { useAppSelector } from '@/store/hook'
import { Container } from '@material-ui/core'
import { useEffect, useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import api from '@/api'
import './index.css'
import Wallet from './wallet'
import Segmented from '@/components/segmented'
import Icon from '@/components/icon'
import SuccessPng from '@/assets/icon/success.png'
import SuccessaPng from '@/assets/icon/success-a.png'
import { semicolon } from '@/utils'
import { FaRegPaste } from 'react-icons/fa6'
import Button from '@/components/button'
import Loader from '@/components/loader'
import Box from '@/components/box'

export default function Airdrops() {
  const { t } = useTranslation()
  // const { uid } = props?.searchParams
  const [bindingMethod, setBindingMethod] = useState<string>('Solana')
  const [input, setInput] = useState<string>('')
  const { bindStatus, userReward } = useAppSelector(state => state.user)
  const [walletOpen, setWalletOpen] = useState(false)
  const [bdLog, setBdLog] = useState([])

  useEffect(() => {
    if (Object.keys(userReward).length) {
      console.log(userReward.activityLogs)

      setBdLog(
        userReward.activityLogs.filter((item: any) =>
          item.key.includes('Binding')
        )
      )
    }
  }, [userReward])
  const getUrl = () => {
    return api.user.bindWallentAPI(bindStatus.Code || '')
  }
  const getAddress = () => {
    return bindingMethod === 'Solana' ? bindStatus.Sonala : bindStatus.Erc20
  }
  const onPaste = async () => {
    try {
      const pastedText = await navigator.clipboard.readText()

      setInput(pastedText)

      // if (!tSolAddress.test(pastedText)) {
      //   MessageError("Binding Success");
      // }
      // 进行你需要的操作，例如更新状态或执行其他逻辑
    } catch (err) {
      console.error('Failed to read clipboard contents:', err)
      // 处理错误情况，例如显示用户提示或执行备用方案
    }
  }

  const ellipsisMiddle = (
    text: string,
    maxLength: number,
    mimLength?: number
  ): string => {
    if (text?.length > maxLength + 6) {
      return (
        text?.slice(0, maxLength) +
        '...' +
        text?.slice(text?.length - (mimLength || maxLength))
      )
    } else {
      return text
    }
  }

  return (
    <>
      <Wallet
        open={walletOpen}
        setWalletOpen={setWalletOpen}
        getUrl={getUrl}
        bindingMethod={bindingMethod}
      />
      <Box>
        <div className="grid gap-6 w-100 justify-items-center text-center">
          <Title>{t('public.airdrops')}</Title>
          <Text className="text-color mt-[-1rem]">{t('binding.text')}</Text>
          <Text
            className="mt-[-1rem] mb-[-1rem] text-[1rem]"
            style={{ color: '#0E8EF4' }}
          >
            {t('binding.bindingTipsText')}
          </Text>
          <Input
            placeholder={`${getUrl()}`}
            disabled
            background="#030915"
            button={{
              text: t('public.copy'),
              copy: true,
              show: true,
              copyText: `${getUrl()}`,
            }}
          />
          <div className="card !p-4 !pt-6 !pb-6 grid gap-3 w-100 binding-card-bg bg-transparent">
            <Segmented
              value={bindingMethod}
              onChange={e => setBindingMethod(e)}
              data={[
                { label: 'SOL', value: 'Solana' },
                { label: 'ETH/BSC', value: 'ETH/BSC' },
                { label: 'Pi', value: 'PiBrowser' },
              ]}
            />
            {bindingMethod === 'Solana' || bindingMethod === 'ETH/BSC' ? (
              getAddress() ? (
                <div className="bind-wallet">
                  <div className="bind-wallet-container">
                    {bindingMethod === 'Solana' ? (
                      <Icon name="sol" />
                    ) : (
                      <Icon name="wallet" />
                    )}
                    <Text>
                      {getAddress() && ellipsisMiddle(getAddress(), 9)}
                    </Text>
                    {getAddress() ? (
                      <img src={SuccessaPng} alt="" />
                    ) : (
                      <img src={SuccessPng} alt="" />
                    )}
                  </div>
                </div>
              ) : (
                <Button onClick={() => setWalletOpen(true)}>
                  {t('public.bindWallet')}
                </Button>
              )
            ) : (
              <>
                <Input
                  value={bindStatus.Pid ? bindStatus.Pid : input}
                  disabled={bindStatus.Pid || false}
                  placeholder={t('public.bindingCode')}
                  onChange={event => {
                    setInput(event.target.value)
                  }}
                  button={{
                    text: <FaRegPaste />,
                    onClick: () => onPaste(),
                    show: !bindStatus.Pid,
                  }}
                />
              </>
            )}
          </div>
          <HeaderTitle className="text-left w-100">
            {t('public.tasks')}
          </HeaderTitle>
          {bdLog.length
            ? bdLog.map((item: any) => (
                <div className="flex w-100 justify-between mt-[-1rem]">
                  <div className="self-center flex gap-3">
                    <div className="grid self-center">
                      <Text>
                        {item.key === 'Erc20 Wallet Binding' &&
                          t('public.erc20WalletBinding')}
                        {item.key === 'Solana Wallet Binding' &&
                          t('public.solanaWalletBinding')}
                      </Text>
                    </div>
                  </div>
                  <Text className="self-center">
                    +{semicolon(item.value)} PIS
                  </Text>
                </div>
              ))
            : ''}
        </div>
        <Loader />
      </Box>
    </>
  )
}
