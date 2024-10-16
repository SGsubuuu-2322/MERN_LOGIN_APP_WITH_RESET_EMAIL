import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** import all components */
import UserName from "./components/UserName";
import Password from "./components/Password";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

// Creating all the routes for the navigation...
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserName />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>,
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

//Setting it up with main component...
function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

// Exporting the app...
export default App;
