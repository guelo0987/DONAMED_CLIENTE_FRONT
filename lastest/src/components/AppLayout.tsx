import { Outlet } from "react-router-dom";
import { DocumentTitle } from "./DocumentTitle";

export const AppLayout = () => (
    <>
        <DocumentTitle />
        <Outlet />
    </>
);
