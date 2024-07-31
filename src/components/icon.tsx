export default function Icon({
  name = "",
}: {
  prefix?: string;
  name: string;
  color?: string;
}) {
  return (
    <svg class="w-4 h-4" aria-hidden={true}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
}
