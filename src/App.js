import React from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { searchClient } from "./configuration/algolia/algolia-config";
import ProposeCoursePage from "./pages/ProposeCoursePage";
import PendingCoursesPage from "./pages/PendingCoursesPage";
import EditCoursePage from "./pages/EditCoursePage";
import UserSettingsPage from "./pages/UserSettingsPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { isUserSignedIn } from "./api/FirebaseAuthApi";

function App() {
  const authLoader = () => {
    const loggedIn = isUserSignedIn()
    return { loggedIn }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: '/',
          loader: authLoader,
          element: <ProtectedRoute />,
          children: [
          { path: "/propose", element: <ProposeCoursePage /> },
          { path: "/pending", element: <PendingCoursesPage /> },
          { path: "/edit", element: <EditCoursePage /> },
          { path: "/user", element: <UserSettingsPage /> }
        ]}
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
