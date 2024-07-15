import SearchService from '../service/searchService'
import Video from '../entities/Video'


class AggregatedSearchService {
    private services: SearchService[]


    constructor(services: SearchService[]) {
        this.services = services
    }

    async search(query: string): Promise<Video[]> {
        const searchPromises = this.services.map(service => service.search(query))
        const results = await Promise.all(searchPromises)
        const allVideos =  results.flat()
        return allVideos
    }
}

export default AggregatedSearchService
