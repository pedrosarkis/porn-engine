import cheerio from 'cheerio'
import Video from '../../entities/Video'
import SearchService from '../searchService'
import { Performance } from 'perf_hooks'

class XnxxService extends SearchService{
    constructor() {
        super('https://www.xnxx.com')
    }
    
    async search(query: string) {
        const time = performance.now()
        const videoList: Video[] = []
        
        const queryFormatted = query.split(' ').join('+')
        const url = `${this.baseURL}/search/${queryFormatted}`
     
        const data = await this.fetchToText(url)
        const $ = cheerio.load(data)
        
        const videos = $('.thumb-block').not('.thumb-block-profile')
        videos.each((index, element) => {
            const title = $(element).find('.title').text()
            const url = this.baseURL + $(element).find('.title a').attr('href')
            const thumbnail = $(element).find('.thumb img').attr('data-src') || ''
            const duration = $(element).find('.duration').text()
            const tags: string[] = []
            const description = ''
            const video = new Video(title, url, tags, description, duration, thumbnail)
            videoList.push(video)
        })
        const time2 = performance.now()
        console.log(`XnxxService.search took ${time2 - time} milliseconds`)

        return videoList

    }
}

export default XnxxService