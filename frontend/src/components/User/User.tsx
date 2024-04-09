import { observer } from 'mobx-react-lite'
import React from 'react'

function User() {
    const fakeAction = () => {
        console.log('action')
    }
    return (
        <div>
            User page
            <div>
                <button onClick={() => fakeAction()}>lsdjfldjsl</button>
            </div>
        </div>
    )
}
export default observer(User)
