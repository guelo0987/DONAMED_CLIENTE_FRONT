import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Solicitudes } from "./Pages/Solicitudes/Solicitudes";
import { ForgotPass } from "./Pages/Auth/ForgotPass";
import { ResetPass } from "./Pages/Auth/ResetPass";
import { VerificarEmail } from "./Pages/Auth/VerificarEmail";
import { RestablecerContrasena } from "./Pages/Auth/RestablecerContrasena";
import { CreateAccount } from "./Pages/Auth/CreateAccount.tsx";
import { Login } from "./Pages/Auth/Login.tsx";
import { Consultas } from "./Pages/Consultas/Consultas.tsx";
import { HistorialSolicitudes } from "./Pages/Solicitudes/Historial_Solicitudes";
import Dashboard from "./Pages/MiPerfil/Dashboard";
import LandingPage from "./Pages/Landing/LandingPage";
import { DetalleSolicitud } from "./Pages/Solicitudes/DetalleSolicitud";
import { PreguntasFrecuentes } from "./Pages/Ayuda/PreguntasFrecuentes.tsx";
import { Contacto } from "./Pages/Ayuda/Contacto.tsx";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: "/", element: <LandingPage /> },
            { path: "/solicitudes", element: <Solicitudes /> },
            { path: "/consultas", element: <Consultas /> },
            { path: "/reset-password", element: <ResetPass /> },
            { path: "/restablecer-contrasena", element: <RestablecerContrasena /> },
            { path: "/verificar-email", element: <VerificarEmail /> },
            { path: "/forgot-password", element: <ForgotPass /> },
            { path: "/iniciar-sesion", element: <Login /> },
            { path: "/crear-cuenta", element: <CreateAccount /> },
            { path: "/historial-solicitudes", element: <HistorialSolicitudes /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/detalle-solicitud/:id", element: <DetalleSolicitud /> },
            { path: "/preguntas-frecuentes", element: <PreguntasFrecuentes /> },
            { path: "/contacto", element: <Contacto /> },
        ],
    },
]);

export const App = () => {
    return <RouterProvider router={router} />;
};
