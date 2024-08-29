"use client";
import { Text } from "../text";
import "./index.css";

const BntBox = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`h-[48px] w-full min-w-[90px] flex relative ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <svg
        width="16"
        height="48"
        viewBox="0 0 16 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="16" height="48" fill="url(#pattern0_18_24)" />
        <defs>
          <pattern
            id="pattern0_18_24"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_18_24"
              transform="scale(0.015625 0.00520833)"
            />
          </pattern>
          <image
            id="image0_18_24"
            width="530"
            height="192"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>

      <div className="w-[calc(100%-32px)] h-[48px] relative">
        <div className="absolute top-0 left-[-1px] h-full bg-[#4ab9f2] w-[calc(100%+2px)]"></div>
      </div>
      <svg
        width="16"
        height="48"
        viewBox="0 0 16 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="16" height="48" fill="url(#pattern0_18_25)" />
        <defs>
          <pattern
            id="pattern0_18_25"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_18_25"
              transform="matrix(0.0154639 0 0 0.00520833 -7.19588 0)"
            />
          </pattern>
          <image
            id="image0_18_25"
            width="530"
            height="192"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
      <div className="absolute w-full h-[42px] p-1">
        <div className="flex">
          <svg width="14" height="42" viewBox="0 0 14 42" fill="none">
            <rect width="14" height="42" fill="url(#pattern0_23_6)" />
            <defs>
              <pattern
                id="pattern0_23_6"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_23_6"
                  transform="scale(0.015625 0.00520833)"
                />
              </pattern>
              <image
                id="image0_23_6"
                width="530"
                height="192"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>

          <div className="w-[calc(100%-28px)] h-[42px] relative">
            <div className="absolute top-0 left-[-1px] h-full bg-[#035cad] w-[calc(100%+2px)]"></div>
          </div>
          <svg
            width="14"
            height="42"
            viewBox="0 0 14 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="14" height="42" fill="url(#pattern0_23_7)" />
            <defs>
              <pattern
                id="pattern0_23_7"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_23_7"
                  transform="matrix(0.0172414 0 0 0.00520833 -8.13793 0)"
                />
              </pattern>
              <image
                id="image0_23_7"
                width="530"
                height="192"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute w-full h-full p-2 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <BntBox onClick={onClick} className={className} disabled={disabled}>
      {children}
    </BntBox>
  );
}
