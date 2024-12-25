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



const Router = createBrowserRouter([
  // https://asserment-eleven-server.vercel.app
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
      {
        path: "",
        element: <Home></Home>,
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
      // {
      //   path: "/dashboard",
      //   element: <Dashboard></Dashboard>,
      // },
      //       {
      //         path: "/donation-campaigns/:id",
      //         element: <PrivatRoute>
      //           <DonationDetails></DonationDetails>
      //         </PrivatRoute>,
      //       },
      //       {
      //         path: "profile",
      //         element: <PrivatRoute>
      //           <ProfilePage></ProfilePage>
      //         </PrivatRoute>,
      //       },
      //       {
      //         path: "update-profile",
      //         element: <PrivatRoute>
      //           <UpdateProfile></UpdateProfile>
      //         </PrivatRoute>,
      //       },
      //       {
      //         path: "/dashboard",
      //         element: 
      //         <Dashboard></Dashboard>

      //       },
      //       {
      //         path: "/help",
      //         element: <HowToHelp></HowToHelp>,
      //       },


    ]
  },
  //   {
  //     path: "/login",
  //     element: <Login></Login>,
  //   },
  //   {
  //     path: "/register",
  //     element: <Register></Register>,
  //   },
  //   {
  //     path: "*",
  //     element: <Error></Error>,
  //   },

]);

export default Router;