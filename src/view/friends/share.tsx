import Button from "@/components/button";
import Modals from "@/components/modal";
import { useTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MessageSuccess } from "@/components/message";

export default function Share({
  url = "",
  open = false,
  onHide,
}: {
  url?: string;
  open?: boolean;
  onHide: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Modals
      title={t("public.invitedFriends")}
      open={open}
      onHide={onHide}
      body={
        <div className="grid w-full gap-2">
          <CopyToClipboard
            text={url}
            onCopy={() => MessageSuccess(t("message.copy.success"))}
          >
            <Button onClick={() => onHide && onHide()}>
              {t("public.copyInviteLink")}
            </Button>
          </CopyToClipboard>

          <a href={url} target="_blank">
            <Button onClick={() => onHide && onHide()}>
              {t("public.shareInviteLink")}
            </Button>
          </a>
        </div>
      }
    />
  );
}
