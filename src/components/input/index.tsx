import { MessageSuccess } from '../message'
import { Text } from '../text'
import './index.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
export default function Input({
  button = { show: true },
  value,
  placeholder,
  disabled = false,
  background = '',
  onChange = () => {},
}: {
  value?: string
  placeholder?: string
  disabled?: boolean
  background?: string
  onChange?: (event: any) => void
  button?: {
    text?: string
    copy?: boolean
    copyText?: string
    onClick?: () => void
    show?: boolean
  }
}) {
  const { t } = useTranslation()
  return (
    <div
      className="input-group relative form-control !grid"
      style={{
        gridAutoFlow: 'column',
        gridAutoColumns: '1fr auto',
        background: background,
        gap:'1rem'
      }}
    >
      <input
        disabled={disabled}
        className="border-0 bg-transparent outline-none !border-transparent text-[0.86rem] font-bold"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={event => {
          onChange(event)
        }}
      />
      {button && button.show ? (
        button.copy ? (
          <CopyToClipboard
            text={button?.copyText || ''}
            onCopy={() => MessageSuccess(t('message.copy.success'))}
          >
            <button>
              <Text>{button?.text}</Text>
            </button>
          </CopyToClipboard>
        ) : (
          <button onClick={() => button.onClick && button.onClick()}>
            <Text>{button?.text}</Text>
          </button>
        )
      ) : (
        ''
      )}
    </div>
  )
}
