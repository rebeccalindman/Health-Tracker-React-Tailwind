import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from 'react';
import App from "./App";
import Dashboard from "./pages/Dashboard";

// Ladda komponenter asynkront
const MealLog = lazy(() => import("./pages/MealLog"));
const ProfileForm = lazy(() => import("./pages/ProfileForm"));
const ProfileCard = lazy(() => import("./pages/ProfileCard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "mealLog",
        element: (
            <MealLog />
        ),
      },
      {
        path: "profileform",
        element: (
          <Suspense fallback={<div className="p-4 text-2xl text-accent h-screen">Loading...</div>}>
            <ProfileForm />
          </Suspense>
        ),
      },
      {
        path: "profilecard",
        element: (
          <Suspense fallback={<div className="p-4 text-2xl text-accent h-screen">Loading...</div>}>
            <ProfileCard />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
