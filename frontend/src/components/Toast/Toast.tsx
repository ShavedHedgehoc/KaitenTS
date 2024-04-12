import { useState, useEffect } from 'react'
import './Toast.css'

export interface ToastProps {
    message: string
}

function Toast(props: ToastProps) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [])

    return (
        <div className="toast__container">
            <div className={show ? 'toast__card' : 'hidden'}>{props.message}</div>
        </div>
    )
}

export default Toast
