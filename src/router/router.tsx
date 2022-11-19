import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from '../pages/Home'
import Login from '../pages/Login'
import SearchPage from "../pages/SearchPage";
import DetailPage from "../pages/DetailPage";
import Favourite from '../pages/Favourite'

const Router = () => {

    const router = createBrowserRouter([
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/search', element: <SearchPage /> },
        { path: '/search/:showId', element: <DetailPage /> },
        { path: '/favourite', element: <Favourite /> },
        { path: '/home', element: <Home />},
        { path: '/', element: <Home /> },
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default Router;