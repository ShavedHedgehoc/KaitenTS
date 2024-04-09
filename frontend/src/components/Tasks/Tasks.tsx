import React, { useContext } from 'react'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import Task from '../Task/Task'

function Tasks() {
    const { store } = useContext(Context)
    return (
        <>
            {store.TaskStore.tasks.length > 0 &&
                store.TaskStore.tasks.map((task) => (
                    <Task
                        task={task}
                        key={task.id}
                    />
                ))}
        </>
    )
}
export default observer(Tasks)
