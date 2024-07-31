import Home from "@/view"
import Leaderboard from "@/view/leaderboard"
import Friends from "@/view/friends"
import Airdrops from "@/view/airdrops"
export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/leaderboard",
    component: Leaderboard,
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
