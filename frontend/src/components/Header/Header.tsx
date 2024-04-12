import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Menubar } from 'primereact/menubar'
import { RouteNames } from '../../consts/routeNames'
import { Context } from '../..'
import './Header.css'

function Header() {
    // console.log('render Header')
    const { store } = useContext(Context)
    const navigate = useNavigate()

    const logout = () => {
        navigate(RouteNames.HOME)
        store.AuthStore.logout()
    }

    const items = [
        {
            icon: 'pi pi-home',
            url: RouteNames.HOME,
        },
        {
            label: 'Сводки',
            icon: 'pi pi-star',
            items: [
                {
                    label: 'Список сводок',
                    icon: 'pi pi-list',
                    url: RouteNames.SUMMARY_LIST,
                },
                {
                    label: 'Загрузка',
                    icon: 'pi pi-upload',
                    url: RouteNames.SUMMARY_UPLOAD,
                },
            ],
        },
        {
            label: 'Админ',
            icon: 'pi pi-wrench',
            items: [
                {
                    label: 'Пользователи',
                    icon: 'pi pi-user',
                    url: RouteNames.USERS,
                },
            ],
        },
    ]

    const end = (
        <div className="user-menu">
            <div className="username-span">
                <div>
                    <span className="pi pi-user" />
                </div>
                <div>
                    <span>{store.AuthStore.user.name}</span>
                </div>
            </div>
            <div className="exit-button">
                <span onClick={() => logout()}>Выход</span>
            </div>
        </div>
    )

    return (
        <Menubar
            model={items}
            end={end}
        />
    )
}

export default observer(Header)
