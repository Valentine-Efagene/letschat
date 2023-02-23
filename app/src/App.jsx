import { useState } from "react";
import reactLogo from "./assets/react.svg";
//import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/chat",
      element: <Chat />
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
