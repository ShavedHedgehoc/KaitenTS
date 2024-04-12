import React, { useContext } from 'react'
import { DbRoles } from '../consts/dbRoles'
import { RouteNames } from '../consts/routeNames'
import { createBrowserRouter, redirect } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { Context } from '..'

const AppRouter = () => {
    const Home = React.lazy(() => import('../components/Home/Home'))
    const Summary = React.lazy(() => import('../components/Summary/Summary'))
    const Upload = React.lazy(() => import('../components/Upload/Upload'))
    const User = React.lazy(() => import('../components/User/User'))
    const Forbidden = React.lazy(() => import('../components/Forbidden/Forbidden'))

    const { store } = useContext(Context)

    const protectedLoader = () => {
        const userRoles = store.AuthStore.user.roles
        if (
            userRoles &&
            userRoles.indexOf(DbRoles.SPECIALIST) === -1 &&
            userRoles.indexOf(DbRoles.ADMIN) === -1 &&
            store.AuthStore.isAuth
        ) {
            return redirect(RouteNames.FORBIDDEN)
        }
        return null
    }

    const adminLoader = () => {
        const userRoles = store.AuthStore.user.roles
        if (userRoles && userRoles.indexOf(DbRoles.ADMIN) === -1 && store.AuthStore.isAuth) {
            return redirect(RouteNames.FORBIDDEN)
        }
        return null
    }

    const routes = [
        { path: RouteNames.HOME, element: <Home /> },
        { path: RouteNames.FORBIDDEN, element: <Forbidden /> },
    ]

    const protectedRoutes = [
        { path: RouteNames.SUMMARY_LIST, element: <Summary /> },
        { path: RouteNames.SUMMARY_UPLOAD, element: <Upload /> },
    ]

    const adminRoutes = [{ path: RouteNames.USERS, element: <User /> }]

    return createBrowserRouter([
        {
            element: <Layout />,
            loader: () => adminLoader(),
            children: adminRoutes,
        },
        {
            element: <Layout />,
            loader: () => protectedLoader(),
            children: protectedRoutes,
        },
        {
            element: <Layout />,
            children: routes,
        },
    ])
}

export default AppRouter
