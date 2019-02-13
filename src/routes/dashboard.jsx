import Login from '../views/Login/Login';
import Servers from '../views/Servers/Servers';
import Register from '../views/Register/Register';
import Profil from '../views/Profile/Profile';

var dashRoutes = [
    { path: "/register", name: "Register", icon:"users_single-02", component: Register},
    { path: "/profil", name: "Profil", icon:"users_single-02", component: Profil},
    { path: "/login", name: "Login", icon:"users_single-02", component: Login},
    { path: "/servers", name: "Servers", icon: "design_image", component: Servers},
    { redirect: true, path: "/", pathTo: "/login", name: "Login", component: Login}
];

export default dashRoutes;
