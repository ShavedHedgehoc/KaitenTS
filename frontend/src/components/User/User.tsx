import { observer } from 'mobx-react-lite'
import React from 'react'
import './User.css'

function User() {
    return (
        <div className="user__container">
            <div className="user__header">
                <h2>Пользователи</h2>
            </div>
        </div>
    )
}
export default observer(User)
