import { Text } from "@/components/text";
import { HeaderTitle } from "@/components/title";
// import Modal from 'react-bootstrap/Modal'
// import './index.css'
import { MessageSuccess } from "@/components/message";
import { useTranslation } from "react-i18next";
import Modal from "@/components/modal";
export default function Wallet({
  open = false,
  setWalletOpen,
  getUrl,
}: {
  open?: boolean;
  setWalletOpen: (status: boolean) => void;
  getUrl: () => string;
}) {
  const { t } = useTranslation();
  const swapList = [
    {
      text: "OKX",
      src: "/okx.png",
      click: () => {
        const deepLink =
          "okx://wallet/dapp/url?dappUrl=" + encodeURIComponent(getUrl());
        const encodedUrl =
          "https://www.okx.com/download?deeplink=" +
          encodeURIComponent(deepLink);
        window.open(encodedUrl);
      },
    },
    {
      text: "MateMask",
      src: "/metamask.png",
      click: () => {
        window.open(
          `https://metamask.app.link/dapp/${getUrl().replace("https://", "")}`
        );
      },
    },
    {
      text: "Bitget",
      src: "/bitget.png",
      click: () => {
        window.open(`https://bkcode.vip?action=dapp&url=${getUrl()}`);
      },
    },
    {
      text: "phantom",
      src: "/phantom.png",
      click: () => {
        console.log(
          encodeURIComponent(getUrl()),
          "encodeURIComponent(getUrl())"
        );

        window.open(
          `https://phantom.app/ul/browse/${encodeURIComponent(
            getUrl()
          )}?ref=${encodeURIComponent(getUrl())}`
        );
      },
    },
    {
      text: "TP",
      src: "/tp.png",
      click: () => {
        const urlData = {
          url: getUrl(),
          chain: "",
          source: "",
        };
        const url = encodeURIComponent(JSON.stringify(urlData));
        window.open(`tpdapp://open?params=${url}`);
      },
    },
    {
      text: "copy",
      src: "/copy.png",
      click: () => {
        navigator.clipboard.writeText(getUrl());
        MessageSuccess(t("message.copy.success"));
      },
    },
  ];
  return (
    <Modal
      open={open}
      onHide={() => setWalletOpen(false)}
      body={
        <div className="grid w-full text-center gap-6">
          <HeaderTitle>{t("wallet.title")}</HeaderTitle>
          <Text className="mt-[-1rem]">{t("wallet.text")}</Text>
          <div className="flex w-full gap-6 overflow-x-auto">
            {swapList.map((item, index) => (
              <div
                key={index}
                className="grid gap-1 w-min"
                onClick={() => item.click && item.click()}
              >
                <div className="w-[3.75rem] h-[3.75rem]">
                  <img src={item.src} alt="" className=" rounded" />
                </div>
                <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {item.text}
                </Text>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
