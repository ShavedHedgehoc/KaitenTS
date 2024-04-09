import UploadService from '../../services/kaiten/upload/UploadService'

class UploadController {
    private UploadService: UploadService

    constructor() {
        this.UploadService = new UploadService()
    }
    post = async (req: any, res: any) => {
        try {
            const payload = req.body
            this.UploadService.uploadSummary(payload)
            res.status(200).json({ msg: 'Upload success' })
        } catch (error: any) {
            res.status(400).send({ error: error.message })
        }
    }
}

export default UploadController
