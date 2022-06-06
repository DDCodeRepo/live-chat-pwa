import { Suspense, lazy } from "react";
import type { PartialRouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import BrowseLayout from "./components/BrowseLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DocsLayout from "./components/docs/DocsLayout";
import GuestGuard from "./components/GuestGuard";
import LoadingScreen from "./components/LoadingScreen";
import MainLayout from "./components/MainLayout";
import Employee from "./pages/Employee";
import EmpWelcome from "./pages/EmpWelcome";
import { privilageValueEnum } from "./services/user-role-service/privilage-values";
import { RoleBasedGuard } from "./services/user-role-service/role-gaurd-hoc";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// Authentication pages

const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const PasswordRecovery = Loadable(
  lazy(() => import("./pages/authentication/PasswordRecovery"))
);
const PasswordReset = Loadable(
  lazy(() => import("./pages/authentication/PasswordReset"))
);
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const VerifyCode = Loadable(
  lazy(() => import("./pages/authentication/VerifyCode"))
);

// Dashboard pages

// ++++++++++++ LIVE CHAT ++++++++++++++++
const ConsoleDashboard = Loadable(
  lazy(() => import("./pages/dashboard/ConsoleDashboard"))
);
const Livechat = Loadable(lazy(() => import("./pages/dashboard/LiveChat")));
const ChatMonitor = Loadable(
  lazy(() => import("./pages/dashboard/ChatMonitor"))
);
const Broadcast = Loadable(lazy(() => import("./pages/dashboard/Broadcast")));
// +++++++++++++LIVE CHAT ++++++++++++++++

// Docs pages

const Docs = Loadable(lazy(() => import("./pages/Docs")));

// Error pages

const AuthorizationRequired = Loadable(
  lazy(() => import("./pages/AuthorizationRequired"))
);
const NotFound = Loadable(lazy(() => import("./pages/NotFound")));
const ServerError = Loadable(lazy(() => import("./pages/ServerError")));

// Other pages

const Checkout = Loadable(lazy(() => import("./pages/Checkout")));
const Home = Loadable(lazy(() => import("./pages/Home")));
const Pricing = Loadable(lazy(() => import("./pages/Pricing")));

const routes: PartialRouteObject[] = [
  {
    path: "/",
    element: <Employee />,
  },
  {
    path: "welcome/:emp",
    element: <EmpWelcome />,
  },
  {
    path: "authentication",
    children: [
      {
        path: "login",
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: "login-unguarded",
        element: <Login />,
      },
      {
        path: "password-recovery",
        element: <PasswordRecovery />,
      },
      {
        path: "password-reset",
        element: <PasswordReset />,
      },
      {
        path: "register",
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
      {
        path: "register-unguarded",
        element: <Register />,
      },
      {
        path: "verify-code",
        element: <VerifyCode />,
      },
    ],
  },

  {
    path: "/home",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "consoledashboard",
        children: [
          {
            path: "/",
            element: <ConsoleDashboard />,
          },
          {
            path: "new",
            element: <ConsoleDashboard />,
          },
          {
            path: ":threadKey",
            element: <ConsoleDashboard />,
          },
        ],
      },
      {
        path: "livechat",
        children: [
          {
            path: "/",
            element: <RoleBasedGuard codeValue={privilageValueEnum.TEST}><Livechat /></RoleBasedGuard>,
          },
          {
            path: "new",
            element: <Livechat />,
          },
          {
            path: ":threadKey",
            element: <Livechat />,
          },
        ],
      },
      {
        path: "chatmonitor",
        children: [
          {
            path: "/",
            element: <ChatMonitor />,
          },
          {
            path: "new",
            element: <ChatMonitor />,
          },
          {
            path: ":threadKey",
            element: <ChatMonitor />,
          },
        ],
      },
      {
        path: "broadcast",
        children: [
          {
            path: "/",
            element: <Broadcast />,
          },
          {
            path: "new",
            element: <Broadcast />,
          },
          {
            path: ":threadKey",
            element: <Broadcast />,
          },
        ],
      },
    ],
  },
  {
    path: "docs",
    element: <DocsLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/docs/overview/welcome" replace />,
      },
      {
        path: "*",
        element: <Docs />,
      },
    ],
  },
  {
    path: "*",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "401",
        element: <AuthorizationRequired />,
      },
      {
        path: "404",
        element: <NotFound />,
      },
      {
        path: "500",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
