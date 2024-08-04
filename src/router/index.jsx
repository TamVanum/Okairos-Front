import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import CustomerLayout from "../layout/CustomerLayout";
import PlantDashboard from "../pages/Customer/PlantDashboard";
import PlantList from "../pages/Customer/PlantList";
import UserProfileForm from "../pages/User/UserProfileForm";
import AdminLayout from "../layout/AdminLayout";
import UserRequestList from "../pages/Admin/UserRequestList";
import UserRequestDetail from "../pages/Admin/UserRequestDetail";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/customer",
        element: <CustomerLayout />,
        children: [
            {
                index: true,
                path: "/customer",
                element: <PlantDashboard />,
            },
            {
                path: "/customer/profile",
                element: <UserProfileForm />,
            },
            {
                path: "/customer/plants",
                element: <PlantList />,
            },
            {
                path: "/customer/plants/:id",
                element: <PlantDashboard />,
            }

        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                path: "/admin",
                element: <PlantDashboard />,
            },
            {
                path: "/admin/profile",
                element: <UserProfileForm />,
            },
            {
                path: "/admin/user-request",
                element: <UserRequestList />,
            },
            {
                path: "/admin/user-request/:id",
                element: <UserRequestDetail />,
            }

        ]
    },
]);