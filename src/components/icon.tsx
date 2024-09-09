export default function Icon({
  name = "",
  className = "",
  onClick,
}: {
  prefix?: string;
  name: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      aria-hidden={true}
      onClick={onClick}
      style={{ display: "inline-block" }}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
}
