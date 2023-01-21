import "./App.scss";
import { AuthProvider } from "./Context/authContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Pages/Login/Login";
import SearchPage from "./Pages/Search/SearchPage";
import DetailPage from "./Pages/Detail/DetailPage";
import Favourite from "./Pages/Favourite/Favourite";
import Navbar from "./Components/Navbar/navbar.component";

import Protected from "./Router/protected";
import Home from "./Pages/Home/Home";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: (
    <Protected> 
      <Home /> 
    </Protected>
    )
  },
  {
    path: "/search",
    element: (
      <Protected>
        <Navbar></Navbar>
        <SearchPage />
      </Protected>
    ),
  },
  {
    path: "/search/:showId",
    element: (
      <Protected>
        <Navbar></Navbar>
        <DetailPage />
      </Protected>
    ),
  },
  {
    path: "/favourite",
    element: (
      <Protected>
        <Navbar></Navbar>
        <Favourite />
      </Protected>
    ),
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
