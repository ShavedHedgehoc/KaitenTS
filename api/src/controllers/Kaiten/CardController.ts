import CardService from '../../services/kaiten/card/CardService'
import { createCardPayload } from '../../types'

class CardController {
    private CardService: CardService
    constructor() {
        this.CardService = new CardService()
    }
    post = async (req: any, res: any) => {
        try {
            const payload: createCardPayload = req.body
            const card = await this.CardService.createCard(payload)
            res.status(200).send(card)
        } catch (error: any) {
            //   console.log(error);
            res.status(401).send({ error: error })
        }
    }
}

export default CardController
