import {createBrowserRouter, Outlet} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Favourites from "../pages/Favourites/Favourites";
import Navigation from "../components/Navigation";

export const router = createBrowserRouter([
    {
        element: <Navigation/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/fav',
                element: <Favourites/>
            }
        ]

    },

])