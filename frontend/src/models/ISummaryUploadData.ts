import { ISummary } from './ISummary'

export interface ISummaryUploadData {
    userId: number
    spaceId: number
    title: string
    rows: ISummary[]
}
