import Button from "@/components/button";
import Modals from "@/components/modal";
import { Text } from "@/components/text";
import { Title } from "@/components/title";
import { useTranslation } from "react-i18next";

export default function PiModal({
  open = false,
  onHide,
}: {
  open?: boolean;
  onHide?: (status: boolean) => void;
}) {
  const { t } = useTranslation();
  return (
    <Modals
      open={open}
      onHide={() => onHide && onHide(false)}
      title={t("piModal.title")}
      body={
        <div className="w-full grid gap-2 text-center">
          <Title className="!text-[1rem] !text-[#48B7F2]">
            {t("piModal.text")}
          </Title>
          <Text className="!font-normal">(20xd2111d2f15465464656)</Text>
          <Button className="mt-[16px]">{t("piModal.ok")}</Button>
        </div>
      }
    />
  );
}
