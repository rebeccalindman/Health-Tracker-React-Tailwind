import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from 'react';
import App from "../App";
import DashboardView from "../pages/Dashboard/DashboardView";
import NotFound from "../pages/NotFound/NotFound";
import MacrosView from "@/pages/Macros/MacrosView";

// Ladda komponenter asynkront
const MealLog = lazy(() => import("../pages/MealLog/MealLogView"));
/* const ProfileForm = lazy(() => import("../pages/Profile/ProfileForm")); */
const ProfileView = lazy(() => import("../pages/Profile/ProfileView"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardView />,
      },
      {
        path: "mealLog",
        element: (
            <MealLog />
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<div className="p-4 text-2xl text-accent h-screen">Loading...</div>}>
            <ProfileView />
          </Suspense>
        ),
      },
      {
        path: "macros",
        element: (
          <Suspense fallback={<div className="p-4 text-2xl text-accent h-screen">Loading...</div>}>
            <MacrosView />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
