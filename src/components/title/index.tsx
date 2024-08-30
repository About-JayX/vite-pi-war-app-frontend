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
    <Title className={`!text-[1.26rem] ${className} relative pl-[10px]`}>
      {children}
      <img src="/HeaderTitle.png" className="absolute bottom-[-8px] left-0"/>
    </Title>
  );
};
