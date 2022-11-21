import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from '../Pages/home'
import Login from '../Pages/Login'
import SearchPage from "../Pages/SearchPage";
import DetailPage from "../Pages/DetailPage";
import Favourite from '../Pages/Favourite';

import Navbar from '../Components/navbar'

const Router = () => {
    const router = createBrowserRouter([
        { path: '/', element: <Login /> },
        { path: '/home', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/search', element: <SearchPage /> },
        { path: '/search/:showId', element: <DetailPage /> },
        { path: '/favourite', element: <Favourite /> },
    ]);

    return (
        <>
            <Navbar></Navbar>
            <RouterProvider router={router} />
        </>
    );
}

export default Router;