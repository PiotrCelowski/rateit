import React from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./utils/RootLayout";
import ProposeCoursePage from "./pages/ProposeCoursePage";
import PendingCoursesPage from "./pages/PendingCoursesPage";
import EditCoursePage from "./pages/EditCoursePage";
import UserSettingsPage from "./pages/UserSettingsPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { SigninLayout } from "./utils/SigninLayout";
import { CourseDetaisPage, getCourseDetails } from "./pages/CourseDetaisPage";
import { ErrorPage } from "./pages/ErrorPage";
import { redirectToHome } from "./utils/redirectToHome";
import { ResponsivePageLayout } from "./utils/ResponsivePageLayout";
import { AuthCheck } from "./utils/AuthCheck";
import { RootErrorPage } from "./pages/RootErrorPage";
import { AuthorizedGuard } from "./pages/AuthorizedGuard";

export const router = createBrowserRouter([
  {
    element: <AuthCheck />,
    errorElement: <RootErrorPage />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { path: "/", element: <LandingPage /> },
          {
            path: '/courses',
            element: <ResponsivePageLayout />,
            children: [
              {
                index: true,
                loader: redirectToHome,
              },
              {
                path: ":courseID",
                element: <CourseDetaisPage />,
                loader: getCourseDetails,
                errorElement: <ErrorPage />
              }
            ]
          },
          {
            element: <AuthorizedGuard />,
            children: [
              {
                element: <SigninLayout />,
                children: [
                  { path: "/login", element: <LoginPage /> },
                  { path: "/register", element: <RegisterPage /> },
                ]
              }
            ]
          },
          { path: '/',
            element: <ProtectedRoute />,
            children: [
            { path: "/propose", element: <ProposeCoursePage /> },
            { path: "/pending", element: <PendingCoursesPage /> },
            { path: "/edit", element: <EditCoursePage /> },
            { path: "/user", element: <UserSettingsPage /> }
          ]}
        ]
      }
    ]
  }
])
