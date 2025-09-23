import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Overview from "../components/Overview/Overview";
import Recipe from "../components/Recipe/Recipe";
import Settings from "../components/Settings/Settings";
import Subscription from "../components/Subscription/Subscription";
import Clients from "../components/Clients/Clients";
import Workout from "../components/Workout/Workout";
import UserProfileDashboard from "../components/UserProfileDashboard UserProfileDashboard/UserProfileDashboard";
import RecipeDetails from "../components/RecipeDetails/RecipeDetails";
import SignIn from "../Pages/Auth/SignIn";
import RecipeUploadForm from "../components/Recipe/RecipeUploadForm";
import RecipeUpdate from "../components/Recipe/RecipeUpdate";
import WorkoutUploadForm from "../components/Workout/WorkoutUploadForm";
import WorkoutDetails from "../components/WorkoutDetails/WorkoutDetails";
import WorkoutUpdate from "../components/Workout/WorkoutUpdate";
import { PrivateRoute } from "./PrivetRoute";
import AddPackage from "../components/Subscription/AddPackage";
import EditPackage from "../components/Subscription/EditPackage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
    
        <Dashboard />
     
    ),
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/clients/:id",
        element: <UserProfileDashboard />,
      },
      {
        path: "/recipe",
        element: <Recipe />,
      },
      {
        path: "/recipe/upload",
        element: <RecipeUploadForm />,
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetails />,
      },
      {
        path: "/recipe/update/:id",
        element: <RecipeUpdate />,
      },
      {
        path: "/workout",
        element: <Workout />,
      },
      {
        path: "/workout/upload",
        element: <WorkoutUploadForm />,
      },
      {
        path: "/workout/:id",
        element: <WorkoutDetails />,
      },
      {
        path: "/workout/update/:id",
        element: <WorkoutUpdate />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/subscription/add",
        element: <AddPackage />,
      },
      {
        path: "/subscription/edit/:id",
        element: <EditPackage />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);
