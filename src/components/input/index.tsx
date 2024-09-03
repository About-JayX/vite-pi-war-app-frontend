import { MessageSuccess } from "../message";
import { Text } from "../text";
import "./index.css";
import { useTranslation } from "react-i18next";
export default function Input({
  button = { show: true },
  value,
  placeholder,
  disabled = false,
  background = "",
  onChange = () => {},
}: {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  background?: string;
  onChange?: (event: any) => void;
  button?: {
    text?: React.ReactNode;
    copy?: boolean;
    copyText?: string;
    onClick?: () => void;
    show?: boolean;
    className?: string;
  };
}) {
  const { t } = useTranslation();

  const handleCopyInviteLink = async (url: string) => {
    const inviteLink = url;

    try {
      await navigator.clipboard.writeText(inviteLink);
      MessageSuccess(t("message.copy.success"));
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback: manually select and copy the text (for older browsers)
      const textArea = document.createElement("textarea");
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        MessageSuccess(t("message.copy.success"));
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };
  return (
    <div
      className="input-group relative form-control !grid"
      style={{
        gridAutoFlow: "column",
        gridAutoColumns: "1fr auto",
        background: background,
        gap: "1rem",
      }}
    >
      <input
        disabled={disabled}
        className="border-0 bg-transparent outline-none !border-transparent text-[0.86rem] font-bold"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event);
        }}
      />
      {button && button.show ? (
        button.copy ? (
          <button
            className="transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-[1.12]"
            onClick={() => handleCopyInviteLink(button?.copyText || "")}
          >
            <Text>{button?.text}</Text>
          </button>
        ) : (
          <button
            className="transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-[1.12]"
            onClick={() => button.onClick && button.onClick()}
          >
            <Text>{button?.text}</Text>
          </button>
        )
      ) : (
        ""
      )}
    </div>
  );
}
