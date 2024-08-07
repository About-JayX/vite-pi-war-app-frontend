import Input from '@/components/input'
import { Text } from '@/components/text'
import { Title } from '@/components/title'
import { useTelegram } from '@/provider/telegram'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { Container } from '@material-ui/core'
import { useEffect, useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import api from '@/api'
import { updateBindStatus } from '@/store/user'
import { MessageSuccess } from '@/components/message'
import './index.css'
import Wallet from './wallet'
import Segmented from '@/components/segmented'
import Button from '@/components/button'
import Icon from '@/components/icon'
import SuccessPng from '@/assets/icon/success.png'
import SuccessaPng from '@/assets/icon/success-a.png'
import { FaRegPaste } from 'react-icons/fa6'

export default function Airdrops() {
  const { t } = useTranslation()
  // const { uid } = props?.searchParams
  const {  postData } = useTelegram()
  const [bindingMethod, setBindingMethod] = useState<string>('Solana')
  const [input, setInput] = useState<string>('')
  const { bindStatus, userReward } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const [walletOpen, setWalletOpen] = useState(false)

  const [_bdLog, setBdLog] = useState([])

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
    let url
    let type
    if (bindingMethod === 'Solana') {
      url = (bindStatus.sol && bindStatus.sol.Link) || ''
      type = 'solana'
    } else if (bindingMethod === 'ETH/BSC') {
      url = (bindStatus.erc && bindStatus.erc.Link) || ''
      type = 'erc20'
    }
    return api.user.bindWallentAPI(type, url)
  }
  const getAddress = () => {
    const data = bindingMethod === 'Solana' ? bindStatus.sol : bindStatus.erc

    return data && data.Address ? data.Address : {}
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
  const bindPid = async () => {
    if (!postData) return
    const data = {
      pid: input,
      ...postData,
    }
    await api.user.bindPidAPI(data)
    const bindPid = await api.user.findPidAPI(postData)
    const ercAddress = await api.user.findAddressAPI({
      ...postData,
      type: 'erc20',
    })
    const solAddress = await api.user.findAddressAPI({
      ...postData,
      type: 'solana',
    })
    const bindStatus = {
      pid: bindPid.data || null,
      erc: ercAddress.data || null,
      sol: solAddress.data || null,
    }
    dispatch(updateBindStatus(bindStatus))
    MessageSuccess('Bind Success')
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
      <Wallet open={walletOpen} setWalletOpen={setWalletOpen} getUrl={getUrl} />
      <Container maxWidth="xl" className="p-4">
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
            placeholder={`192.168.1.116:3000/${
              sessionStorage.getItem('token') || ''
            }`}
            disabled
            background="#030915"
            button={{
              text: t('public.copy'),
              copy: true,
              show: true,
              copyText: `192.168.1.116:3000/${
                sessionStorage.getItem('token') || ''
              }`,
            }}
          />
          <div className="card !p-4 !pt-6 !pb-6 grid gap-3 w-100 binding-card-bg bg-transparent">
            <Segmented
              value={bindingMethod}
              onChange={e => setBindingMethod(e)}
              data={[
                { label: 'SOL', value: 'Solana' },
                { label: 'ETH/BSC', value: 'ETH/BSC' },
                { label: 'Pi NET', value: 'PiBrowser' },
              ]}
            />
            {bindingMethod === 'Solana' || bindingMethod === 'ETH/BSC' ? (
              <div className="bind-wallet">
                <div className="bind-wallet-container">
                  {bindingMethod === 'Solana' ? (
                    <Icon name="sol" />
                  ) : (
                    <Icon name="wallet" />
                  )}
                  <Text
                    click={() => {
                      getAddress().address ? null : setWalletOpen(true)
                    }}
                  >
                    {getAddress().address
                      ? ellipsisMiddle(getAddress().address, 9)
                      : '绑定钱包'}
                  </Text>
                  {getAddress().address ? (
                    <img src={SuccessaPng} alt="" />
                  ) : (
                    <img src={SuccessPng} alt="" />
                  )}
                </div>
              </div>
            ) : (
              <>
                <Input
                  value={
                    bindStatus.pid && bindStatus.pid.pId
                      ? bindStatus.pid.pId
                      : input
                  }
                  disabled={(bindStatus.pid && bindStatus.pid.pId) || false}
                  placeholder="Binding Code"
                  onChange={event => {
                    setInput(event.target.value)
                  }}
                  button={{
                    text: <FaRegPaste />,
                    onClick: () => onPaste(),
                    show: !(bindStatus.pid && bindStatus.pid.pId),
                  }}
                />
                {bindStatus.pid && bindStatus.pid.pId ? (
                  ''
                ) : (
                  <Button className="rounded-full" onClick={bindPid}>
                    {t('binding.bindPiNetwork')}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
