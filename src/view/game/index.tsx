import Icon from "@/components/icon";
import { Text } from "@/components/text";
import { Container } from "@material-ui/core";
import { useState } from "preact/hooks";
import { checkInText } from "./checkIn";
import { HeaderTitle } from "@/components/title";
import Button from "@/components/button";
import CheckIn from "./checkIns";

const UserBox = () => {
  const Crystal = () => {
    return (
      <svg
        width="110"
        height="40"
        viewBox="0 0 110 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="100"
          height="32.5"
          transform="matrix(1 0 0 -1 0 32.5)"
          fill="url(#pattern0_1240_1239)"
          y="-2"
          x="10"
        />
        <defs>
          <pattern
            id="pattern0_1240_1239"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_1240_1239"
              transform="matrix(0.00346724 0 0 0.0121951 -0.00621712 0)"
            />
          </pattern>
          <image
            id="image0_1240_1239"
            width="292"
            height="80"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
        <image
          x="2.5"
          y="-2.5"
          className="w-[30px] h-[40px]"
          preserveAspectRatio="xMidYMid slice"
          xlinkHref={`/game/crystal.png`}
        />
        <image
          x="14"
          y="19"
          className="w-[20px] h-[20px]"
          preserveAspectRatio="xMidYMid slice"
          xlinkHref={`/game/add-crystal.png`}
        />
        <foreignObject
          width="60"
          height="100%"
          x="36"
          y="6.5"
          className="truncate text-center"
        >
          <Text className="text-[14px] font-medium">999,999</Text>
        </foreignObject>
      </svg>
    );
  };

  const Experience = ({ value = 0 }: { value?: number }) => {
    return (
      <svg width="124" height="9" viewBox="0 0 124 9" className="mt-[1px]">
        <rect
          x="0.5"
          y="0.5"
          width="123"
          height="8"
          rx="1.5"
          stroke="#266395"
        />
        <rect
          x="0.5"
          y="0.5"
          width="123"
          height="8"
          rx="1.5"
          stroke="#266395"
        />
        <rect
          x="0.5"
          y="0.5"
          width="123"
          height="8"
          rx="1.5"
          stroke="#266395"
        />
        <rect
          x="2"
          y="2"
          width={`calc(${value}% - 4px)`}
          height="5"
          rx="1"
          fill="url(#paint0_linear_1282_1393)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1282_1393"
            x1="2"
            y1="4.5"
            x2={`calc(${value}% - 4px)`}
            y2="4.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.9" stop-color="#48B7F2" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
        </defs>
      </svg>
    );
  };
  return (
    <div className="grid grid-flow-col justify-between gap-4 items-center">
      <div className="grid grid-flow-col gap-3 grid-cols-[50px,auto]">
        <div className="w-[50px] h-[50px] bg-[#091939] border-[1px] border-[#266395] rounded relative p-[2px]">
          <div className="w-[20px] h-[20px] bg-[url(/game/a.png)] bg-no-repeat  bg-contain absolute bottom-[-6px] right-[-6px]" />
        </div>

        <div className="truncate">
          <Text className="text-white/50 font-medium">
            Player Name Player Name
          </Text>
          <Experience value={50} />
        </div>
      </div>
      <Crystal />
    </div>
  );
};

