import { Suspense, lazy } from "react";

import { createBrowserRouter, redirect } from "react-router-dom";

import Layout from "../layouts/layout";
const SignInPage = lazy(() => import(`../views/SignInPage`));
const DashboardPage = lazy(() => import(`../views/DashboardPage`));
const InvoicePage = lazy(() => import(`../views/InvoicePage`))

export const router = createBrowserRouter([
    {
        path: `/sign-in`,
        element: <Suspense fallback={<h1>. . .</h1>}>
            <SignInPage />
        </Suspense>,
        async loader() {
            if(localStorage.accessToken) throw redirect(`/dashboard`)
            return null
        }
    },
    {
        element: <Layout />,
        async loader() {
            if(!localStorage.accessToken) throw redirect(`/sign-in`)
            return null
        },
        children: [
            {
                path: `/dashboard`,
                element: <Suspense fallback={<h1>. . . </h1>}>
                    <DashboardPage />
                </Suspense>
            },
            {
                path: `/invoices`,
                element: <Suspense fallback={<h1>. . . </h1>}>
                    <InvoicePage />
                </Suspense>
            }
        ]
    },
    {
        path: `*`,
        async loader() {
            if(localStorage.accessToken) throw redirect(`/dashboard`)
            throw redirect(`/sign-in`)
        }
    }
])