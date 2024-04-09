import { kaitenCardProperties, kaitenRoutes } from '../../../consts/consts'
import { $kaitenApi } from '../../../http'
import { createCardPayload } from '../../../types'

export default class CardService {
    private makeReqData
    constructor() {
        this.makeReqData = (data: createCardPayload) => {
            return {
                title: data.marking,
                board_id: data.boardId,
                column_id: data.columnId,
                asap: false,
                due_date_time_present: false,
                expires_later: false,
                type_id: [kaitenCardProperties.type],
                properties: {
                    [kaitenCardProperties.apparatus]: data.apparatus,
                    [kaitenCardProperties.batch]: data.batch,
                    [kaitenCardProperties.bbf]: data.bbf,
                    [kaitenCardProperties.can]: data.can,
                    [kaitenCardProperties.conveyor]: data.conveyor,
                    [kaitenCardProperties.marking]: data.marking,
                    [kaitenCardProperties.note]: data.note,
                    [kaitenCardProperties.plan]: data.plan,
                    [kaitenCardProperties.serie]: data.serie,
                },
            }
        }
    }

    async createCard(payload: createCardPayload) {
        const url = kaitenRoutes.CARDS
        const data = this.makeReqData(payload)
        const serverResponse = await $kaitenApi.post(url, data)
        return serverResponse.data
    }

    //   async updateCard(payload) {
    //     const url = kaitenRoutes.CARDS + "/" + payload.id.toString();

    //     const serverResponse = await $kaitenApi.put(url, payload);
    //   }
}
