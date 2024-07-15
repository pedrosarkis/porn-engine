import SearchService from './searchService'
import Video from '../entities/Video'

class AggregatedSearchService {
    private services: SearchService[]
    private timeout: number

    constructor(services: SearchService[], timeout: number = 2000) {
        this.services = services
        this.timeout = timeout
    }

    private async searchWithTimeout(service: SearchService, query: string): Promise<Video[]> {
        return new Promise(async (resolve) => {
            const timeoutId = setTimeout(() => {
                console.log(`Timeout reached for service: ${service.constructor.name}`)
                resolve([])
            }, this.timeout)

            try {
                const results = await service.search(query)
                clearTimeout(timeoutId)
                resolve(results)
            } catch (error) {
                console.error(`Error in service ${service.constructor.name}:`, error)
                clearTimeout(timeoutId)
                resolve([])
            }
        })
    }

    async search(query: string): Promise<Video[]> {
        const searchPromises = this.services.map(service => this.searchWithTimeout(service, query))
        const results = await Promise.allSettled(searchPromises)
        
        const allVideos = results.reduce((acc: Video[], result) => {
            if (result.status === 'fulfilled') {
                return acc.concat(result.value)
            }
            return acc
        }, [])

        return allVideos
    }
}

export default AggregatedSearchService