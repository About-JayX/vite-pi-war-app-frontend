import Modal from "react-bootstrap/Modal";
import "./index.css";
import { useState } from "preact/hooks";
export default function Modals({
  open = false,
  title = "",
  body,
}: {
  open?: boolean;
  body?: React.ReactNode;
  title?: string | React.ReactNode;
}) {
  const [opens, setOpens] = useState<boolean>(open || false);
  return (
    <Modal show={opens} onHide={() => setOpens(false)} centered>
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
}
