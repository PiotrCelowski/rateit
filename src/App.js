import React from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { searchClient } from "./configuration/algolia/algolia-config";
import ProposeCoursePage from "./pages/ProposeCoursePage";
import PendingCoursesPage from "./pages/PendingCoursesPage";
import EditCoursePage from "./pages/EditCoursePage";
import UserSettingsPage from "./pages/UserSettingsPage";
import { useSelector } from "react-redux";

function App() {
  const loggedIn = useSelector((state) => state.login.isLoggedIn);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        // { path: "/propose", element: <ProposeCoursePage /> },

        { path: "/propose", element: loggedIn ? <ProposeCoursePage /> : <Navigate to="/login" /> },
        { path: "/pending", element: loggedIn ? <PendingCoursesPage /> : <Navigate to="/login" /> },
        { path: "/edit", element: loggedIn ? <EditCoursePage /> : <Navigate to="/login" /> },
        { path: "/user", element: loggedIn ? <UserSettingsPage /> : <Navigate to="/login" /> }
      ]
    }
  ])

  return (
    <InstantSearch searchClient={searchClient} indexName="courses">
      <RouterProvider router={router} />
    </InstantSearch>
  );
}

export default App;
