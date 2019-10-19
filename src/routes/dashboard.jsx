import Dashboards from "../views/Dashboard/Dashboard";
import Profil from "../views/Profile/Profile";
import Connection from "../views/Connection/Connection";
import Demo from "../components/Demo/Demo";

var dashRoutes = [
  {
    path: "/login",
    name: "Connexion",
    component: Connection
  },
  {
    path: "/home",
    name: "Home",
    icon: "icon-components",
    component: Dashboards
  },
  {
    path: "/profile",
    name: "Profil",
    icon: "icon-badge",
    component: Profil
  },
  {
    path: "/demo",
    component: Demo
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home"
  }
];

export default dashRoutes;
