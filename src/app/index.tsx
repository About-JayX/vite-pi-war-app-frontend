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
          <div class="!bg-black m-[-1rem]  w-full sticky bottom-0 z-1 !mb-2">
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
          <div class="!bg-black m-[-1rem]  w-full sticky bottom-0 z-1 !mb-2">
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
              <svg
                width="208"
                height="208"
                viewBox="0 0 132 132"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_761_1134)">
                  <path
                    d="M65.9642 132.024C65.6394 131.959 65.3016 131.913 64.9742 131.825C61.2463 130.827 57.5234 129.822 53.7955 128.822C50.2505 127.87 46.703 126.929 43.1581 125.981C40.0747 125.156 36.9912 124.325 33.9052 123.506C33.2607 123.333 32.7193 123.016 32.2449 122.541C24.6472 114.933 17.0469 107.33 9.43882 99.7327C8.96445 99.2583 8.65507 98.7117 8.48234 98.0698C7.39437 93.9783 6.30382 89.8868 5.20812 85.7953C4.00671 81.3094 2.79757 76.826 1.59358 72.3401C1.08827 70.4606 0.593272 68.5786 0.0905372 66.6966C-0.0357909 66.2248 -0.0332128 65.753 0.0931153 65.2786C0.910381 62.2261 1.72765 59.1736 2.54233 56.1185C3.38796 52.9526 4.23358 49.7841 5.08179 46.6181C6.07694 42.9082 7.0721 39.1957 8.06983 35.4858C8.23741 34.8593 8.41273 34.2354 8.58288 33.6089C8.70663 33.1526 8.9464 32.7633 9.27124 32.4255C9.41304 32.2786 9.55999 32.1342 9.70437 31.9898C17.15 24.5442 24.5982 17.1012 32.0335 9.64781C32.6445 9.0368 33.3174 8.63203 34.163 8.41031C39.1491 7.10062 44.1249 5.75227 49.1059 4.41937C53.6898 3.18961 58.2737 1.96242 62.8576 0.732656C63.6645 0.516094 64.4741 0.302109 65.281 0.0803906C65.7554 -0.0510937 66.2246 -0.0485156 66.6964 0.0778125C69.7798 0.905391 72.8633 1.73297 75.9467 2.55797C78.8987 3.34687 81.8532 4.12805 84.8052 4.91953C88.3681 5.87344 91.9259 6.83508 95.4889 7.79414C96.4273 8.0468 97.3684 8.30203 98.3094 8.54695C98.8018 8.67586 99.2195 8.93109 99.5804 9.28172C99.7041 9.40031 99.8227 9.52148 99.9439 9.64266C107.413 17.1115 114.879 24.5855 122.356 32.0466C122.956 32.6447 123.346 33.3098 123.562 34.1374C124.846 39.0075 126.169 43.8698 127.471 48.7348C128.731 53.4347 129.984 58.1372 131.24 62.8397C131.461 63.6647 131.683 64.4897 131.905 65.3121C132.029 65.7684 132.026 66.2222 131.902 66.6785C130.866 70.538 129.832 74.3974 128.798 78.2569C127.906 81.5878 127.022 84.9213 126.133 88.2548C125.251 91.5548 124.364 94.8523 123.482 98.1497C123.32 98.7607 123.01 99.2712 122.562 99.7198C114.943 107.33 107.33 114.946 99.7196 122.565C99.2452 123.039 98.6961 123.346 98.0541 123.516C93.5837 124.704 89.1132 125.895 84.6427 127.092C80.5358 128.193 76.434 129.301 72.327 130.402C70.4631 130.902 68.5991 131.397 66.7325 131.887C66.4927 131.951 66.2375 131.975 65.9642 132.024ZM2.45726 65.967C2.48304 66.0881 2.49851 66.1887 2.52429 66.2892C3.18171 68.7487 3.83655 71.2057 4.49655 73.6627C5.65671 77.9836 6.82202 82.302 7.98218 86.6255C8.93351 90.1704 9.87968 93.7179 10.8181 97.268C10.9135 97.6315 11.0914 97.9125 11.3544 98.1729C18.8516 105.662 26.3462 113.157 33.8356 120.657C34.0986 120.922 34.3899 121.087 34.7483 121.183C36.4988 121.644 38.2442 122.119 39.9922 122.585C44.1971 123.712 48.402 124.841 52.6095 125.965C56.9459 127.125 61.2849 128.283 65.6213 129.448C65.8817 129.518 66.1163 129.52 66.3767 129.448C67.3796 129.167 68.3851 128.899 69.3931 128.631C73.6986 127.481 78.0041 126.334 82.3095 125.181C87.275 123.854 92.2379 122.518 97.2034 121.196C97.5952 121.092 97.9123 120.912 98.2011 120.621C102.339 116.467 106.487 112.324 110.633 108.179C113.956 104.855 117.277 101.527 120.61 98.2116C120.917 97.9073 121.103 97.5722 121.206 97.1674C121.402 96.4069 121.61 95.6489 121.814 94.8909C123.15 89.91 124.485 84.9291 125.818 79.9481C127.037 75.3952 128.257 70.8422 129.466 66.2866C129.515 66.0984 129.512 65.8767 129.463 65.6885C129.146 64.4665 128.809 63.247 128.481 62.0276C127.251 57.4411 126.022 52.8572 124.794 48.2707C123.596 43.7848 122.397 39.2962 121.203 34.8077C121.095 34.403 120.909 34.0678 120.605 33.7662C116.996 30.1723 113.397 26.5655 109.795 22.9638C105.928 19.0966 102.058 15.2295 98.1959 11.3545C97.9201 11.0761 97.6184 10.8956 97.2446 10.7951C95.6436 10.3723 94.0452 9.94172 92.4441 9.51375C89.8866 8.83055 87.3317 8.14992 84.7742 7.46414C81.6083 6.61594 78.4423 5.76 75.2764 4.9118C72.309 4.11516 69.339 3.32625 66.3716 2.52703C66.1137 2.45742 65.8817 2.45484 65.6213 2.52703C64.0255 2.96789 62.4244 3.39328 60.8234 3.82125C57.8715 4.61016 54.917 5.39391 51.965 6.18539C49.16 6.93563 46.3602 7.69359 43.5552 8.44641C40.6187 9.23273 37.6822 10.0165 34.7457 10.7977C34.3719 10.8956 34.0728 11.0787 33.7944 11.3571C29.6075 15.5595 25.4103 19.7515 21.2183 23.9461C17.9415 27.2229 14.6698 30.4997 11.3853 33.7687C11.0811 34.0704 10.8877 34.4004 10.7872 34.8103C10.5758 35.6714 10.3437 36.5299 10.1117 37.3884C8.84843 42.0884 7.58257 46.7883 6.32187 51.4882C5.14882 55.8581 3.98093 60.2306 2.81046 64.6005C2.69187 65.0569 2.57327 65.5209 2.45726 65.967Z"
                    fill="white"
                  />
                  <path
                    d="M126.916 66.052C126.852 66.3099 126.79 66.5754 126.718 66.8384C125.913 69.8393 125.109 72.8402 124.305 75.8438C123.451 79.0277 122.593 82.2092 121.739 85.3906C120.956 88.309 120.177 91.23 119.396 94.1484C119.221 94.8084 119.032 95.4659 118.875 96.131C118.795 96.4713 118.571 96.6931 118.341 96.9225C111.741 103.52 105.144 110.12 98.5441 116.72C97.9769 117.287 97.3994 117.849 96.8451 118.429C96.6234 118.661 96.3707 118.806 96.0665 118.888C92.751 119.77 89.4355 120.654 86.1201 121.541C82.7891 122.433 79.4582 123.33 76.1298 124.222C73.3429 124.97 70.5559 125.715 67.769 126.46C67.2095 126.61 66.6475 126.873 66.0855 126.873C65.5234 126.873 64.964 126.615 64.4019 126.463C61.004 125.553 57.6086 124.643 54.2106 123.732C51.2922 122.951 48.3712 122.173 45.4527 121.389C42.6323 120.634 39.8247 119.834 36.9887 119.141C36.0065 118.901 35.2794 118.421 34.5859 117.723C27.6765 110.783 20.7465 103.86 13.8165 96.9406C13.5149 96.6389 13.3267 96.3141 13.2184 95.9016C12.3754 92.715 11.5117 89.5362 10.6609 86.3522C9.86944 83.4002 9.08569 80.4457 8.29678 77.4938C7.40475 74.1628 6.51272 70.8293 5.61295 67.5009C5.22366 66.0624 5.22623 66.0675 5.61553 64.6238C6.46889 61.4578 7.30936 58.2893 8.15756 55.1234C9.11405 51.5604 10.0731 48 11.0296 44.437C11.7721 41.6656 12.512 38.8941 13.2468 36.1226C13.3319 35.8029 13.4711 35.5348 13.7134 35.2924C20.9219 28.0943 28.1251 20.8885 35.3233 13.6826C35.5373 13.4686 35.7719 13.3242 36.0606 13.2495C38.6181 12.5688 41.1756 11.8908 43.7305 11.205C46.8965 10.3568 50.0598 9.50087 53.2258 8.65267C55.7652 7.97204 58.3047 7.29142 60.8441 6.61337C62.4606 6.18025 64.0797 5.75743 65.6936 5.31658C65.9514 5.24697 66.1783 5.24181 66.4412 5.31142C70.1666 6.31431 73.8946 7.30431 77.6226 8.30462C81.348 9.30236 85.0733 10.3078 88.7987 11.3081C91.1887 11.9501 93.5812 12.5869 95.9737 13.2211C96.3295 13.3165 96.6208 13.4789 96.8863 13.7445C104.035 20.9065 111.19 28.0608 118.352 35.2099C118.659 35.5142 118.826 35.8519 118.934 36.2592C119.922 39.9717 120.922 43.6817 121.915 47.3916C122.768 50.5756 123.616 53.7595 124.47 56.9409C125.251 59.8594 126.035 62.7804 126.818 65.6988C126.849 65.8097 126.88 65.9257 126.916 66.052ZM66.0597 6.01525C65.9514 6.04618 65.8534 6.07454 65.7555 6.10033C62.5715 6.95111 59.3875 7.79931 56.2061 8.65009C52.6276 9.60915 49.0492 10.5682 45.4708 11.5299C42.4853 12.3317 39.5024 13.1386 36.5169 13.9275C36.1869 14.0152 35.9317 14.1647 35.6945 14.4019C28.6021 21.4995 21.5071 28.597 14.4095 35.6895C14.1878 35.9112 14.0176 36.1432 13.9532 36.4681C13.8681 36.9012 13.7263 37.3266 13.6103 37.7545C12.7157 41.0855 11.8185 44.4164 10.9265 47.7474C10.135 50.6993 9.35123 53.6538 8.56233 56.6058C7.75022 59.6402 6.94069 62.6773 6.12084 65.7092C6.05639 65.9489 6.05381 66.1655 6.11826 66.4078C6.91748 69.3752 7.70381 72.3478 8.49787 75.3152C9.45178 78.8782 10.416 82.4386 11.3699 86.0016C12.2181 89.1675 13.0689 92.336 13.9016 95.5045C14.0099 95.917 14.2058 96.2419 14.5049 96.5409C18.1504 100.174 21.7855 103.814 25.4233 107.452C28.8315 110.86 32.2398 114.268 35.6481 117.679C35.8801 117.911 36.1148 118.097 36.4551 118.182C38.0097 118.579 39.5565 119.004 41.106 119.422C43.9419 120.182 46.7779 120.943 49.6138 121.703C52.1533 122.384 54.6927 123.067 57.2322 123.748C60.0681 124.508 62.9041 125.269 65.7451 126.019C65.9462 126.073 66.186 126.073 66.3871 126.019C68.5501 125.452 70.7106 124.872 72.8711 124.294C75.4286 123.611 77.9835 122.931 80.541 122.245C83.3434 121.495 86.1459 120.739 88.9509 119.986C91.1113 119.406 93.2692 118.824 95.4348 118.262C95.8989 118.14 96.2624 117.919 96.6002 117.581C103.579 110.587 110.568 103.602 117.553 96.6157C117.661 96.5074 117.785 96.4095 117.875 96.2857C117.983 96.1388 118.099 95.9789 118.146 95.8062C119.069 92.3953 119.984 88.9793 120.899 85.5659C121.757 82.3664 122.613 79.167 123.469 75.9649C124.32 72.7809 125.166 69.597 126.022 66.413C126.086 66.1706 126.089 65.9567 126.024 65.7143C125.264 62.8964 124.514 60.0734 123.758 57.2529C122.763 53.543 121.765 49.8331 120.77 46.1206C119.922 42.9546 119.074 39.7861 118.238 36.6176C118.13 36.2051 117.934 35.8802 117.632 35.5812C110.592 28.5506 103.559 21.5149 96.5254 14.4792C96.4661 14.4199 96.4145 14.3426 96.3423 14.3013C96.1438 14.1802 95.9479 14.0306 95.7287 13.9688C94.7439 13.6877 93.7513 13.4299 92.7639 13.1644C87.8835 11.8521 83.0031 10.5399 78.1227 9.22759C74.3148 8.20408 70.5044 7.18572 66.6939 6.16736C66.4876 6.11322 66.2711 6.06681 66.0597 6.01525Z"
                    fill="white"
                  />
                  <path
                    d="M92.6221 77.4983C92.7046 78.0681 92.6427 78.6404 92.5396 79.205C92.1039 81.5923 91.1397 83.7683 89.8661 85.8153C88.7575 87.5994 87.4272 89.1952 85.7411 90.4714C84.6686 91.2835 83.5007 91.9126 82.1756 92.2039C81.8765 92.2684 81.5697 92.3045 81.2629 92.3148C79.7392 92.3741 78.2259 92.3509 76.7512 91.861C73.5724 90.8014 71.4712 88.6899 70.4683 85.4905C69.9424 83.8095 69.7593 82.0745 69.8315 80.3239C69.9372 77.8154 70.0738 75.3043 70.244 72.7984C70.3909 70.6173 70.5972 68.4388 70.788 66.2577C70.9452 64.453 71.118 62.6509 71.2856 60.8462C71.5279 58.2423 71.7702 55.6384 72.0152 53.037C72.1338 51.7789 72.2524 50.5182 72.3735 49.2601C72.4302 48.6645 72.2704 48.4634 71.6852 48.4634C68.2846 48.4609 64.8815 48.4609 61.4809 48.4634C60.9421 48.4634 60.79 48.6233 60.7539 49.1595C60.5425 52.3822 60.3595 55.61 60.1094 58.8301C59.8619 62.0166 59.5654 65.198 59.2457 68.3769C59.0188 70.6379 58.761 72.8963 58.4336 75.1445C57.9283 78.594 57.2967 82.0203 56.3092 85.3719C55.9431 86.6171 55.5255 87.8495 54.8887 88.989C54.0766 90.4405 52.9345 91.5336 51.3257 92.0595C50.9261 92.191 50.4956 92.2761 50.0753 92.3019C49.1034 92.3638 48.1237 92.4256 47.1724 92.1446C45.4631 91.6393 44.1353 90.6622 43.4676 88.9555C42.9313 87.5813 43.0474 86.2098 43.6068 84.8614C44.1199 83.6213 44.7979 82.4766 45.5817 81.3964C47.0899 79.321 48.5439 77.2147 49.7634 74.9511C51.5629 71.6098 52.9216 68.1062 53.7105 64.3834C54.3138 61.5397 54.7752 58.6728 55.0975 55.7853C55.3424 53.5939 55.5513 51.3999 55.773 49.2085C55.8245 48.6929 55.6363 48.4609 55.1233 48.4686C53.432 48.4918 51.7408 48.3861 50.0521 48.5846C47.8246 48.8476 45.8652 49.6391 44.2977 51.3045C43.0731 52.6065 42.0419 54.0477 41.0777 55.5455C40.9204 55.7905 40.7657 56.038 40.5775 56.2571C40.2965 56.5845 39.9252 56.7547 39.4895 56.7341C39.0848 56.716 38.8888 56.533 38.8759 56.1334C38.8656 55.8291 38.8708 55.5095 38.9559 55.2207C39.7912 52.3564 40.8663 49.5952 42.4595 47.0558C43.3696 45.6017 44.4112 44.2534 45.6848 43.0906C47.0306 41.8634 48.6213 41.1957 50.4002 40.8992C52.6844 40.5202 54.9867 40.43 57.2967 40.43C67.091 40.43 76.8852 40.4352 86.6795 40.4171C87.355 40.4171 88.0434 40.3011 88.6982 40.1284C89.7114 39.8602 90.4823 39.2157 91.0495 38.334C91.3279 37.9034 91.5935 37.4652 91.8564 37.0243C91.9827 36.8103 92.1503 36.7072 92.4004 36.7175C92.6376 36.7278 92.7949 36.8129 92.8103 37.0733C92.8129 37.1248 92.8206 37.1764 92.8206 37.2254C92.8851 40.0665 92.3566 42.7684 90.9128 45.2459C90.191 46.4834 89.2267 47.4812 87.8835 48.0561C87.2674 48.3191 86.628 48.4738 85.9448 48.4686C84.2174 48.4531 82.4927 48.4634 80.7653 48.4634C80.6467 48.4634 80.5256 48.4583 80.407 48.466C79.9996 48.4892 79.8527 48.6155 79.8088 49.0152C79.7676 49.389 79.7392 49.7654 79.716 50.1392C79.5149 53.1737 79.3138 56.2107 79.1153 59.2477C78.9065 62.4549 78.677 65.6595 78.5043 68.8693C78.3806 71.1741 78.3548 73.4841 78.4863 75.789C78.5636 77.1709 78.7467 78.5398 79.0715 79.8934C79.5588 81.9198 80.92 83.0181 82.8381 83.5259C83.8926 83.8044 84.9651 83.8688 86.0247 83.5208C86.9477 83.2191 87.7443 82.6932 88.4713 82.059C89.5361 81.1334 90.4101 80.0403 91.248 78.9137C91.5238 78.5424 91.7997 78.1738 92.0885 77.8128C92.1993 77.6736 92.3488 77.5627 92.4803 77.439C92.5293 77.4545 92.5757 77.4777 92.6221 77.4983Z"
                    fill="white"
                  />
                  <path
                    d="M91.9045 117.663C90.9506 117.921 89.9993 118.181 89.0454 118.436C86.0599 119.235 83.077 120.032 80.0916 120.831C76.8921 121.687 73.6952 122.543 70.4958 123.397C69.3098 123.714 68.1213 124.033 66.9328 124.348C66.3605 124.5 65.783 124.5 65.2106 124.348C62.9496 123.747 60.6912 123.149 58.4302 122.546C55.8417 121.855 53.2533 121.159 50.6648 120.463C47.8624 119.71 45.06 118.957 42.2576 118.204C41.5847 118.024 40.9118 117.846 40.2363 117.585C40.3369 117.567 40.4374 117.534 40.538 117.534C46.0912 117.534 51.6445 117.524 57.2004 117.555C57.8011 117.557 58.4044 117.763 58.9973 117.918C61.2429 118.506 63.4859 119.109 65.7262 119.715C65.9686 119.779 66.1852 119.779 66.4249 119.715C68.8484 119.06 71.2718 118.421 73.6952 117.766C74.2418 117.619 74.7858 117.529 75.3581 117.531C80.7593 117.542 86.1579 117.534 91.5591 117.534C91.6725 117.534 91.7834 117.549 91.8968 117.557C91.8968 117.588 91.902 117.627 91.9045 117.663Z"
                    fill="white"
                  />
                  <path
                    d="M82.5898 107.73C82.9817 107.358 83.3633 106.974 83.7706 106.618C83.8583 106.541 84.0258 106.533 84.1573 106.533C86.0883 106.528 88.0193 106.513 89.9504 106.536C91.1672 106.551 92.1083 107.42 92.2217 108.557C92.3454 109.815 91.6081 110.803 90.3371 111.086C90.3061 111.094 90.2804 111.12 90.2133 111.158C90.5614 111.72 91.1776 112.038 91.5952 112.664C90.9636 112.692 90.4093 112.716 89.8601 112.646C89.7286 112.631 89.6049 112.486 89.494 112.386C89.1202 112.038 88.7464 111.684 88.3829 111.323C88.2256 111.166 88.0554 111.097 87.8363 111.099C86.5885 111.104 85.3407 111.102 84.0929 111.104C84.0284 111.104 83.9614 111.125 83.8222 111.151C83.8222 111.633 83.8222 112.117 83.8222 112.643C83.3504 112.643 82.9559 112.643 82.4919 112.643C82.4919 112.151 82.479 111.695 82.5022 111.241C82.5073 111.122 82.6104 110.996 82.6981 110.898C82.9043 110.671 83.1467 110.475 83.3426 110.238C83.6159 109.908 83.933 109.792 84.3661 109.8C86.194 109.826 88.0245 109.807 89.8524 109.813C90.1798 109.815 90.4583 109.751 90.6697 109.483C90.9094 109.176 90.9919 108.846 90.8424 108.477C90.6929 108.109 90.4041 107.92 90.02 107.874C89.8859 107.858 89.7467 107.869 89.6101 107.869C87.4728 107.869 85.3381 107.869 83.2008 107.869C83.0178 107.869 82.8347 107.869 82.6517 107.869C82.6311 107.822 82.6104 107.776 82.5898 107.73Z"
                    fill="white"
                  />
                  <path
                    d="M39.9588 107.845C40.1986 107.595 40.459 107.358 40.6781 107.09C40.9746 106.724 41.333 106.621 41.797 106.628C43.6249 106.654 45.4554 106.662 47.2833 106.631C48.7915 106.605 50.1837 108.196 49.338 109.98C48.9539 110.789 48.2372 111.225 47.3116 111.228C45.4837 111.23 43.6559 111.228 41.8254 111.23C41.6243 111.23 41.4258 111.23 41.1551 111.23C41.1551 111.596 41.1602 111.898 41.1551 112.202C41.1473 112.661 41.1267 112.682 40.6523 112.69C40.4152 112.692 40.178 112.69 39.8892 112.69C39.8119 112.2 39.7113 111.676 39.8892 111.302C40.1677 110.712 40.6807 110.245 41.2866 109.941C41.4103 109.879 41.5908 109.921 41.7429 109.921C43.5708 109.921 45.3987 109.913 47.2291 109.926C47.7035 109.928 48.0155 109.738 48.1934 109.315C48.4434 108.727 48.1005 108.098 47.4715 107.995C47.2704 107.961 47.0616 107.966 46.8579 107.966C44.7567 107.964 42.653 107.966 40.5518 107.966C40.3713 107.966 40.1909 107.966 40.0104 107.966C39.9923 107.923 39.9743 107.884 39.9588 107.845Z"
                    fill="white"
                  />
                  <path
                    d="M60.2017 106.513C60.2094 106.675 60.2249 106.837 60.2249 107.002C60.2275 108.028 60.2197 109.052 60.2275 110.078C60.2326 110.735 60.4724 111.099 60.9854 111.285C61.0344 111.303 61.0834 111.331 61.1324 111.331C61.7924 111.334 62.455 111.334 63.1768 111.334C63.1768 110.558 63.1768 109.831 63.1768 109.129C63.5842 108.967 63.842 108.957 64.4427 109.067C64.4427 109.792 64.4427 110.534 64.4427 111.344C65.1878 111.341 65.8684 111.408 66.5387 111.308C67.0466 111.233 67.374 110.774 67.3818 110.23C67.3921 109.495 67.3921 108.761 67.3792 108.026C67.374 107.753 67.4359 107.536 67.6499 107.348C67.9644 107.067 68.2558 106.76 68.6244 106.396C68.6554 106.623 68.6837 106.747 68.6837 106.873C68.6863 108.003 68.6579 109.129 68.694 110.256C68.7301 111.419 67.7272 112.661 66.3402 112.679C64.649 112.7 62.9551 112.713 61.2665 112.677C59.9233 112.648 58.9333 111.591 58.9152 110.253C58.9049 109.501 58.9229 108.75 58.9075 107.997C58.9023 107.737 58.9771 107.544 59.1704 107.366C59.4824 107.08 59.7763 106.773 60.0779 106.474C60.1218 106.484 60.163 106.5 60.2017 106.513Z"
                    fill="white"
                  />
                  <path
                    d="M80.4604 112.674C79.8596 112.674 79.3698 112.7 78.8825 112.658C78.7356 112.646 78.5757 112.463 78.4726 112.321C77.6089 111.153 76.7607 109.977 75.9048 108.804C75.8275 108.698 75.7372 108.598 75.6186 108.454C75.482 108.624 75.3634 108.76 75.2551 108.907C74.4146 110.049 73.5716 111.189 72.7466 112.341C72.5661 112.591 72.3702 112.705 72.066 112.689C71.6793 112.671 71.29 112.684 70.8311 112.684C70.9058 112.514 70.9342 112.401 70.9986 112.316C72.2361 110.619 73.4788 108.925 74.7214 107.232C74.773 107.162 74.822 107.092 74.8761 107.028C75.3144 106.497 75.928 106.481 76.356 107.023C76.8097 107.598 77.2325 108.201 77.6657 108.794C78.5139 109.951 79.3595 111.109 80.2077 112.269C80.2721 112.362 80.3289 112.465 80.4604 112.674Z"
                    fill="white"
                  />
                  <path
                    d="M52.9185 106.523C52.9185 108.547 52.9185 110.574 52.9185 112.608C52.8309 112.636 52.769 112.675 52.7071 112.675C51.3717 112.698 51.6295 112.778 51.6166 111.659C51.6011 110.429 51.6192 109.2 51.6088 107.97C51.6063 107.673 51.681 107.452 51.9208 107.261C52.2379 107.013 52.5241 106.727 52.8257 106.459C52.8567 106.48 52.8876 106.503 52.9185 106.523Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_761_1134">
                    <rect width="132" height="132" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <Text className="!text-[1.6rem]">
              {semicolon(telegramUserData.gold) || 0} PIS
            </Text>
          </div>
          <div className="whitespace-pre-line">{t("steps.steps4.text2")}</div>
          <div class="!bg-black m-[-1rem]  w-full sticky bottom-0 z-1 !mb-2">
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
          body={<Text>{t("public.updateText")}</Text>}
          title={<HeaderTitle>{t("public.update")}</HeaderTitle>}
        />
        {!isNewUser ? (
          <>
            <Box
              className={`overflow-hidden overflow-y-auto h-full z-1`}
              style={{
                background: "linear-gradient(180deg, #141C2D 0%, #0B1319 100%)",
              }}
            >
              <Header />
              <Message />
              <div
                className={`${
                  transitionAnimation
                    ? "transition-opacity duration-500 ease-in-out opacity-100"
                    : "opacity-0"
                }`}
              >
                <RouterProvider />
              </div>
            </Box>
            <Navigation onClick={() => setTransitionAnimation(false)} />
          </>
        ) : (
          <Steps status={stepsm} onChange={(e) => setSteps(e)} />
        )}
      </Fragment>
      <Animation />
    </Container>
  );
}
