import { createBrowserRouter, } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import MarathonDetails from "../pages/MarathonDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Marathon from "../pages/Marathon";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import AddMarathon from "../Dashboard/AddMarathon";



const Router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "/marathons-details",
        element: <MarathonDetails></MarathonDetails>,
      },
      {
        path: "/marathons",
        element: <Marathon></Marathon>,
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
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
          {
            path: "/dashboard",
            element: <AddMarathon></AddMarathon>,
          },
          {
            path: "/dashboard/add-marathon",
            element: <AddMarathon></AddMarathon>,
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