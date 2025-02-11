import { createBrowserRouter, } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import MarathonDetails from "../pages/MarathonDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Marathon from "../pages/Marathon";
import DashboardLayout from "../layouts/DashboardLayout";
import AddMarathon from "../Dashboard/AddMarathon";
import MyMarathonList from "../Dashboard/MyMarathonList";
import MyApplyList from "../Dashboard/MyApplyList";
import PrivatRoute from "./PrivatRoute";
import UpdateProfile from "../pages/UpdateProfile";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import MarathonHomePage from "../pages/MarathonHomePage";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";



const Router = createBrowserRouter([
  // https://asserment-eleven-server.vercel.app
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <MarathonHomePage></MarathonHomePage>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/marathons/:id",
        element: <PrivatRoute><MarathonDetails></MarathonDetails></PrivatRoute>,
      },
      {
        path: "/marathons",
        element: <Marathon></Marathon>,
        loader: () => fetch('https://asserment-eleven-server.vercel.app/productsCount')
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/profile",
        element: <PrivatRoute><ProfilePage></ProfilePage></PrivatRoute>,
      },
      {
        path: "/registers/:id",
        element: <PrivatRoute><RegisterPage></RegisterPage></PrivatRoute>,
      },
      {
        path: "/update-profile",
        element: <PrivatRoute><UpdateProfile></UpdateProfile></PrivatRoute>,
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivatRoute><DashboardLayout></DashboardLayout></PrivatRoute>,
    children: [
      {
        path: "/dashboard",
        element: <PrivatRoute><AddMarathon></AddMarathon></PrivatRoute>,
      },
      {
        path: "/dashboard/add-marathon",
        element: <PrivatRoute> <AddMarathon></AddMarathon></PrivatRoute>,
      },
      {
        path: "/dashboard/my-marathon-list",
        element: <PrivatRoute> <MyMarathonList></MyMarathonList></PrivatRoute>,
      },
      {
        path: "/dashboard/my-apply-list",
        element: <PrivatRoute> <MyApplyList></MyApplyList></PrivatRoute>,
      },
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },

]);

export default Router;