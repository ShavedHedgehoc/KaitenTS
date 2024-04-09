import { makeAutoObservable } from 'mobx'
import SummaryService from '../services/SummaryService'
import { ISummaryUploadData } from '../models/ISummaryUploadData'
export default class SummaryStore {
    constructor() {
        makeAutoObservable(this)
    }
    async uploadData(payload: ISummaryUploadData) {
        try {
            const responce = await SummaryService.uploadSummary(payload)
            console.log(responce)
        } catch (error: any) {
            console.log(error.response?.data?.message)
            console.log(error)
        }
    }
}
