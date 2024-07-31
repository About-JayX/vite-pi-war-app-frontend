import route from "@/config/route";
import { Router, Route } from "preact-router";
export default function RouterProvider() {
  return (
    <Router>
      {route.map((itme, index) => (
        <Route key={index} path={itme.path} component={itme.component} />
      ))}
    </Router>
  );
}
