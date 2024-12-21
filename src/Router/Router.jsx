import { createBrowserRouter, } from "react-router-dom";
// import HomeLayout from "../Layouts/HomeLayout";
// import Login from "../Pages/Login";
// import Register from "../Pages/Register";
// import HowToHelp from "../Layouts/HowToHelp";
// import Dashboard from "../Layouts/Dashboard";
// import DonationCampaigns from "../Layouts/DonationCampaigns";
// import Home from "../Layouts/Home";
// import Error from "../Pages/Error";
// import DonationDetails from "../Components/DonationDetails";
// import PrivatRoute from "./PrivatRoute";
// import ProfilePage from "../Pages/ProfilePage";
// import UpdateProfile from "../Pages/UpdateProfile";


const Router = createBrowserRouter([
   
      {
        path: "/",
        element: <h2>home pages</h2>,
        children: [
          {
            path: "",
            element: <h1>home</h1>
          },
    //       {
    //         path: "/donation-campaigns",
    //         element: <DonationCampaigns></DonationCampaigns>,
    //         loader: () => fetch('donation.json')
    //       },
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