import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n/language-context";

export const DocumentTitle = () => {
    const { pathname } = useLocation();
    const { t } = useI18n();

    useEffect(() => {
        const ROUTE_TITLES: Record<string, string> = {
            "/": "DONAMED",
            "/solicitudes": t("nav.solicitudes"),
            "/consultas": t("nav.consultas"),
            "/reset-password": t("auth.resetTitle"),
            "/forgot-password": t("auth.recoverPassword"),
            "/iniciar-sesion": t("auth.iniciarSesion"),
            "/crear-cuenta": t("auth.crearCuenta"),
            "/historial-solicitudes": t("historial.title"),
            "/dashboard": t("nav.miPerfil"),
            "/preguntas-frecuentes": t("nav.preguntasFrecuentes"),
            "/contacto": t("nav.contacto"),
        };

        let pageTitle = ROUTE_TITLES[pathname];

        if (!pageTitle && pathname.startsWith("/detalle-solicitud")) {
            pageTitle = t("detalle.title");
        }

        document.title = pageTitle ? `DONAMED | ${pageTitle}` : "DONAMED";
    }, [pathname, t]);

    return null;
};
