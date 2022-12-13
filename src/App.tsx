import "./App.scss";
import { AuthProvider } from "./Context/authContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/home";
import Login from "./Pages/Login";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/DetailPage";
import Favourite from "./Pages/Favourite";
import Navbar from "./Components/navbar";

import Protected from "./Router/protected";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: (
      <Protected>
        <Navbar></Navbar>
        <Home />
      </Protected>
    ),
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
