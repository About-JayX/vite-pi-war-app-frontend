import Modal from "react-bootstrap/Modal";
import "./index.css";
import { useEffect, useState } from "preact/hooks";
export default function Modals({
  open = false,
  title = "",
  body,
  onHide,
}: {
  open?: boolean;
  body?: React.ReactNode;
  title?: string | React.ReactNode;
  onHide?: () => void;
}) {
  const [opens, setOpens] = useState<boolean>(false);

  useEffect(() => {
    setOpens(open);
  }, [open]);

  return (
    <Modal
      show={opens}
      onHide={() => {
        onHide && onHide();
        setOpens(false);
      }}
      centered
    >
      <Modal.Header closeButton className="text-[16px]">{title}</Modal.Header>
      <Modal.Body className="grid justify-items-center">{body}</Modal.Body>
    </Modal>
  );
}
