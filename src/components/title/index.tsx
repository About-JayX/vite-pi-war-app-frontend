export const Title = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={`text-[2.6rem] z-1 font-bold ${className}`}>
      {children}
    </span>
  );
};

export const HeaderTitle = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Title className={`!text-[1.36rem] ${className}`}>
      {children}
    </Title>
  );
};