const GameBox = ({
  setStatus,
}: {
  status?: number; // 0初始化 1签到 2任务 cipher 3Daily combo 4Mini game
  setStatus: (e: number) => void;
}) => {
  const GameItem = ({
    image,
    text = "",
    status = false,
    onClick,
  }: {
    image: string;
    text: string;
    status?: boolean;
    onClick?: () => void;
  }) => {
    return (
      <svg viewBox="0 0 93 80" onClick={onClick}>
        <path
          d="M92.5 4V76C92.5 77.933 90.933 79.5 89 79.5H4C2.067 79.5 0.5 77.933 0.5 76V7.32843C0.5 6.93061 0.658036 6.54907 0.93934 6.26777L6.26777 0.939341C6.54907 0.658036 6.9306 0.5 7.32843 0.5H89C90.933 0.5 92.5 2.067 92.5 4Z"
          fill="#151D32"
          stroke="#19263C"
        />
        {status && (
          <image
            x="75"
            y="0"
            className="w-[18px] h-[18px]"
            preserveAspectRatio="xMidYMid slice"
            xlinkHref="/game/red-rounded.png"
          />
        )}

        <image x="32" y="8" className="w-[28px] h-[28px]" xlinkHref={image} />
        <foreignObject
          x="0"
          y="41"
          width="100%"
          height="40"
          className="text-center grid"
        >
          <Text className="text-[12px] h-[20px] font-medium">{text}</Text>
          <Text className="text-[10px] h-[18px] font-normal text-white/50">
            12:01
          </Text>
        </foreignObject>
      </svg>
    );
  };

  const Crystal = () => {
    return (
      <div className="grid grid-flow-col grid-cols-[40px,auto] items-center">
        <img
          src="/game/crystal.png"
          className="w-[40px] h-[40px] object-contain"
        />
        <Text className="text-[30px] font-bold truncate">9,941,999,999</Text>
      </div>
    );
  };
  const Figure = () => {
    return (
      <div className="max-w-[200px] min-h-[200px]">
        <img src="/game/figure.png" />
      </div>
    );
  };
  const Function = () => {
    const Fuel = () => {
      return (
        <div className="flex items-center gap-2">
          <img src="/game/fuel.png" className="w-[22px] h-[22px]" />
          <Text className="font-normal">1500/1500</Text>
        </div>
      );
    };
    const Boost = () => {
      return (
        <div className="flex items-center gap-2">
          <img src="/game/boost.png" className="w-[22px] h-[22px]" />
          <Text className="font-normal">Boost</Text>
        </div>
      );
    };
    return (
      <div className="grid grid-flow-col justify-between items-center w-full">
        <Fuel />
        <Boost />
      </div>
    );
  };
  return (
    <div className="!p-0 !pt-6 !pb-6 grid gap-6 w-100 binding-card-bg bg-transparent">
      <div className="grid grid-flow-col grid-cols-[repeat(4,1fr)] gap-2">
        <GameItem
          image="/game/1.png"
          text="签到"
          status={true}
          onClick={() => setStatus(1)}
        />
        <GameItem
          image="/game/2.png"
          text="任务"
          onClick={() => setStatus(2)}
        />
        <GameItem
          image="/game/3.png"
          text="Daily combo"
          onClick={() => setStatus(3)}
        />
        <GameItem
          image="/game/4.png"
          text="Mini game"
          onClick={() => setStatus(4)}
        />
      </div>
      <div className="grid gap-4 justify-items-center">
        <Crystal />
        <Figure />
        <Function />
      </div>
    </div>
  );
};

