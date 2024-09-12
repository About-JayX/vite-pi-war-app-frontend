import { bindPidAPI, findCodeAPI } from '@/api/user'
import Button from '@/components/button'
import Icon from '@/components/icon'
import Input from '@/components/input'
import { MessageError, MessageSuccess } from '@/components/message'
import Modals from '@/components/modal'
import { Text } from '@/components/text'
import { Title } from '@/components/title'
import { useTelegram } from '@/provider/telegram'
import { useAppDispatch } from '@/store/hook'
import { updateBindStatus } from '@/store/user'
import { useEffect, useState } from 'preact/hooks'
import { useTranslation } from 'react-i18next'
import { FaRegPaste } from 'react-icons/fa6'

export default function PiBrowserModal({
  open = false,
  onHide,
  bindStatus,
  getUrl,
}: {
  open?: boolean
  bindStatus: any
  onHide?: (status: boolean) => void
  getUrl?: () => void
}) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [input, setInput] = useState<string>('')
  const [load, setLoad] = useState(false)
  const [codeStatus, setCodeStatus] = useState(false)
  const [status, setStatus] = useState(false)
  const { webApp } = useTelegram() as any
  const url: any = getUrl && getUrl()

  const onPaste = async () => {
    setLoad(true)
    try {
      webApp &&
        webApp
          .readTextFromClipboard((a: any, b: any, c: any, d: any) => {
            console.log(a, b, c, d, 'data')
          })
          .then((res: any) => {
            console.log(res, 'res_')
          })

      // if (!tSolAddress.test(pastedText)) {
      //   MessageError("Binding Success");
      // }
      // 进行你需要的操作，例如更新状态或执行其他逻辑
    } catch (err) {
      console.log(err, 'err_')

      MessageSuccess(err as string)
      // 处理错误情况，例如显示用户提示或执行备用方案
    }
    setLoad(false)
  }

  const bindPid = async () => {
    setStatus(true)

    try {
      const result = await bindPidAPI({ code: bindStatus.Code, pid: input })

      if (result.success) {
        MessageSuccess(t('message.bind.success'))
        dispatch(updateBindStatus({ ...bindStatus, Pid: input }))
        setCodeStatus(false)
        onHide && onHide(false)
      } else {
        MessageError(t('message.bind.fail'))
      }
    } catch (error) {
      MessageError(t('message.bind.fail'))
    }
    setStatus(false)
  }
  return (
    <Modals
      open={open}
      onHide={() => {
        onHide && onHide(false)
        setInput('')
        setLoad(false)
        setCodeStatus(false)
        setStatus(false)
      }}
      title={t('piModal.title')}
      body={
        <div className="grid gap-4 w-full items-center justify-items-center">
          {codeStatus ? (
            <div className="w-full grid gap-2 text-center">
              <Title className="!text-[1rem] !text-[#48B7F2]">
                {t('piModal.text')}
              </Title>
              <Text className="!font-normal">({input.trim()})</Text>
              <Button
                className="mt-[16px]"
                onClick={() => {
                  bindPid()
                }}
                loading={status}
              >
                {t('piModal.ok')}
              </Button>
            </div>
          ) : (
            <>
              <Text className="text-[#A7BBCA]">
                {t('piModal.bindFunction1')}
              </Text>
              <a
                href={
                  url.startsWith('https://')
                    ? url.replace('https://', 'pi://')
                    : url
                }
                target="_blank"
              >
                <Text
                  className="items-center text-[#48B7F2]"
                  style={{ display: 'block' }}
                >
                  {t('piModal.piText')} <Icon name="link" />
                </Text>
              </a>
              <div className="border-[#A7BBCA] border-1 border-dashed w-full border-x-0 border-b-0 opacity-50" />
              <Text className="text-[#A7BBCA]">
                {t('piModal.bindFunction2')}
              </Text>
              <Input
                value={bindStatus.Pid ? bindStatus.Pid : input}
                disabled={bindStatus.Pid || false}
                placeholder={t('public.bindingCode')}
                onChange={event => {
                  setInput(event.target.value)
                }}
                button={{
                  text: load ? (
                    <div className="loader w-4 h-4" />
                  ) : (
                    <FaRegPaste />
                  ),
                  onClick: () => onPaste(),
                  show: true,
                  // !bindStatus.Pid
                }}
              />
              <Button
                onClick={() => {
                  setCodeStatus(true)
                }}
              >
                {t('public.bind')}
              </Button>
            </>
          )}
        </div>
      }
    />
  )
}
