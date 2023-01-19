import "./App.scss";
import { AuthProvider } from "./Context/authContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./Pages/Login/Login";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/Detail/DetailPage";
import Favourite from "./Pages/Favourite";
import Navbar from "./Components/Navbar/navbar.component";

import Protected from "./Router/protected";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
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
