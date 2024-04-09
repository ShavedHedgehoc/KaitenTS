import React from 'react'
import { observer } from 'mobx-react-lite'
import { ProgressBar } from 'primereact/progressbar'
import { ITask } from '../../models/ITask'
import './Task.css'

export interface tskProps {
    task: ITask
}

function Task(props: tskProps) {
    const valueTemplate = (task: ITask) => {
        return Math.floor((task.processed / task.toProcess) * 100)
    }
    return (
        <div className="task-container">
            <div className="task-title">{props.task.title}</div>
            <div>
                Выполнено {props.task.processed} из {props.task.toProcess}
            </div>
            <div className="task-progress-bar">
                <ProgressBar
                    value={valueTemplate(props.task)}
                    style={{ height: '1rem' }}
                ></ProgressBar>
            </div>
        </div>
    )
}
export default observer(Task)
