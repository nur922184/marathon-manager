import { createBrowserRouter, } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import MarathonDetails from "../pages/MarathonDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";



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
            path: "/marathons",
            element: <MarathonDetails></MarathonDetails>,
          },
          {
            path: "/register",
            element:<Register></Register>,
          },
          {
            path: "/login",
            element:<Login></Login>,
          },
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