import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from '../Pages/home'
import Login from '../Pages/Login'
import SearchPage from "../Pages/SearchPage";
import DetailPage from "../Pages/DetailPage";
import Favourite from '../Pages/Favourite';

import Protected from "../Router/protected";

import Navbar from '../Components/navbar'

const Router = () => {
    const router = createBrowserRouter([
        { path: '/', element: <Login /> },
        { path: '/login', element: <Login /> },
        { path: '/home', element: <Protected> <Home/> </Protected> },
        { path: '/search', element: <Protected> <SearchPage/> </Protected> },
        { path: '/search/:showId', element: <Protected> <DetailPage/> </Protected> },
        { path: '/favourite', element: <Protected> <Favourite/> </Protected> },
    ]);

    return (
        <>
            <Navbar></Navbar>
            <RouterProvider router={router} />
        </>
    );
}

export default Router;