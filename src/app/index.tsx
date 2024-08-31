import { Text } from "@/components/text";
import Navigation from "./components/navigation";
import RouterProvider from "@/provider/router";
import { Box, Container } from "@material-ui/core";
import { useRouter } from "preact-router";
import { useEffect, useRef, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { semicolon } from "@/utils";
import Button from "@/components/button";
import {
  updateBindStatus,
  updateFriendRank,
  updateInviteRank,
  updateNewUser,
  updateTelegramUserData,
  updateUserRank,
  updateUserReward,
} from "@/store/user";
import { HeaderTitle, Title } from "@/components/title";
import { useTranslation } from "react-i18next";
import { useTelegram } from "@/provider/telegram";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import api from "@/api";
import {
  getYearFromTimestamp,
  predictRegistrationDate,
} from "@/utils/registrationPredictor";
import Message from "@/components/message";
import Header from "./components/header";
import Modals from "@/components/modal";
import Loader from "./components/loader";
import Animation from "./components/animation";
// import SEO from "@/components/seo";
console.log(import.meta.env, "env_");

const Progress = ({
  text,
  value = 0,
  icon = true,
}: {
  text?: string;
  value?: number;
  icon?: boolean;
}) => {
  return (
    <div className="grid gap-1 h-min">
      <div className="flex justify-between gap-3">
        <Text>{text}</Text>
        <span>
          {icon ? (
            <AiOutlineCheckCircle
              // @ts-ignore
              className="icon"
              style={{ color: value === 100 ? "#0d6efd" : "" }}
            />
          ) : (
            ""
          )}
        </span>
      </div>
      <div className="progress h-2">
        <div className="progress-bar" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

const Steps = ({
  status,
  onChange,
}: {
  status: number;
  onChange?: (e: number) => void;
}) => {
  const { t } = useTranslation();
  const { user, postData } = useTelegram();
  const [ageProgress, setAgeProgress] = useState(0);
  const [activeProgress, setActiveProgress] = useState(0);
  const [premiumProgress, setPremiumProgress] = useState(0);
  const [ogProgress, setOgProgress] = useState(0);
  const [homeProgress, setHomeProgress] = useState(0);
  const timer = useRef<any>(null);
  const homeTimer = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [initLock, setInitLock] = useState(true);
  const lock = useRef<boolean>(false);
  const { telegramUserData, friendRank } = useAppSelector(
    (state) => state.user
  );

  const login = async () => {
    if (lock.current || !postData) return;
    lock.current = true;
    try {
      let result = await api.user.loginAPI(postData);

      sessionStorage.setItem(
        "token",
        (result.data && result.data.authToken) || ""
      );

      !result.data.isNewUser && (await initData());

      result.data.isNewUser && onChange && onChange(1);
      dispatch(updateNewUser(result.data && result.data.isNewUser));
    } catch (error) {
      console.log(error, "error_");
    }
  };

  const homeProgressLoading = () => {
    if (homeTimer.current) return;
    let value = homeProgress;

    homeTimer.current = setInterval(() => {
      if (Object.keys(friendRank).length) {
        value = 100;
        clearInterval(homeTimer.current);
      } else {
        if (value >= 99) {
          value = 99;
        } else {
          value += 5;
        }
      }
      setHomeProgress(value);
    }, 50);
  };
  useEffect(() => {
    homeProgressLoading();
  }, []);
  useEffect(() => {
    login();
  }, []);
  const loadPrigress = (
    progress: number,
    setProgress: (value: number) => void,
    isLast = false
  ) => {
    if (timer.current) return;

    let value = progress;

    timer.current = setInterval(() => {
      value += 3;
      if (value >= 100) {
        if (!isLast) {
          clearInterval(timer.current);
          timer.current = null;
          value = 100;
        } else {
          if (initLock) {
            value >= 99 && (value = 99);
          } else {
            clearInterval(timer.current);
            timer.current = null;
            value = 100;
          }
        }
      }

      setProgress(value);
    }, 50);
  };
  useEffect(() => {
    if (status === 1) {
      if (!ageProgress) {
        initData();
        loadPrigress(ageProgress, setAgeProgress);
      }
      if (ageProgress === 100 && !activeProgress) {
        loadPrigress(activeProgress, setActiveProgress);
      }
      if (activeProgress === 100 && !premiumProgress) {
        loadPrigress(premiumProgress, setPremiumProgress);
      }
      if (premiumProgress === 100 && !ogProgress && !initLock) {
        loadPrigress(ogProgress, setOgProgress, true);
      }
    }
  }, [
    status,
    ageProgress,
    activeProgress,
    premiumProgress,
    ogProgress,
    initLock,
  ]);

  const initData = async () => {
    if (!postData) return;

    const reqls: Array<{
      name: string;
      callback: any;
      params: any;
    }> = [
      {
        name: "userFun",
        callback: () => {
          return callbackFun(api.user.getUserAPI, "userFun");
        },
        params: "",
      },
      {
        name: "userRank",
        callback: () => {
          return callbackFun(api.user.userRankAPI, "userRank");
        },
        params: "",
      },
      {
        name: "userReward",
        callback: () => {
          return callbackFun(api.user.userRewardAPI, "userReward");
        },
        params: "",
      },
      {
        name: "inviteRank",
        callback: api.user.inviteRankAPI,
        params: {
          page: 1,
          pageSize: 500,
        },
      },
      {
        name: "friendRank",
        callback: api.user.friendRankAPI,
        params: {
          page: 1,
          pageSize: 500,
        },
      },
      {
        name: "bindPid",
        callback: api.user.findPidAPI,
        params: "",
      },
      {
        name: "ercAddress",
        callback: api.user.findAddressAPI,
        params: {
          type: "erc20",
        },
      },
      {
        name: "solAddress",
        callback: api.user.findAddressAPI,
        params: {
          type: "solana",
        },
      },
    ];

    const pReqls = reqls.map((item) => {
      return new Promise(async (re, _) => {
        const result = item.params
          ? await item.callback(item.params as any)
          : await item.callback();

        if (result.success) {
          re({ name: item.name, result: result.data });
        } else {
          re({ name: item.name, result: null });
        }
      });
    });

    const results = await Promise.all(pReqls);
    const bindStatus: any = {};
    results.forEach((item: any) => {
      switch (item.name) {
        case "userFun": {
          dispatch(updateTelegramUserData(item.result));
          break;
        }
        case "userRank": {
          dispatch(updateUserRank(item.result));
          break;
        }
        case "userReward": {
          const userReward = item.result;
          let newArr: any = [];
          userReward.activityLogs.forEach((item: any) => {
            if (!newArr.length) {
              newArr.push(item);
            } else {
              let obj = newArr.find((child: any) => child.key === item.key);
              if (!obj) {
                newArr.push(item);
              } else {
                obj.value = String(Number(obj.value) + Number(item.value));
              }
            }
          });
          userReward.activityLogs = newArr.filter((item: any) =>
            Number(item.value)
          );
          dispatch(updateUserReward(userReward));
          break;
        }
        case "inviteRank": {
          dispatch(updateInviteRank(item.result));
          break;
        }
        case "friendRank": {
          dispatch(updateFriendRank(item.result));
          break;
        }
        case "bindPid": {
          bindStatus.pid = item.result || null;
          break;
        }
        case "ercAddress": {
          bindStatus.erc = item.result || null;
          break;
        }
        case "solAddress": {
          bindStatus.sol = item.result || null;
          break;
        }

        default: {
          console.log("not found");

          break;
        }
      }
    });
    dispatch(updateBindStatus(bindStatus));

    setInitLock(false);
  };

  const callbackFun = async (callback: Function, methodName: string) => {
    let result = await callback();

    switch (methodName) {
      case "userFun": {
        if (result.data && result.data.predict_time === null) {
          result = await new Promise((reslove) => {
            setTimeout(async () => {
              reslove(await callbackFun(callback, "userFun"));
            }, 2000);
          });
        }
        return result;
      }
      case "userRank": {
        if (result.data && result.data.username === "未知") {
          result = await new Promise((reslove) => {
            setTimeout(async () => {
              reslove(await callbackFun(callback, "userRank"));
            }, 2000);
          });
        }
        return result;
      }
      case "userReward": {
        if (
          result.data &&
          result.data.activityLogs &&
          !result.data.activityLogs.length
        ) {
          result = await new Promise((reslove) => {
            setTimeout(async () => {
              reslove(await callbackFun(callback, "userReward"));
            }, 2000);
          });
        }
        return result;
      }
      default: {
        console.log("not found");
        break;
      }
    }
  };

  const steps: any = t("steps.text", { returnObjects: true });
  return (
    <>
      {status === 0 && (
        <div
          className="vh-100 grid gap-10 text-center p-4 justify-items-center w-full"
          style={{ gridAutoRows: "1fr auto auto" }}
        >
          <div
            className="self-center "
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {/* <img src="/piwar.png" className="w-[20rem] h-[20rem]" /> */}
            <Loader />

            {!(postData && postData.initData) ? (
              <Text className="mt-4">{t("public.telegram.text")}</Text>
            ) : user?.username ? (
              <>
                <Title className="!text-[1.6rem] flex items-center gap-2">
                  Pi War
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 54 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M53.7501 40.7815C53.8326 41.3513 53.7707 41.9236 53.6676 42.4882C53.2318 44.8755 52.2676 47.0515 50.994 49.0985C49.8854 50.8826 48.5551 52.4784 46.869 53.7546C45.7965 54.5667 44.6286 55.1958 43.3035 55.4871C43.0044 55.5516 42.6976 55.5877 42.3908 55.598C40.8672 55.6573 39.3538 55.6341 37.8791 55.1442C34.7003 54.0846 32.5991 51.9731 31.5962 48.7737C31.0703 47.0927 30.8872 45.3577 30.9594 43.6071C31.0651 41.0986 31.2018 38.5875 31.3719 36.0816C31.5189 33.9005 31.7251 31.722 31.9159 29.5409C32.0732 27.7362 32.2459 25.9341 32.4135 24.1294C32.6558 21.5255 32.8982 18.9216 33.1431 16.3202C33.2617 15.0621 33.3803 13.8014 33.5015 12.5433C33.5582 11.9477 33.3983 11.7466 32.8131 11.7466C29.4125 11.7441 26.0094 11.7441 22.6089 11.7466C22.0701 11.7466 21.9179 11.9065 21.8818 12.4427C21.6704 15.6654 21.4874 18.8932 21.2373 22.1133C20.9898 25.2998 20.6933 28.4813 20.3736 31.6601C20.1468 33.9211 19.889 36.1795 19.5615 38.4277C19.0562 41.8772 18.4246 45.3035 17.4372 48.6551C17.0711 49.9003 16.6534 51.1327 16.0166 52.2722C15.2045 53.7237 14.0624 54.8168 12.4536 55.3427C12.054 55.4742 11.6235 55.5593 11.2033 55.5851C10.2313 55.647 9.25161 55.7088 8.30029 55.4278C6.59099 54.9225 5.26326 53.9454 4.59552 52.2387C4.05927 50.8645 4.17529 49.493 4.73474 48.1446C5.24779 46.9045 5.92583 45.7598 6.70958 44.6796C8.21779 42.6042 9.67185 40.4979 10.8913 38.2343C12.6908 34.893 14.0495 31.3894 14.8384 27.6666C15.4417 24.8229 15.9032 21.956 16.2254 19.0685C16.4704 16.8771 16.6792 14.6831 16.9009 12.4917C16.9525 11.9761 16.7643 11.7441 16.2512 11.7518C14.56 11.775 12.8687 11.6693 11.18 11.8678C8.95255 12.1308 6.99318 12.9223 5.42568 14.5877C4.20107 15.8897 3.16982 17.3309 2.2056 18.8288C2.04833 19.0737 1.89364 19.3212 1.70544 19.5403C1.42443 19.8677 1.05318 20.0379 0.617472 20.0173C0.212707 19.9992 0.0167679 19.8162 0.00387722 19.4166C-0.00643528 19.1123 -0.00127572 18.7927 0.0838024 18.5039C0.919115 15.6396 1.99419 12.8784 3.58747 10.339C4.49755 8.88492 5.53911 7.53656 6.81271 6.37383C8.15849 5.14664 9.74919 4.47891 11.5281 4.18242C13.8123 3.80344 16.1146 3.71321 18.4246 3.71321C28.2189 3.71321 38.0132 3.71836 47.8075 3.70031C48.4829 3.70031 49.1713 3.5843 49.8261 3.41156C50.8394 3.14344 51.6102 2.49891 52.1774 1.61719C52.4558 1.18664 52.7214 0.74836 52.9844 0.307501C53.1107 0.0935165 53.2783 -0.00960914 53.5283 0.000703363C53.7655 0.0110159 53.9228 0.0960953 53.9383 0.356486C53.9408 0.408048 53.9486 0.45961 53.9486 0.508594C54.013 3.34969 53.4845 6.05156 52.0408 8.52914C51.3189 9.76664 50.3547 10.7644 49.0115 11.3393C48.3953 11.6023 47.7559 11.757 47.0727 11.7518C45.3454 11.7363 43.6206 11.7466 41.8933 11.7466C41.7747 11.7466 41.6535 11.7415 41.5349 11.7492C41.1276 11.7724 40.9806 11.8987 40.9368 12.2984C40.8955 12.6722 40.8672 13.0486 40.844 13.4224C40.6429 16.4569 40.4418 19.4939 40.2433 22.5309C40.0344 25.7381 39.805 28.9427 39.6322 32.1525C39.5085 34.4573 39.4827 36.7673 39.6142 39.0722C39.6915 40.4541 39.8746 41.8231 40.1994 43.1766C40.6867 45.203 42.0479 46.3013 43.9661 46.8091C45.0205 47.0876 46.093 47.152 47.1526 46.804C48.0756 46.5023 48.8722 45.9764 49.5993 45.3422C50.664 44.4166 51.538 43.3235 52.3759 42.1969C52.6518 41.8256 52.9276 41.457 53.2164 41.096C53.3272 40.9568 53.4768 40.8459 53.6083 40.7222C53.6572 40.7377 53.7036 40.7609 53.7501 40.7815Z"
                      fill="white"
                    />
                  </svg>
                </Title>
                <Text className="text-color mt-[6px] font-normal">
                  {t("steps.steps1.text1")}
                </Text>
              </>
            ) : (
              <Text className="text-color">{t("steps.steps1.text2")}</Text>
            )}
            <a
              className="w-full"
              href={t("public.telegram.url")}
              target="_blank"
            >
              {!(postData && postData.initData) ? (
                <Button className="not-app-btn">
                  {t("public.telegram.bntText")}
                </Button>
              ) : (
                ""
              )}
            </a>
          </div>

          {user?.username ? (
            <div style={{ width: "100%" }}>
              <Progress value={homeProgress} icon={false} />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {status === 1 && (
        <div
          className="vh-100 grid gap-10 text-center p-4 justify-items-center w-full"
          style={{ gridAutoRows: "auto 1fr auto" }}
        >
          <Title className="!text-[2rem]">{t("steps.steps2.title")}</Title>
          <div className="grid gap-8 h-min w-full">
            <Progress text={steps[0]} value={ageProgress} />
            <Progress text={steps[1]} value={activeProgress} />
            <Progress text={steps[2]} value={premiumProgress} />
            <Progress text={steps[3]} value={ogProgress} />
          </div>
          <div class="!bg-black m-[-1rem]  w-full sticky bottom-0 z-1">
            {ageProgress === 100 &&
              premiumProgress === 100 &&
              activeProgress === 100 &&
              ogProgress === 100 && (
                <Button
                  className="w-100"
                  onClick={() => onChange && onChange(2)}
                >
                  Continue
                </Button>
              )}
          </div>
        </div>
      )}
      {status === 2 && (
        <div
          className="vh-100 grid gap-6 text-center p-4 justify-items-center"
          style={{ gridAutoRows: "auto auto auto 1fr auto auto" }}
        >
          <div className="grid grid-cols-12 gap-3">
            <div
              className="h-1 bg-white col-span-6 rounded cursor-pointer"
              onClick={() => onChange && onChange(2)}
            />
            <div
              className="h-1 bg-white/50 col-span-6 rounded cursor-pointer"
              onClick={() => onChange && onChange(3)}
            />
          </div>
          <Title className="!text-[2rem]">{t("steps.steps3.title")}</Title>
          <Text>{t("steps.steps3.text1")}</Text>
          <div
            className="grid gap-0 self-center steps-3 w-full"
            style={{ gridAutoRows: "1fr auto" }}
          >
            <Title className=" !text-[9rem] self-center">
              {telegramUserData.predict_year ||
                getYearFromTimestamp(predictRegistrationDate(user?.id || 0))}
            </Title>
            <Text className="!text-[1.6rem] mt-[-1rem]">
              {t("steps.yearAgo")}
            </Text>
          </div>
          <Text className="whitespace-pre-line">
            {/* @ts-ignore */}
            {t("steps.steps3.text2", { returnObjects: true })?.[0]}{" "}
            {user?.id || ""}. {"\n"} {/* @ts-ignore */}
            {t("steps.steps3.text2", { returnObjects: true })?.[1].replace(
              "85",
              telegramUserData.userRank
                ? Math.floor(telegramUserData.userRank)
                : "85"
            )}
          </Text>
          <div class="!bg-black m-[-1rem]  w-full sticky bottom-0 z-1">
            <Button className="w-100" onClick={() => onChange && onChange(3)}>
              {t("steps.continue")}
            </Button>
          </div>
        </div>
      )}
      {status === 3 && (
        <div
          className="vh-100 grid gap-6 text-center p-4 justify-items-center"
          style={{ gridAutoRows: "auto auto auto 1fr auto auto" }}
        >
          <div className="grid grid-cols-12 gap-3">
            <div
              className="h-1 bg-white col-span-6 rounded cursor-pointer"
              onClick={() => onChange && onChange(2)}
            />
            <div
              className="h-1 bg-white col-span-6 rounded cursor-pointer"
              onClick={() => onChange && onChange(3)}
            />
          </div>
          <Title className="!text-[2rem]">{t("steps.steps4.title")}</Title>
          <Text>{t("steps.steps4.text1")}</Text>
          <div
            className="grid gap-0 self-center steps-3 w-full justify-items-center"
            style={{ gridAutoRows: "1fr auto" }}
          >
            <div className="self-end z-1">
              <img src="/piwar.png" className="w-[13rem] h-[13rem]" />
            </div>
            <Text className="!text-[1.6rem]">
              {semicolon(telegramUserData.gold) || 0} PIS
            </Text>
          </div>
          <div className="whitespace-pre-line">{t("steps.steps4.text2")}</div>
          <div class="!bg-black m-[-1rem]  w-full sticky bottom-0 z-1">
            <Button
              className="w-100"
              onClick={() => {
                onChange && onChange(4);
                dispatch(updateNewUser(false));
              }}
            >
              {t("steps.continue")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export function App() {
  const [transitionAnimation, setTransitionAnimation] = useState(true);
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  const { isNewUser } = useAppSelector((state) => state.user);
  const [stepsm, setSteps] = useState<number>(0);
  const { t } = useTranslation();

  // const opengraph: any = t('seo./.opengraph', { returnObjects: true })
  // const twitter: any = t('seo./.twitter', { returnObjects: true })

  useEffect(() => {
    if (router[0].path && router[0].path !== currentPath) {
      setCurrentPath(router[0].path);
      setTransitionAnimation(false);
    }
  }, [router, currentPath]);

  useEffect(() => {
    if (!transitionAnimation) {
      const timer = setTimeout(() => {
        setTransitionAnimation(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [transitionAnimation]);

  return (
    <Container maxWidth="xs" className="p-0 relative">
      <Fragment>
        <Modals
          open={false}
          body={<Text>{t('public.updateText')}</Text>}
          title={<HeaderTitle>{t('public.update')}</HeaderTitle>}
        />
        {!isNewUser ? (
          <>
            <Box
              className={`overflow-hidden overflow-y-auto h-full z-1`}
              style={{
                background: 'linear-gradient(180deg, #141C2D 0%, #0B1319 100%)',
              }}
            >
              <Header />
              <Message />
              <div
                className={`${
                  transitionAnimation
                    ? 'transition-opacity duration-500 ease-in-out opacity-100'
                    : 'opacity-0'
                }`}
              >
                <RouterProvider />
              </div>
            </Box>
            <Navigation onClick={() => setTransitionAnimation(false)} />
          </>
        ) : (
          <Steps status={stepsm} onChange={e => setSteps(e)} />
        )}
      </Fragment>
      <Animation />
    </Container>
  );
}
