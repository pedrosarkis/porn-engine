import Video from '../../entities/Video'
import SearchService from '../searchService'
import cheerio from 'cheerio'
import fs from 'fs'

class SpankBangService extends SearchService {
    constructor() {
        super('https://spankbang.com')
    }

    async search(query: string) {
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
      

        return videolist
    }
}

export default SpankBangService