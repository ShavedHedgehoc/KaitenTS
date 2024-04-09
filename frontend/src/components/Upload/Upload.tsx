import React, { ChangeEvent, useContext, useState } from 'react'
import { Context } from '../..'

import { observer } from 'mobx-react-lite'

import { Steps } from 'primereact/steps'

import * as XLSX from 'xlsx'

import './Upload.css'
import { uploadArraySchema } from '../../schemas/xls-upload.schema'
import Ajv, { SchemaObject } from 'ajv/dist/jtd'
import { ISummary } from '../../models/ISummary'
import { ISummaryUploadData } from '../../models/ISummaryUploadData'
import { IXLSData } from '../../models/IXLSXData'

function Upload() {
    const ajv = new Ajv({ allErrors: true })
    // const val = ajv.compile(uploadArraySchema)

    const valSchema: SchemaObject = {
        properties: {
            serie: { type: 'string' },
            marking: { type: 'string' },
            batch: { type: 'string' },
            plan: { type: 'string' },
            apparatus: { type: 'string' },
            can: { type: 'string' },
            conveyor: { type: 'string' },
            bbf: { type: 'string' },
            note: { type: 'string' },
        },
    }

    const parse = ajv.compileParser(valSchema)

    const { store } = useContext(Context)

    const [activeIndex, setActiveIndex] = useState(0)
    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState<File>()
    const [isValid, setIsValid] = useState(false)
    const [dataForUpload, setDataForUpload] = useState({} as ISummaryUploadData)
    const [errs, setErrs] = useState<Array<string>>([])

    const addStatesToJson = (json: ISummary[]) => {
        const spaceId = 283675 // replace from space selector
        const title = 'Сводка Пискаревский 12/05/2024'
        const rows: ISummary[] = json
        setDataForUpload({ spaceId: spaceId, title: title, rows: rows, userId: store.AuthStore.user.id })
    }

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value)
        setFile(e.target.files?.[0])
        setActiveIndex(1)
    }

    const handleValidationComplete = (json: IXLSData[]) => {
        addStatesToJson(json)
        setActiveIndex(2)
        setIsValid(true)
        console.log('validation completed')
    }

    const upload = async () => {
        await store.SummaryStore.uploadData(dataForUpload)
        clearData()
    }

    const clearData = () => {
        console.log('clear')
        setIsValid(false)
        setDataForUpload({} as ISummaryUploadData)
        setFile(undefined)
        setFileName('')
        setActiveIndex(0)
        setErrs([])
    }

    const validate = () => {
        const reader = new FileReader()
        reader.onload = function (event) {
            let data = event.target?.result
            let valResult = true
            let json: IXLSData[] = []
            try {
                const wb = XLSX.read(data)
                const ws = wb.Sheets[wb.SheetNames[0]]
                json = XLSX.utils.sheet_to_json(ws, { raw: false })

                for (let i = 0; i < json.length; i++) {
                    const parsedData = parse(JSON.stringify(json[i]))
                    if (parsedData === undefined) {
                        const errMsg = `Ошибка в стороке ${i + 2}...`
                        valResult = false
                        setErrs((arr) => [...arr, errMsg])
                    }
                }
            } catch (error) {
                console.log(error)
            }
            if (valResult) {
                handleValidationComplete(json)
            } else {
                console.log('Validation failed!')

                setIsValid(false)
            }
        }

        file && reader.readAsArrayBuffer(file)
    }

    const items = [{ label: 'Выбор файла' }, { label: 'Валидация' }, { label: 'Загрузка' }]

    return (
        <div className="upload-container">
            <div className="upload-header">
                <h2>Загрузка сводок</h2>
            </div>
            <div className="upload-form">
                <div className="upload-select-file">
                    <div
                        className={
                            file === undefined ? 'upload-input-file-wrapper' : 'upload-input-file-wrapper-disabled'
                        }
                    >
                        <h4> {fileName.split('\\').slice(-1)[0] || 'Нажмите сюда для выбора файла...'}</h4>
                        <input
                            id="file"
                            type="file"
                            className="upload-input-file-input"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            value={fileName}
                            disabled={file !== undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileSelect(e)}
                        />
                        <div
                            className={file === undefined ? 'close-disabled' : 'close'}
                            onClick={() => clearData()}
                        ></div>
                    </div>
                </div>
                <div className="upload-form-val-message">
                    {isValid && errs.length === 0 && 'Файл успешно проверен... Можно грузить...'}
                    {errs.length > 0 && 'При проверке обнаружены ошибки...'}
                </div>
                <div className={errs.length > 0 ? 'upload-form-errors' : 'upload-form-errors-disabled'}>
                    {errs.length > 0 &&
                        errs.map((item, id) => (
                            <div
                                key={id}
                                className="upload-form-errors-error"
                            >
                                {item}
                            </div>
                        ))}
                </div>
                <div className="upload-form-buttons">
                    {file !== undefined && !isValid && errs.length === 0 && (
                        <button
                            className="upload-button"
                            disabled={file === undefined || isValid || errs.length > 0}
                            onClick={() => validate()}
                        >
                            Проверка
                        </button>
                    )}
                    {file !== undefined && isValid && (
                        <button
                            className="upload-button"
                            disabled={file === undefined || !isValid}
                            onClick={() => upload()}
                        >
                            Загрузка
                        </button>
                    )}
                </div>
            </div>
            <div className="upload-step">
                <Steps
                    model={items}
                    activeIndex={activeIndex}
                    style={{ fontSize: '0.8rem' }}
                />
            </div>
        </div>
    )
}
export default observer(Upload)
