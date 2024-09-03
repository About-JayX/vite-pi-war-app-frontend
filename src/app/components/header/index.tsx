import Icon from "@/components/icon";
import locales from "@/config/locale";
import i18n from "i18next";
import { Text } from "@/components/text";
import { useState } from "preact/hooks";
import Modal from "react-bootstrap/Modal";
import { Title } from "@/components/title";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal show={open} centered onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Title className="!text-[16px]">
            {Object.entries(locales).map(
              ([key, value]: any) =>
                key === i18n.language && value.translation.lang
            )}
          </Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid  grid-cols-[repeat(3,1fr)] gap-4 text-center">
            {Object.entries(locales).map(([key, value]: any) => (
              <a
                key={key}
                onClick={() => {
                  i18n.changeLanguage(key);
                  setOpen(false);
                }}
              >
                <Text
                  className={`${
                    key === i18n.language ? "text-white" : "text-white/50"
                  }`}
                >
                  {value.translation.language}
                </Text>
              </a>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      <div className="!flex !flex-row self-center">
        <div className="flex-grow" />
        <div
          className="flex gap-1"
          style={{ alignItems: "center" }}
          onClick={() => setOpen(true)}
        >
          <Icon name="lang" className="w-5 h-5" />
          <Text className="!text-[14px]">
            {Object.entries(locales).map(
              ([key, value]: any) =>
                key === i18n.language && value.translation.lang
            )}
          </Text>
        </div>
      </div>
    </>
  );
}
