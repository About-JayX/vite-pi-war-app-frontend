import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Message: React.FC = () => {
  return <ToastContainer position="top-center" autoClose={3000} theme="dark" draggable={false} />;
};

export const showToast = (
  message: string,
  type?: "success" | "error" | "warning" | "info"
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast(message);
  }
};

export const MessageSuccess = (message: string) => {
  return showToast(message, "success");
};

export const MessageError = (message: string) => {
  return showToast(message, "error");
};

export const MessageWarning = (message: string) => {
  return showToast(message, "warning");
};

export const MessageInfo = (message: string) => {
  return showToast(message, "info");
};

export default Message;
