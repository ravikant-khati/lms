import Login from "./pages/Login";
import HeroSection from "./pages/students/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/students/Courses";
import MyLearning from "./pages/students/MyLearning";
import Profile from "./pages/students/Profile";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./pages/admin/Sidebar";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/students/CourseDetail";
import CourseProgress from "./pages/students/CourseProgress";
import SearchPage from "./pages/students/SearchPage";
import {
  AlreadyLoggedInForAuthenticationPage,
  ProtectedRouteForAdmin,
  ProtectedRouteForLoggedInUser,
  ProtectedRouteForPurchasedCourse,
} from "./components/ProtectedRoutes.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AlreadyLoggedInForAuthenticationPage>
            <Login />
          </AlreadyLoggedInForAuthenticationPage>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRouteForLoggedInUser>
            <MyLearning />
          </ProtectedRouteForLoggedInUser>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRouteForLoggedInUser>
            <Profile />
          </ProtectedRouteForLoggedInUser>
        ),
      },
      {
        path: "course-detail/:courseID",
        element: (
          <ProtectedRouteForLoggedInUser>
            <CourseDetail />
          </ProtectedRouteForLoggedInUser>
        ),
      },
      {
        path: "course-progress/:courseID",
        element: (
          <ProtectedRouteForLoggedInUser>
            <ProtectedRouteForPurchasedCourse>
              <CourseProgress />
            </ProtectedRouteForPurchasedCourse>
          </ProtectedRouteForLoggedInUser>
        ),
      },
      {
        path: "course-search",
        element: <SearchPage />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRouteForAdmin>
            <Sidebar />
          </ProtectedRouteForAdmin>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/add-course",
            element: <AddCourse />,
          },
          {
            path: "course/edit/:courseID",
            element: <EditCourse />,
          },
          {
            path: "course/edit/:courseID/add-lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/edit/:courseID/edit-lecture/:lectureID",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
