import { kaitenRoutes } from '../../../consts/consts'
import { $kaitenApi } from '../../../http'
import * as mapper from './mapper'

export default class SpaceService {
    private url
    constructor() {
        this.url = kaitenRoutes.SPACES
    }
    async getSpacesList() {
        const serverResponse = await $kaitenApi.get(this.url)
        return mapper.toSpacesList(serverResponse.data)
    }
}
