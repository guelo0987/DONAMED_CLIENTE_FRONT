import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ROUTE_TITLES: Record<string, string> = {
    "/": "Inicio",
    "/solicitudes": "Solicitudes",
    "/consultas": "Consultas",
    "/reset-password": "Restablecer contraseña",
    "/forgot-password": "Recuperar contraseña",
    "/iniciar-sesion": "Iniciar Sesión",
    "/crear-cuenta": "Crear Cuenta",
    "/historial-solicitudes": "Historial de Solicitudes",
    "/dashboard": "Mi Perfil",
    "/preguntas-frecuentes": "Preguntas Frecuentes",
    "/contacto": "Contacto",
};

export const DocumentTitle = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        let pageTitle = ROUTE_TITLES[pathname];

        if (!pageTitle && pathname.startsWith("/detalle-solicitud")) {
            pageTitle = "Detalle de Solicitud";
        }

        document.title = pageTitle ? `DONAMED | ${pageTitle}` : "DONAMED";
    }, [pathname]);

    return null;
};
