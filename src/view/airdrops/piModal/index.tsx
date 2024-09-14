import { bindPidAPI, findCodeAPI } from "@/api/user";
import Button from "@/components/button";
import Icon from "@/components/icon";
import Input from "@/components/input";
import { MessageError, MessageSuccess } from "@/components/message";
import Modals from "@/components/modal";
import { Text } from "@/components/text";
import { Title } from "@/components/title";
import { useAppDispatch } from "@/store/hook";
import { updateBindStatus } from "@/store/user";
import { useRef, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";

export default function PiBrowserModal({
  open = false,
  onHide,
  bindStatus,
  getUrl,
}: {
  open?: boolean;
  bindStatus: any;
  onHide?: (status: boolean) => void;
  getUrl?: () => void;
}) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [input, setInput] = useState<string>("");
  const [codeStatus, setCodeStatus] = useState(false);
  const [status, setStatus] = useState(false);
  const inputRef = useRef<any>(null);
  const url: any = getUrl && getUrl();
  // const handlerMessage = (data: any) => {
  //   alert(JSON.stringify(data))

  //   const result = JSON.parse(data.data)
  //   if (result.eventType === 'clipboard_text_received') {
  //     let data = ''
  //     if (result.eventData && result.eventData.data) {
  //       data = result.eventData.data
  //     }
  //     setInput(data)
  //     MessageSuccess('粘贴成功_')
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener('message', handlerMessage)
  // }, [webApp])
  // const onPaste = async () => {
  //   webApp && webApp.readTextFromClipboard()
  // }

  const bindPid = async () => {
    setStatus(true);

    try {
      const result = await bindPidAPI({ code: bindStatus.Code, pid: input });

      if (result.success) {
        MessageSuccess(t("message.bind.success"));
        dispatch(updateBindStatus({ ...bindStatus, Pid: input }));
        setCodeStatus(false);
        onHide && onHide(false);
      } else {
        MessageError(t("message.bind.fail"));
      }
    } catch (error) {
      MessageError(t("message.bind.fail"));
    }
    setStatus(false);
  };
  return (
    <Modals
      open={open}
      onHide={() => {
        onHide && onHide(false);
        setInput("");
        setCodeStatus(false);
        setStatus(false);
      }}
      title={t("piModal.title")}
      body={
        <div className="grid gap-3 w-full items-center justify-items-center">
          {codeStatus ? (
            <div className="w-full grid gap-2 text-center">
              <Title className="!text-[1rem] !text-[#48B7F2]">
                {t("piModal.text")}
              </Title>
              <Text className="!font-normal">({input.trim()})</Text>
              <Button
                className="mt-[16px]"
                onClick={() => {
                  bindPid();
                }}
                loading={status}
              >
                {t("piModal.ok")}
              </Button>
            </div>
          ) : (
            <>
              <Text className="text-[#A7BBCA]">{t("piModal.bindText")}</Text>
              <Input
                ref={inputRef}
                value={bindStatus.Pid ? bindStatus.Pid : input}
                disabled={bindStatus.Pid || false}
                placeholder={t("public.bindingCode")}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
                button={{
                  text: t("public.bind"),
                  onClick: () => {
                    setCodeStatus(true);
                  },
                  show: Boolean(bindStatus.Pid ? bindStatus.Pid : input),
                }}
              />
              <div className="border-[#A7BBCA] border-1 border-dashed w-full border-x-0 border-b-0 opacity-50" />
              <a
                href={
                  url.startsWith("https://")
                    ? url.replace("https://", "pi://")
                    : url
                }
                target="_blank"
                className="w-full"
              >
                <Button>
                  {t("piModal.piText")} <Icon name="link" />
                </Button>
              </a>
            </>
          )}
        </div>
      }
    />
  );
}
