import React, { useEffect, useState } from "react";
import { route, useRouter } from "preact-router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useTranslation } from "react-i18next";
import { RiHomeLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import Icon from "@/components/icon";
import lang from "@/config/locale";

export default function Navigation({ onClick }: { onClick?: () => void }) {
  const { t } = useTranslation();
  const router = useRouter();
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

  // 生成多语言支持的路由
  const localizedRoutes = data.map((route) => ({
    ...route,
    path: `/:lang(${Object.keys(lang).join("|")})${route.path}`,
  }));

  const [value, setValue] = useState(getPathWithoutLang(router[0].path));

  // 获取路径中的语言部分
  function getPathWithoutLang(path:any) {
    const parts = path.split('/');
    return '/' + parts.slice(2).join('/');
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(_event, newValue) => {
        const filteredValue = getPathWithoutLang(newValue);
        route(filteredValue, true);
        setValue(filteredValue);
        onClick && onClick();
      }}
      showLabels
      className="!bg-black"
    >
      {localizedRoutes.map((itme, index) => (
        <BottomNavigationAction
          key={index}
          label={itme.name}
          value={itme.path}
          icon={itme.icon}
          className={`${
            value === getPathWithoutLang(itme.path) ? "!text-white" : "!text-white/50"
          }`}
        />
      ))}
    </BottomNavigation>
  );
}
