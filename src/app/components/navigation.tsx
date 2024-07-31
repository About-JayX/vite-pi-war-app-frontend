import React from "react";
import { route, useRouter } from "preact-router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useTranslation } from "react-i18next";
import { RiHomeLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import Icon from "@/components/icon";

export default function Navigation({ onClick }: { onClick?: () => void }) {
  const { t } = useTranslation();
  const router = useRouter()
  const navs: any = t("nav", { returnObjects: true });
  const data = [
    {
      icon: <RiHomeLine />,
      name: navs[0],
      path: "/",
    },
    {
      icon: <Icon name="ranking" />,
      name: navs[1],
      path: "/leaderboard",
    },
    { icon: <LuUsers />, name: navs[2], path: "/friends" },
    {
      icon: <Icon name="rocket" />,
      name: navs[3],
      path: "/airdrops",
    },
  ];
  const [value, setValue] = React.useState(router[0].path);

  return (
    <BottomNavigation
      value={value}
      onChange={(_event, newValue) => {
        route(newValue, true);
        setValue(newValue);
        onClick && onClick();
      }}
      showLabels
      className="!bg-black"
    >
      {data.map((itme, index) => (
        <BottomNavigationAction
          key={index}
          label={itme.name}
          value={itme.path}
          icon={itme.icon}
          className={`${
            value === itme.path ? "!text-white" : "!text-white/50"
          }`}
        />
      ))}
    </BottomNavigation>
  );
}
