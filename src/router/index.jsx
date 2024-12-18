import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import CustomerLayout from "../layout/CustomerLayout";
import PlantDashboard from "../pages/Customer/PlantDashboard";
import PlantList from "../pages/Customer/PlantList";
import UserProfileForm from "../pages/User/UserProfileForm";
import AdminLayout from "../layout/AdminLayout";
import UserRequestList from "../pages/Admin/UserRequestList";
import UserRequestDetail from "../pages/Admin/UserRequestDetail";
import UserList from "../pages/Admin/UserList";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Plans from "../pages/Admin/Plans";
import LandingLayout from "../layout/LandingLayout";
import LandingPage from "../pages/Landing/LandingPage";
import WebSocketsTestPage from "../pages/WebSocketsTestPge";
import MqttMessageDisplay from "../pages/MqttSocketTest";
import Spedometer from "../pages/Spedometer";
import Home from "../pages/Home";
import Metrics from "../pages/Customer/Metrics";
import LinkHydroponic from "../pages/Customer/LinkHydroponic";
import ChartHydroTest from "../pages/ChartHydroTest";
import CreateUserConfirmation from "../pages/User/CreateUserConfirmation";


const routes = createRoutesFromElements(
    <>
        <Route path="/spedometer" element={<Spedometer value={600} minimum={1000} maximum={1600} />} />
        <Route path="/mqtt" element={<MqttMessageDisplay />} />
        <Route path="/chart-test" element={<ChartHydroTest />} />
        <Route path="/test" element={<WebSocketsTestPage roomId={"device1"} />} />
        <Route path="/test2" element={<WebSocketsTestPage roomId={2} />} />
        
        <Route path="/confirmation-account/:userIntentId" element={<CreateUserConfirmation />} />



        <Route path="/landing" element={<LandingLayout />} >
            <Route index element={<LandingPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/customer" element={<CustomerLayout />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<UserProfileForm />} />
                <Route path="plants" element={<PlantList />} />
                <Route path="metrics" element={<Metrics />} />
                <Route path="link-hydroponic" element={<LinkHydroponic />} />
                <Route path="plants/:hydroponicId/:currentCycle" element={<PlantDashboard />} />
            </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
            {/* <Route index element={<PlantDashboard />} /> */}
            <Route index element={<Home />} />
            <Route path="profile" element={<UserProfileForm />} />
            <Route path="user-request" element={<UserRequestList />} />
            <Route path="user-request/:id" element={<UserRequestDetail />} />
            <Route path="users" element={<UserList />} />
            <Route path="plans" element={<Plans />} />
        </Route>
    </>
);

export const router = createBrowserRouter(routes);