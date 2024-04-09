import { $api } from '../http'
import { ApiRoutes } from '../consts/apiRoutes'

import { ISummaryUploadData } from '../models/ISummaryUploadData'

export default class SummaryService {
    static async uploadSummary(payload: ISummaryUploadData): Promise<void> {
        const json = JSON.stringify(payload)
        return $api.post(ApiRoutes.UPLOAD_SUMMARY, json)
    }
}
