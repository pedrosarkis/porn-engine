import SearchService from '../service/searchService'
import Video from '../entities/Video'
import DeduplicationStrategy from './UrlBasedDeduplicationStrategy'

class AggregatedSearchService {
    private services: SearchService[]


    constructor(services: SearchService[], private deduplicationStrategy: DeduplicationStrategy) {
        this.services = services
    }

    async search(query: string): Promise<Video[]> {
        const searchPromises = this.services.map(service => service.search(query))
        const results = await Promise.all(searchPromises)
        const allVideos =  results.flat()
        return this.deduplicationStrategy.deduplicate(allVideos)
    }
}

export default AggregatedSearchService
