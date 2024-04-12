import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'

import './styles/reset.css'
import './styles/common.css'

import App from './components/App/App'
// import Store from './store/AuthStore'
import Store from './store'

interface State {
    store: Store
    // authStore:Store
}

const store = new Store()

export const Context = createContext<State>({ store })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Context.Provider value={{ store }}>
        <App />
    </Context.Provider>
)
