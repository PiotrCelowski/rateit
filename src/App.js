import React from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./utils/RootLayout";
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { searchClient } from "./configuration/algolia/algolia-config";
import ProposeCoursePage from "./pages/ProposeCoursePage";
import PendingCoursesPage from "./pages/PendingCoursesPage";
import EditCoursePage from "./pages/EditCoursePage";
import UserSettingsPage from "./pages/UserSettingsPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { SigninLayout } from "./utils/SigninLayout";
import { fetchCourse } from "./api/FirestoreApi";
import { CourseDetaisPage } from "./pages/CourseDetaisPage";

const getCourseDetails = async ({ params }) => {
  const { courseID } = params

  if (courseID) {
    try {
      const response = await fetchCourse(courseID);
      if (response.exists()) {
        const courseData = {
          title: response.data()?.title,
          author: response.data()?.author,
          rating: response.data()?.rating,
          ratingVotes: response.data()?.ratingVotes,
          codeSnippetsWorking: response.data()?.codeSnippetsWorking,
          easilyExplained: response.data()?.easilyExplained,
          keptUpToDate: response.data()?.keptUpToDate,
          topicCoverage: response.data()?.topicCoverage,
          organization: response.data()?.organization
        }
        return { data: courseData }
      }
      throw new Response("Not Found", { status: 404 });
    } catch (error) {
      const data = { error: error }
      return new Response.json(JSON.stringify(data), { status: error?.status || 500})
    }
  }
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { 
          path: '/courses',
          children: [
            {
              path: "/courses/:courseID",
              element: <CourseDetaisPage />,
              loader: getCourseDetails,
              errorElement: <div>Can't get course</div>
            }
          ]
        },
        {
          element: <SigninLayout />,
          children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
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
  ])

  return (
    <InstantSearch searchClient={searchClient} indexName="courses">
      <RouterProvider router={router} />
    </InstantSearch>
  );
}

export default App;
