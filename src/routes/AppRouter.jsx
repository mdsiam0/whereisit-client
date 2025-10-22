import { createBrowserRouter } from "react-router";
import HomePageLayout from "../pages/HomePageLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AddItems from "../pages/AddItems";
import AllItems from "../pages/AllItems";
import ItemDetails from "../pages/ItemDetails";
import MyItems from "../pages/MyItems";
import UpdateItem from "../pages/UpdateItem";
import AllRecovered from "../pages/AllRecovered";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout></HomePageLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "/addItems",
        element: (
          <PrivateRoute>
            <AddItems></AddItems>
          </PrivateRoute>
        )
      },
      {
        path: "/allItems",
        element: <AllItems></AllItems>,


      },
      {
        path: "/items/:id",
        element: (
          <PrivateRoute>
            <ItemDetails></ItemDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/myItems",
        element: <PrivateRoute>
          <MyItems></MyItems>
        </PrivateRoute>,
      },
      {
        path: "/updateItems/:id",
        element: <PrivateRoute>
          <UpdateItem></UpdateItem>
        </PrivateRoute>,
      },
      {
        path: "/all-recovered",
        element: <PrivateRoute>
          <AllRecovered></AllRecovered>
          </PrivateRoute>,
      }



    ]

  },
]);

export default router;
