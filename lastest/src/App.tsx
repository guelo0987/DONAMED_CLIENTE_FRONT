import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Solicitudes } from "./Pages/Solicitudes/Solicitudes";
import { ForgotPass } from "./Pages/Auth/ForgotPass";
import { ResetPass } from "./Pages/Auth/ResetPass";
import { HistorialSolicitudes } from "./Pages/Solicitudes/Historial_Solicitudes";

const router = createBrowserRouter([
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
        path: "/*",
        element: <Solicitudes />,
    },
]);

export const App = () => {
    return <RouterProvider router={router} />;
};
