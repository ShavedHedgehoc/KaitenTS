import { RouterProvider } from 'react-router-dom'
import AppRouter from '../router'
import { observer } from 'mobx-react-lite'

function Content() {
    const router: any = AppRouter()
    return <RouterProvider router={router} />
}

export default observer(Content)
