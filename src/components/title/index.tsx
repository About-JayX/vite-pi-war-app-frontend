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
    <Title
      className={`!text-[18px] ${className} relative pl-[10px] text-[#48B7F2] font-normal`}
    >
      {children}
      <svg
        width="207"
        height="12"
        viewBox="0 0 207 12"
        fill="none"
        className="ml-[-10px]"
      >
        <rect width="207" height="12" fill="url(#pattern0_631_1292)" />
        <defs>
          <pattern
            id="pattern0_631_1292"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_631_1292"
              transform="matrix(0.00311526 0 0 0.0537383 0 -0.010514)"
            />
          </pattern>
          <image
            id="image0_631_1292"
            width="321"
            height="19"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUEAAAATCAYAAAAOP795AAAACXBIWXMAAAsTAAALEwEAmpwYAAABHklEQVR4nO3bO27CQBRA0Wuh1HQ0CCkdLQ09KyBZQqizCMxO2AeNkxWwijTp09BQIAuI+fiDGNlzT2VZLl51NU8jJ6PpPAWWnEuBFZLUcb3+cJwBCTA7eZ8/fz15Hkl6ql5/OAbIMISSIpRHEAyhpAidRhAMoaTI/I8gGEJJEbkUQTCEkiJxLYJgCCVF4FYEwRBK6rh7EQRDKKnDktF0XvbblOKfJVIZa+AT+As8h1RQ5iSYyyieCKUyJsAbh83hN+wo0rkqEQRDqPoGwAL4AbZhR5GOqkYQDKHqewHegVdgA+xCDiNBvQiCIVQzEw7r8TeuxwqsbgTBEKqZAfCB67ECq3I7fE2Kt8aSWqrJSTCX4YlQUks9IoJgCCW11B6RNjEXAkT6+QAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    </Title>
  );
};
