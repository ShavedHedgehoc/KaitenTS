import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import './Layout.css'
import Tasks from '../Tasks/Tasks'

export default function Layout() {
    // console.log('render layout')
    return (
        <div className="layout">
            <div className="header">
                <Header />
            </div>
            <div className="layout-content">
                <Suspense fallback={<div>Loading..///.</div>}>
                    <Outlet />
                </Suspense>
            </div>
            <div className="tasks">
                <Tasks />
            </div>
        </div>
        // <Suspense fallback={<div>Loading...</div>}>
        //     <Outlet />
        // </Suspense>
    )
}
