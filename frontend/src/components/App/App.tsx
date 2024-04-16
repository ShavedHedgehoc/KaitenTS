import React, { useContext, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { PrimeReactProvider } from 'primereact/api'
import LoginForm from '../LoginForm/LoginForm'
import { Context } from '../..'
import AppRouter from '../../router'

import 'primereact/resources/themes/lara-light-amber/theme.css'
// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
// import Header from '../Header/Header'
// import Tasks from '../Tasks/Tasks'
// import Content from '../Content'
// import './App.css'

const App: React.FC = () => {
    const { store } = useContext(Context)
    const router: any = AppRouter()

    


     useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log("check");
       store.AuthStore.checkAuth()
    }
    }, [])
    useEffect(() => {       
        if (store.AuthStore.isAuth) {
            store.TaskStore.fetchTasks(store.AuthStore.user.id)
        }
    }, [store.AuthStore])

    useEffect(() => {
        const interval = setInterval(() => {
            if (store.AuthStore.isAuth) {
                store.TaskStore.fetchTasks(store.AuthStore.user.id)
            }
            // console.log(`fetch task user id = ${store.AuthStore.user.id}`)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // if (store.AuthStore.pending) {
    //     return <div>Loading...</div>
    // }
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
        // <PrimeReactProvider>
        // <div className="app-container">
        //     <div className="app-header">
        //         <Header />
        //     </div>
        //     <div className="app-content">
        //         <Content />
        //         {/* <RouterProvider router={observer(router)} /> */}
        //     </div>
        //     <div className="app-tasks">
        //         <Tasks />
        //     </div>
        // </div>
        // </PrimeReactProvider>
    )
}

export default observer(App)
