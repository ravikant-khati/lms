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
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path:"course-detail/:courseID",
        element:<CourseDetail />
      },
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path:'course',
            element: <CourseTable />
          },
          {
            path:"course/add-course",
            element:<AddCourse />
          },
          {
            path:"course/edit/:courseID",
            element:<EditCourse />
          },
          {
            path:"course/edit/:courseID/add-lecture",
            element:<CreateLecture />
          },
          {
            path:"course/edit/:courseID/edit-lecture/:lectureID",
            element:<EditLecture />
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
