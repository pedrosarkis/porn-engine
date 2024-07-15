import Video from '../../entities/Video'
import SearchService from '../searchService'
import { performance } from 'perf_hooks'

class TxxxService extends SearchService{
    constructor() {
        super('https://txxx.com/')
    }

    async search(query: string) {
        const t0 = performance.now()
        const queryFormatted = query.split('-').join('%20')
        
        const { videos } = await (await fetch(`${this.baseURL}/api/videos2.php?params=259200/str/relevance/60/search..1.all..&s=` + queryFormatted)).json()
      
        const videolist = videos.map((video: any) => {
            const title = video.title
            const url = `${this.baseURL}/videos/${video.video_id}/${video.dir}`
            const thumbnail = video.scr
            const duration = video.duration
            const tags = video.tags
            const description = video.description || ''
            return new Video(title, url, tags, description, duration, thumbnail)
        })
        const t3 = performance.now()
        console.log(`TxxxService.search took ${t3 - t0} milliseconds`)
        return videolist
    }
}

export default TxxxService