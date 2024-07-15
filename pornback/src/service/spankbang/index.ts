import Video from '../../entities/Video'
import SearchService from '../searchService'
import cheerio from 'cheerio'
import fs from 'fs'
import { Performance } from 'perf_hooks'

class SpankBangService extends SearchService {
    constructor() {
        super('https://spankbang.com')
    }

    async search(query: string) {
        const time1 = performance.now()
        const queryFormatted = query.split('-').join('%20')
      
        const html = await this.fetchToText(`${this.baseURL}/s/${queryFormatted}/`)

        const $ = cheerio.load(html)
        const videolist = $('.video-item').map((i, el) => {
            const title = $(el).find('img').attr('alt') || ''
            const url = this.baseURL + $(el).find('a').attr('href') || ''
            const thumbnail = $(el).find('img').attr('data-src') || ''
            const duration = $(el).find('.l').text()
            const tags: string[] = []
            const description = $(el).find('.description').text()
            return new Video(title, url, tags, description, duration, thumbnail)
        }).get()
      
        const time2 = performance.now()
        console.log(`SpankBangService.search took ${time2 - time1} milliseconds`)
        return videolist
    }
}

export default SpankBangService