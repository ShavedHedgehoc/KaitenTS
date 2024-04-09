import React from 'react'
import './Forbidden.css'
import { ReactComponent as Logo } from '../../static/Forbidden.svg'

export default function Forbidden() {
    return (
        <div className="forbidden-container">
            <div className="forbidden-content">
                <div>
                    <Logo />
                </div>
                <div>
                    <h3>403</h3>
                </div>
                <div>
                    <p>
                        К сожалению, ваших прав недостаточно для посещения этой страницы. Обратитесь к администратору...
                    </p>
                </div>
            </div>
        </div>
    )
}
