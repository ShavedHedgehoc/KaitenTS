import SpaceService from '../../services/kaiten/space/SpaceService'

class SpaceController {
    private SpaceService: SpaceService

    constructor() {
        this.SpaceService = new SpaceService()
    }
    get = async (req: any, res: any) => {
        try {
            const spaces = await this.SpaceService.getSpacesList()
            res.status(200).json(spaces)
        } catch (error: any) {
            res.status(400).send({ error: error.message })
        }
    }
}

export default SpaceController
