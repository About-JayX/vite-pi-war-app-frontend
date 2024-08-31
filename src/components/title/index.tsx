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
    <Title className={`!text-[18px] ${className} relative pl-[10px] text-[#48B7F2] font-normal`}>
      {children}
      <img src="/HeaderTitle.png" className="ml-[-10px]"/>
    </Title>
  );
};