const SignIn = () => {
  const [open, setOpen] = useState<boolean>(false);
  const CheckInRules = () => {
    return (
      <svg
        viewBox="0 0 398 119"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="398" height="119" fill="url(#pattern0_1282_1465)" />
        <defs>
          <pattern
            id="pattern0_1282_1465"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_1282_1465"
              transform="matrix(0.000704225 0 0 0.00235531 0 -0.00285833)"
            />
          </pattern>
          <image
            id="image0_1282_1465"
            width="1420"
            height="427"
            preserveAspectRatio="xMidYMid slice"
            xlinkHref={checkInText}
          />
        </defs>
        <foreignObject x="16" y="30" width="240" height="65" className="grid">
          <Text className="text-[#FFE500] font-semibold">Rule Description</Text>
          <Text className="text-[14px] font-normal">
            The first Ethereum ETF to hit $1 billion in netinflows
          </Text>
        </foreignObject>
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          className="relative"
        >
          <svg
            width="130"
            height="52"
            viewBox="0 0 130 52"
            fill="none"
            className="absolute bottom-[6px] right-0"
          >
            <rect width="130" height="52" fill="url(#pattern0_1282_1464)" />
            <defs>
              <pattern
                id="pattern0_1282_1464"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_1282_1464"
                  transform="matrix(0.00251256 0 0 0.00541167 0 -0.00328566)"
                />
              </pattern>
              <image
                id="image0_1282_1464"
                width="398"
                height="186"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
            <foreignObject x="0" y="0" width="100%" height="100%">
              <Text className="font-bold h-full flex items-center justify-center text-[#4EFCFB]">
                Signed 12/12
              </Text>
            </foreignObject>
          </svg>
          <svg
            width="87"
            height="30"
            viewBox="0 0 87 30"
            fill="none"
            className="absolute top-[4px] right-[11px]"
          >
            <rect width="87" height="30" fill="url(#pattern0_1282_1463)" />
            <defs>
              <pattern
                id="pattern0_1282_1463"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_1282_1463"
                  transform="matrix(0.00334784 0 0 0.00970874 -0.0172414 0)"
                />
              </pattern>
              <image
                id="image0_1282_1463"
                width="309"
                height="103"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
            <foreignObject x="0" y="0" width="100%" height="100%">
              <div className="flex items-center gap-1 w-full h-full justify-center">
                <Icon name="calendar" className="w-[12px] h-[12px] ml-[14px]" />
                <Text className="text-[12px] font-normal text-white/50">
                  08/27
                </Text>
              </div>
            </foreignObject>
          </svg>
        </foreignObject>
      </svg>
    );
  };

  const CheckInRulesItem = ({
    receive = false,
    dateStatus = false,
    day = "1",
    onClick,
  }: {
    receive?: boolean;
    dateStatus?: boolean;
    day?: string;
    onClick?: () => void;
  }) => {
    return (
      <svg
        viewBox="0 0 91 91"
        fill="none"
        onClick={() => {
          !receive && dateStatus && onClick && onClick();
        }}
      >
        <foreignObject x="0" y="0" width="100%" height="100%">
          {dateStatus ? (
            <img src="/game/itSTime.png" />
          ) : (
            <img src="/game/noTime.png" />
          )}
        </foreignObject>
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          className={`relative ${receive ? "opacity-50" : "opacity-100"}`}
        >
          <Text className="text-[10px] font-normal text-[#0570BE] absolute top-[7px] left-[10px]">
            DAY {day}
          </Text>
          <div className="w-full h-full grid justify-items-center items-center">
            <img
              src="/game/crystal.png"
              className="object-contain w-[50px] h-[50px]"
            />
          </div>
        </foreignObject>
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          className={receive ? "opacity-50" : "opacity-100"}
        >
          <Text
            className="absolute bottom-[14px] left-0 text-center w-full h-[16px] text-[14px] font-bold text-white/50"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 47.5%, rgba(0, 0, 0, 0.00) 100%)",
            }}
          >
            +100
          </Text>
        </foreignObject>
        {receive && (
          <foreignObject x="0" y="0" width="100%" height="100%">
            <div className="w-full h-full flex items-center justify-center">
              <svg width="57" height="31" viewBox="0 0 57 31" fill="none">
                <rect width="57" height="31" fill="url(#pattern0_1294_1511)" />
                <defs>
                  <pattern
                    id="pattern0_1294_1511"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_1294_1511"
                      transform="matrix(0.00533196 0 0 0.00980392 -0.0198658 0)"
                    />
                  </pattern>
                  <image
                    id="image0_1294_1511"
                    width="195"
                    height="102"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAABmCAYAAAB2riX3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAOVUlEQVR4nO1dW5LbyBEsghMzv95v38FH8GlWWnltH8MnsL0rjdYn8x3sb02IgD/IIouJrOoCCFkEWBnBQKO72QAGmahH9xC7Pw5/kzvD7nufQGE1GJYc7GnJwRLIEL3EUFgSacF8azF4xL5VFCWY7SMisbZFPPD6uON+KzGwk2wJA9tb+4XHAJJ3kGsuDE4/1kfrqSCWFkOGwEh+TwyZMTws6ksWviuQvEjyHWxFuDDYGFf9lhTDzilj3U64ALx6b7zCtsEsgtfGBIH9qAAslhJDJAQkeavsjZFBWYTtAMnruUbsnrdEMbB+S4jBI3GL+F4djlN4THhkjlwjJgxmMaggbhVDSwiM8F2iDxuTITKlhXXDWobIKrCAGL+D36W4RQyMtBkRdKTfVBGI+BesbYV1IJMetWUrArvfy0UYdl9IfxEiorliyAoBid85ZSaIFrw/FJ5fYb2IrIN1i1hw3AnnyKIxQ0YIEfE7UteKGSLiMwtRlmE9yLrCeL/tfi8X8vfJ8fAchqlimCqETsbkZ3U4jnfyLEiyda4JLNwlWq4xc29sWcm/P21VFCiI1ANzihgyQojIH7XZsRBsIsWaSSR+iWBdyLq0GDPovd/JRQQiXBC6z4Q1OZs0RwitDxMDAzOTzBpE2YXCfcJzi70MEW7tPbfkZ4LAWMGOJSI5MUwVwl7GxN+TtpYYPEvA/hgtc1q4P3hCwHYE4wCLE1AQN7tJU4TABGC3WI7EEAmhJQz2BCjcJ1AQmWAaLUQUMNt0Kz4sR9YnEsMtrtGTU6Zi6N8OH2SQPwXnUiiE6F72vze7g1yySzaWEBmna5up1alZI0tyJf/efOz+zmxVCD8lr7lQ8KCkVwEczFb5SgNnBRNDlO7y0qe6ReJbMVgLcbII/U8yyPvs1RYKAbwUPfIZ3ejUpBsbxJtH8KwAE4URwvCucXmfuuf9L3IJknSrZRs8sViicN9AXkmwtRhERPovh387Y+n+QLYC7edjoBjYgdlBonmEJ/GFsJejEN4nhPDaPe8/mou35LdbWxbTn5UL9wP03XGeCYk8d3xWT9PvmZjBDhBlkUZPf7lNCJ/MCXtCsILw5h8K9wnlmPX1kWNT7yH7bjZTdSWGJayCJ4wJQth97p67V2kLwHOXREoIa4CdLLMca4nilnR5KLBWAG33vdnjjHXICuE3IwRG+gNsI8sg0YUXvjuYtxGJQr8T3dM58eJ5zFYA7QU46Cp5s857EdlNFIIlf0YQZRnWCSR7B3W6b+sULesw6/5HAXTGPYpcpp0chZDIGu3+1T13n2VM/l6OpGdl20+kMklrhCW97otc7qPyCEXBgmovZkx7CioGzzViVoGRf2/qz20ThKAWISME5iJhNql54YXvDktyXUOEfDuQOpYmFbKPaPIhM8+AVgHLLLu0698O7Qm1ayEo0S3pWT1zo/RiK5O0LihvdLZ4SvyAmJtVpJNukTXAehY8n9tSSyyOMYK6Rkj+r07ZWgUWPBfWBeseoWWYKgomhkmcaM0zsKc/c5nO5ZMQPoRH9YVwkAv50RqweAGfAGUZ1gPlTUsEnigQESc8nlwhuzZpFA8IEUz/dvhZWqtPx1kjtAhWGMxlyqRUC/cPvV+ee5TJZlpEy3JSaXcvm5Q9mXP9SQg/Oxd++ubuc/fc6cwyBsrsE7lHGC+wCyyB3C+mWAZx6ixaqxMUrDyI8B8EYJbBngyemPRvh7/KIH8mY9lvv56EgHMGaBXQGmQm2vAiC/cPZhnYfkskCpZdjPgyQjabhHV4WX/RYvey/4NzwjhBZsWgsYKXSWoFzSWIdUItg5Y72J9iHRg3omxj2k3yTjyDyCThXALGB8xFslZBvyviC6KwLtj4E+cVIhHsupf9D2YcL5sUWYWrfTbp5p2IBzyA+oCsD3ORmAiYa2RFUJNs2wCLGUR4CtWrE1OOAucomBaRoxiyT3yE5395AQoGNkwMGjswKxLGCf2XQ4lhZehe9iJH/nn3LisKrc8IwcWUX8fAk/QGZwvmrIuDHxRCNoVaQtgW7D1Ekgu0KQ92sG+/E7lGqZhhCjxBeMr0rAILlEsIjw29p94km62PyM4E4mKKGDwT1EM/NgvIFuGhdUBxeBdWQtgW9AnP9lmbgnktmUDZbWuJgT39mSgsvCe6Jwi2GhUvrITwGGgJAS0FixkE+rB9yp05lgEJjgpVUotwIQzCs0VWCGhdri6ghPDQYKLA9lnIiMEzVb1cT5LYdubzM8vgCaKEUGghcqFmIRKDHoy5RCoE5iYdoF8PZWYhoinzEkKBAT2SKEWbgicGT3VWICx4FomnxZkgvMV39rglhILCWx5k44hZXGFiYD6Z1in51T1iblK0SCpaUUgDZZESwgMhWgfnLRrFdk8Uu6BNRI5iwA4smlcCd1DWf9eziIJhFIIniuMXSwSPgBbpsS1aHhSlYZsiiSwDiwesIHQgtAwHM451eyJRXB2rRPDwQMJ7q1XZDLS3Li7KQIlIO2ZgX7TuEVMpiiCzX+QveE/91ipW3bcPVU8QIr71GIkho6JRn+5l/zsZKxSf+swKjLZlFQrSWLpN6hCeIMLgOrIMemD8crTsVrdecOzVFQot0kfCQL56vGLJoTO8mAFPEtOdbDmtbfcyRJE4Cg+E7mWPpMat90ss5/3+y+E/ZrwfJI5lFa73k12bhMtmvX64zwhfAiggUBj4ixkdaUPYSWAv7S8SuEtPpJPIWARC2jxhaNsoVUrqsa2wcZwsggW6P9EvN6oomCBwRcQgXBB2CiEMoC2aeVnTj0XojOiVQXpQOCLQbSQEJggWPOMcmGYsbVmPh+WdyEUMAzaYeg92UK+fmzVi/SqTtE2AENg8gS2jEDxRMDH0sBUZTwG4yaEpq1ZbwrD9sVzu0IOiIQRG+r3TJlBmYhC5kJ8ld+yx09kklqN1B3H6RmWvf2FDSFgEtARWCJFVYDEDtjNXKHywZ1et2vqov5dV8lBC2CgSQkCi750tEwSOKXIRgK6ZY7FuCC+bpPvRIN6kRgajfhUvbAeOEJi/zwTBXnUQvbvBHoe99KQpAgVbjhG5SBEyZKZ9SgjbwQwhXL0a2fmga+SJwWtvukgi+ZhB6/HgLTRJXkLYDpJCYMHx6DXJMnaTWk97fEGiBH0pMmuTPNxE4hLBtrCAENhrk/GtUHZsRKu9iexyDHbQNIr420ZSCMzleZJrIXhWAV0kkZibU+LcM+b8ol60DIOCzD4WtgUvmLXxAcsaoRCYGLx5Be885nKNvqwkOtASfQrbA7MGItcuDhIcRcACaRSVgi3nabn0rcWjs394+FZhlGi2A3RNIvfIC5SfpB04K6a63FH/9HIMRtiMOLxya4zCehEJwXONrHXQ2GHkIvVvh/fSfI2y/MNpaS0NukLr1bfePtZ729a4hfXB44bdemuOIhcJM0m7/q1/L4O8b5zNL93z/u+nPXSBon8TSK1NygiB5XFbf6Ts2IX1YW4KlVmFk0Xo38kwvGsc9dfuef/P095APl49tRJzYoZoUoOJo1ylbcJ7IEZCQDFgrKBC+DEhhI8nITCC49ue7C+7CymLyLQXHNqLzZZFuChKINtCNmh+gjITwjsZhh8bR/vUPe9/lQvRBygLaXMtgmJKAN0iv2cVykJsE949RqvgCcFzjVpCeD0JAUWAH08ArjCy8wyRK8SEwFJi2SC7cP9gD0qbCo0W4d0qhI8yFgA+/b2fMBVxrIJIPpukdRHpI2FgOXO8wv0D7zdOlnmL8K5SqDkh7D53z90n4fGAff0Z+0X3lpuUmnTTC/bqsx8cqxU/FO4f9r7hBBnOK7Al2lOE8NtJCJ5bNMDWe/FNlGq9EkNEyigmwHZrKlmf1rEK9w3mMuN9t4JgSysmuEZXQrCvSWbvBYxedcCWYVxhzkK9lrvE/gkjEhKWC+uAZxnYoryRII4Taq306VkIzBXyhMEshUjiX5Jbk26Ru4Pkx3I2sC6sDy2PINrOEUJWBJEQPKswOZt0PkXJiQLdpIx1KNw/PGvuPRRH/5hzWmvUWGJBLQITgSeMlms0eZ7BPVXh5G5ZB9a/sF6w+xp5CdK/HT60F92NskaW9PbzVWKrEC3ZFtN2Rjab5Pn5R7P35fDfxDiFQoydvDZcI/vBek8QYQbJojUDXU/vwv8HxyUWH+VC5IPZeuQ/CI8TMu5RKoDGziWIwrfFcdGdLrHA+QL71P/qlKP3ibOJttkxgxXFIBdxnA90elEEC5oqZtguWLyI+979Fygrx1piQIvA+s8Sgsj8HwSwZRWJvSAVhbZXNmk7sA9Dvfdan02n431viUHdJRZLLCIEkeliQNcJRdCZvr2M/3D4RwlPrnDXQMIPpC778IvEEH0WE4JI+xf1cABWb0Vgy0wA+AfDcQvrAbMMuvUsAbvP+ED11hq11iHdJASR290kdJFExm6SfgefIGUV1guP6HhfM+4REjhacNdKn84Wgkj8K9x40vaCBrJFWDcJxy+rsG543kPkFnlxAiM0I7xXXkQIItPe3MPqM99jfxjP/SqsD/b+zknHR2JgxGfrjW4Wgsi0l5Uw6+B9D+MEkfipUS7T+uDFlbYtAhLXE4VIvMRiESGI5GMGZhaZIGwdWgY7lu1fWDfwHrbiQSYCW8aAutWHjTkLrRlo9vRGc4gnMiVOKGGsH3PJxwiO+1iHZTz+TR5G5s092C7CBYHWoyzCYyB7L5GoLQsRlb0xbkLm/QwRqS0wzZqxCCWK9SNLQo/I3pPeiwfYeIvEnJnXWLUEoe3oErELKfJvB6172SIwq/e20RiLJV+y2STvSc5OLEqxtdywwnowhYQtAkfk9+oXz0BOCaDtCbQshfaJXKrCtpHNKE3ts7gIFFPf6Rbllqf0+WYXVFgVbhHF4pi7arVQWAJ3xaf/AfZ+gyD4JgPaAAAAAElFTkSuQmCC"
                  />
                </defs>
                <foreignObject x="0" y="0" width="100%" height="100%">
                  <Text className="text-[#3CF882] text-[10px] font-normal w-full h-full flex items-center justify-center">
                    CLEAR
                  </Text>
                </foreignObject>
              </svg>
            </div>
          </foreignObject>
        )}
      </svg>
    );
  };
  const data = [
    { receive: true, dateStatus: false, day: "1" },
    { receive: false, dateStatus: true, day: "2" },
    { receive: false, dateStatus: false, day: "3" },
    { receive: false, dateStatus: false, day: "4" },
    { receive: false, dateStatus: false, day: "5" },
    { receive: false, dateStatus: false, day: "6" },
    { receive: false, dateStatus: false, day: "7" },
    { receive: false, dateStatus: false, day: "8" },
    { receive: false, dateStatus: false, day: "9" },
    { receive: false, dateStatus: false, day: "10" },
    { receive: false, dateStatus: false, day: "11" },
    { receive: false, dateStatus: false, day: "12" },
  ];
  return (
    <>
      <CheckIn open={open} onHide={() => setOpen(false)} />
      <div className="grid gap-6 w-full">
        <CheckInRules />
        <div className="!p-0 !pt-6 !pb-6 grid gap-[12px] w-100 binding-card-bg bg-transparent  grid-cols-[repeat(4,1fr)]">
          {data.map((item, index) => (
            <CheckInRulesItem
              receive={item.receive}
              dateStatus={item.dateStatus}
              day={item.day}
              key={index}
              onClick={() => setOpen(true)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Task = () => {
  const TaskItem = ({ status = false }: { status?: boolean }) => {
    return (
      <div className="grid grid-flow-col grid-cols-[65px,1fr] gap-2 items-center">
        <svg viewBox="0 0 65 65" fill="none">
          <foreignObject
            x="0"
            y="0"
            width="100%"
            height="100%"
            className="relative"
          >
            <img src={status ? "/game/received-task.png" : "/game/task.png"} />
            <div
              className={`w-full h-full absolute top-0 left-0 flex items-center justify-center ${
                status ? "opacity-50" : "opacity-100"
              }`}
            >
              <img src="/game/vector.svg" className="w-[30px] h-[19px]" />
            </div>
          </foreignObject>
        </svg>
        <svg
          width="100%"
          height={65}
          viewBox="0 0 315 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <image
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            xlinkHref={`/game/task-bg.png`}
          />
          <foreignObject
            x="0"
            y="0"
            width="100%"
            height="100%"
            className={`${status ? "opacity-50" : "opacity-100"}`}
          >
            <div className="grid grid-flow-col grid-cols-[190px,auto] justify-between items-center w-full h-full px-3 gap-1">
              <Text className="text-[14px] font-normal">
                The first Ethereum ETF to hit $1 billion in netinflows
              </Text>

              {status ? (
                <div className="grid justify-items-center text-[#A7BCC2]">
                  <Text className="font-normal">已完成</Text>
                  <Text className="font-normal text-[12px]">+100</Text>
                </div>
              ) : (
                <Button className="text-[#4EFCFB]">
                  <img
                    src="/game/crystal.png"
                    className="w-[20px] h-[20px] object-contain mr-1"
                  />
                  +100
                </Button>
              )}
            </div>
          </foreignObject>
        </svg>
      </div>
    );
  };
  return (
    <div className="grid gap-6">
      <div className="grid gap-0 justify-items-center">
        <img
          src="/game/crystal.png"
          className="w-[90px] h-[90px] object-contain"
        />
        <Text className="text-[30px] font-bold">Earn more coins</Text>
      </div>
      <div className="grid gap-3">
        <HeaderTitle className="">Title - 001</HeaderTitle>
        <TaskItem />
        <TaskItem status={true} />
      </div>
    </div>
  );
};

export default function Game() {
  const [status, setStatus] = useState<number>(0); // 0初始化 1签到 2任务 cipher 3Daily combo 4Mini game
  return (
    <Container maxWidth="xl" className="p-4 !grid !gap-6">
      {status !== 0 && (
        <Icon name="return" className="w-6 h-6" onClick={() => setStatus(0)} />
      )}
      {status !== 2 && <UserBox />}
      {status === 0 && <GameBox status={status} setStatus={setStatus} />}
      {status === 1 && <SignIn />}
      {status === 2 && <Task />}
    </Container>
  );
}
