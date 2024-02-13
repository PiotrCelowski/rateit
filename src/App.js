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
// import { useSelector } from "react-redux";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { auth } from "./configuration/firebase/FirebaseCommon";

function App() {
  // const loggedIn = useSelector((state) => state.login.isLoggedIn);
  // console.log('loggedIn', loggedIn)

  // Todo: try this one - https://github.com/remix-run/react-router/blob/dev/examples/auth-router-provider/src/App.tsx
  const authLoader = async () => {
    const user = auth.currentUser
    return { loggedIn: user }
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
