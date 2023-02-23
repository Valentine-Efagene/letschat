import { useState } from "react";
import reactLogo from "./assets/react.svg";
//import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      //errorElement: <div>Error</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
