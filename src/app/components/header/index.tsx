import Icon from "@/components/icon";
import locales from "@/config/locale";
import i18n from "i18next";
import { Text } from "@/components/text";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import { useState } from "preact/hooks";
import Modal from "react-bootstrap/Modal";
import { Title } from "@/components/title";

export const HeaderBox = styled.div`
  height: 100vh;
  gap: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.36);
  backdrop-filter: saturate(180%) blur(8px);
  -webkit-backdrop-filter: saturate(180%) blur(8px);
  transition: all 0.3s ease-out;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 999;
  .Collapse {
    width: 100%;
  }
`;

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
      <div className="!flex !flex-row !h-[4rem] !bg-transparent !backdrop-blur-[0] sticky top-0 z-[9] !transition-none !opacity-100">
        <Container
          maxWidth="xl"
          className="p-4 pt-0 pb-0 !flex !flex-row self-center"
        >
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
        </Container>
      </div>
    </>
  );
}
