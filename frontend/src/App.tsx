import React, { useContext, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { PrimeReactProvider } from 'primereact/api'
import LoginForm from './components/LoginForm/LoginForm'
import { Context } from '.'
import AppRouter from './router'

import 'primereact/resources/themes/lara-light-amber/theme.css'
// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'

const App: React.FC = () => {
    const { store } = useContext(Context)
    const router: any = AppRouter()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.AuthStore.checkAuth()
        }
        if (store.AuthStore.isAuth) {
            store.TaskStore.fetchTasks(store.AuthStore.user.id)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (store.AuthStore.isAuth) {
                store.TaskStore.fetchTasks(store.AuthStore.user.id)
            }
            // console.log(`fetch task user id = ${store.AuthStore.user.id}`)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    if (store.AuthStore.pending) {
        return <div>Loading...</div>
    }
    if (
        !store.AuthStore.isAuth &&
        !store.AuthStore.pending &&
        typeof store.AuthStore.isAuth !== 'undefined' &&
        typeof store.AuthStore.pending !== 'undefined'
    ) {
        return <LoginForm />
    }

    return (
        <PrimeReactProvider>
            <RouterProvider router={observer(router)} />
        </PrimeReactProvider>
    )
}

export default observer(App)
