// import {
//   SDKProvider,
//   useMiniAppRaw,
//   useViewportRaw,
// } from "@telegram-apps/sdk-react";
import { createContext, Fragment } from 'preact'
import { useContext, useEffect, useMemo, useState } from 'preact/hooks'
import type { ITelegramUser, IWebApp } from '@/provider/telegram/type'

export const TelegramContext = createContext<{
  webApp?: IWebApp
  user?: ITelegramUser
  postData?: {
    initData: string
    initDataUnsafe: {
      query_id: string
      user: ITelegramUser
      auth_date: string
      hash: string
    }
  }
}>({})

const initInfo = import.meta.env.DEV
  ? {
      initData:
        'user=%7B%22id%22%3A6350461487%2C%22first_name%22%3A%22Jay%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22About_JayX%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-7615271304887599165&chat_type=sender&auth_date=1725022377&hash=d8639ddd57693a20424044759f917c337e26bd9858ecfac3b07d221c3930a2be',
      initDataUnsafe: {
        user: {
          id: 6350461487,
          first_name: 'Jay',
          last_name: '',
          username: 'About_JayX',
          language_code: 'zh-hans',
          allows_write_to_pm: true,
        },
        chat_instance: '-7615271304887599165',
        chat_type: 'sender',
        auth_date: '1725022377',
        hash: 'd8639ddd57693a20424044759f917c337e26bd9858ecfac3b07d221c3930a2be',
      },
    }
  : {}

export const Telegram = ({ children }: { children?: React.ReactNode }) => {
  // const useViewport = useViewportRaw(true)?.result;
  // const useMiniApp = useMiniAppRaw(true)?.result;

  const [webApp, setWebApp] = useState<IWebApp | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // useEffect(() => {
  //   if (useViewport) {
  //     useMiniApp?.setHeaderColor("#000000");
  //     useMiniApp?.setBgColor("#000000");
  //   }
  // }, [useViewport, useMiniApp]);

  useEffect(() => {
    let app = (window as any).Telegram?.WebApp

    app = { ...app, ...initInfo } //测试

    if (app) {
      // app.requestWriteAccess()
      // app.setBackgroundColor('#000000')
      // app.setHeaderColor('#000000')
      app.ready()
      app.expand()

      const container: any = document.querySelector('.html')

      container.addEventListener('scroll', () => {
        app.expand() // 确保窗口始终固定
      })
      setWebApp(app)
    }
  }, [scriptLoaded])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          user: webApp.initDataUnsafe.user,
          postData: {
            initData: webApp.initData,
            initDataUnsafe: webApp.initDataUnsafe,
          },
        }
      : {}
  }, [webApp])

  return (
    <Fragment>
      <TelegramContext.Provider value={value}>
        <script
          src="https://telegram.org/js/telegram-web-app.js"
          async={true}
          onLoad={() => setScriptLoaded(true)}
        />
        {webApp ? children : <Fragment />}
      </TelegramContext.Provider>
    </Fragment>
  )
}

export default function TelegramProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  return <Telegram>{children}</Telegram>
}

export const useTelegram = () => useContext(TelegramContext)
