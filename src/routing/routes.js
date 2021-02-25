import Home from "../features/home/Home";
import Login from "../features/login/Login";
import Signup from "../features/signup/Signup";
import AnsweredQuestions from "../features/questions/AnsweredQuestions";
import UserProfile from "../features/user/UserProfile";

const LOGGED_IN_DEFAULT_LAYOUT_ROUTES = [
  {
    path: "/",
    exact: true,
    component: AnsweredQuestions,
  },
  {
    path: "/user/:username",
    exact: false,
    component: UserProfile,
  },
];

const LOGGED_OUT_NO_LAYOUT_ROUTES = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/signup",
    exact: false,
    component: Signup,
  },
  {
    path: "/login",
    exact: false,
    component: Login,
  },
];

export { LOGGED_IN_DEFAULT_LAYOUT_ROUTES, LOGGED_OUT_NO_LAYOUT_ROUTES };