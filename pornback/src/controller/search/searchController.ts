import SearchRepository from "../../entities/searchRepository"
import { Request, Response} from "express"

class SearchController {
    constructor(private searchRepository: SearchRepository) {}

    async search(req: Request, res: Response): Promise<any> {
        try {
            const videos = await this.searchRepository.search(req.query.q as string)
            return res.status(200).json(videos)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
        
    }
}

export default SearchController