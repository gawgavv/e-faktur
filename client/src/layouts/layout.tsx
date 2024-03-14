import { Outlet } from "react-router-dom";

export default function Layout() {
    return <>
        <h1>This is layout</h1>
        <Outlet />
    </>
}