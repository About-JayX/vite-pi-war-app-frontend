import {
  SDKProvider,
  useMiniAppRaw,
  useViewportRaw,
  useSwipeBehaviorRaw,
} from "@telegram-apps/sdk-react";
import { createContext, Fragment } from "preact";
import { useContext, useEffect, useMemo, useState } from "preact/hooks";
import type { ITelegramUser, IWebApp } from "./type";

export const TelegramContext = createContext<{
  webApp?: IWebApp;
  user?: ITelegramUser;
  postData?: {
    initData: string;
    initDataUnsafe: {
      query_id: string;
      user: ITelegramUser;
      auth_date: string;
      hash: string;
    };
  };
}>({});

const initInfo = JSON.parse(import.meta.env.VITE_TELEGRAM_INFO || "{}");

export const Telegram = ({ children }: { children?: React.ReactNode }) => {
  const useViewport = useViewportRaw(true)?.result;
  const useMiniApp = useMiniAppRaw(true)?.result;
  const useSwipeBehavior = useSwipeBehaviorRaw(true)?.result;

  useEffect(() => {
    if (useViewport) {
      // 设置小程序Header颜色
      useMiniApp?.setHeaderColor("#141C2D");
      // 禁用小程序向下滑动
      useSwipeBehavior?.disableVerticalSwipe();
    }
  }, [useViewport, useMiniApp]);

  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    let app = (window as any).Telegram?.WebApp;
    app = { ...app, ...initInfo };
    if (app && app.ready) {
      app.setHeaderColor("#141C2D")
      app.ready();
      app.expand();
      setWebApp(app);
    }
  }, [scriptLoaded]);

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
      : {};
  }, [webApp]);
  return (
    <TelegramContext.Provider value={value}>
      <script
        src="https://telegram.org/js/telegram-web-app.js"
        async={true}
        onLoad={() => setScriptLoaded(true)}
      />
      {webApp ? children : <Fragment />}
    </TelegramContext.Provider>
  );
};

export default function TelegramProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <SDKProvider debug>
      <Telegram>{children}</Telegram>
    </SDKProvider>
  );
}

export const useTelegram = () => useContext(TelegramContext);
