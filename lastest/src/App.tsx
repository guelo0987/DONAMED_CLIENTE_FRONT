import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Solicitudes } from "./Pages/Solicitudes/Solicitudes";
import { ForgotPass } from "./Pages/Auth/ForgotPass";
import { ResetPass } from "./Pages/Auth/ResetPass";
import { HistorialSolicitudes } from "./Pages/Solicitudes/Historial_Solicitudes";
import Dashboard from "./Pages/MiPerfil/Dashboard";
import LandingPage from "./Pages/Landing/LandingPage";
import { DetalleSolicitud } from "./Pages/Solicitudes/DetalleSolicitud";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/solicitudes",
        element: <Solicitudes />,
    },
    {
        path: "/reset-password",
        element: <ResetPass />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPass />,
    },
    {
        path: "/historial-solicitudes",
        element: <HistorialSolicitudes />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/detalle-solicitud",
        element: <DetalleSolicitud />,
    },
]);

export const App = () => {
    return <RouterProvider router={router} />;
};
