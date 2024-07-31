import "@/provider/i18n";
import { Fragment } from "preact/jsx-runtime";
import TelegramProvider from "@/provider/telegram";
import StoresProvider from "@/provider/store";

export default function Provider({ children }: { children?: React.ReactNode }) {
  return (
    <Fragment>
      
        
        <TelegramProvider>
        <StoresProvider>
          {children}
        </StoresProvider>
        </TelegramProvider>
      
    </Fragment>
  );
}
