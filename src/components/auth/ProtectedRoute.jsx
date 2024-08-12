import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../contexts/AuthContext";

const ProtectedRoute = () => {
    const user = useAuthStore(state => state.user); 
    if (!user) {
        // Si el usuario no está autenticado, redirige a la página de login
        return <Navigate to="/login" />;
    }

    // Si el usuario está autenticado, renderiza las rutas anidadas
    return <Outlet />;
}

export default ProtectedRoute;