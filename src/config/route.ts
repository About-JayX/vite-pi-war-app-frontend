import Home from "@/view";
import Leaderboard from "@/view/leaderboard";
import Friends from "@/view/friends";
import Game from "@/view/game";
import Airdrops from "@/view/airdrops";
import lang from "@/config/locale";

// 基本路由配置
const baseRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/leaderboard",
    component: Leaderboard,
  },
  {
    path: "/game",
    component: Game,
  },
  {
    path: "/friends",
    component: Friends,
  },
  {
    path: "/airdrops",
    component: Airdrops,
  },
];

// 生成多语言支持的路由
const localizedRoutes = baseRoutes.map((route) => ({
  ...route,
  path: `/:lang(${Object.keys(lang).join("|")})${route.path}`,
}));

// 合并基本路由和多语言支持的路由
const routes = [...baseRoutes, ...localizedRoutes];

export default routes;
