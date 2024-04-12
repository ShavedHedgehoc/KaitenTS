import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Context } from '../..'
import './LoginForm.css'
import Toast from '../Toast/Toast'

function LoginForm() {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { store } = useContext(Context)
    // console.log('return form')
    return (
        <>
            <div className="container">
                <div className="header">{isLogin ? 'Вход' : 'Регистрация'}</div>
                <div className="form">
                    {!isLogin && (
                        <InputText
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Никнэйм"
                        />
                    )}
                    <InputText
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Электропочта"
                    />
                    <InputText
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Пароль"
                    />

                    {isLogin && (
                        <Button
                            className="justify-content-center"
                            onClick={() => store.AuthStore.login(email, password)}
                        >
                            Войти
                        </Button>
                    )}
                    {!isLogin && (
                        <Button
                            className="justify-content-center"
                            onClick={() => store.AuthStore.register(name, email, password)}
                        >
                            Зарегистрироваться
                        </Button>
                    )}
                    <div className="selector">
                        {isLogin ? 'В первый раз? ' : 'Уже зарегистрирован? '}
                        <span
                            className="selector-span"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Зарегистрироваться' : 'Войти'}
                        </span>
                    </div>
                </div>

                <div className="copyright">Iozh 2024</div>
            </div>
            {store.AuthStore.error !== '' && <Toast message={store.AuthStore.error} />}
        </>
    )
}

export default observer(LoginForm)
