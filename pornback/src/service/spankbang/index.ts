import Video from '../../entities/Video'
import SearchService from '../searchService'
import cheerio from 'cheerio'
import fs from 'fs'
import { Performance } from 'perf_hooks'

class SpankBangService extends SearchService {
    private SORT_CONST = 'o'
    private sortOptions:{ [key: string]: string } = {
        recent: `${this.SORT_CONST}=new`,
        views: `${this.SORT_CONST}=popular`,
        rating: `${this.SORT_CONST}=trending`,
    }
    constructor(private sort: string = '') {
        super('https://spankbang.com')
    }

    async search(query: string, sort: string) {
        const time1 = performance.now()
        const queryFormatted = query.split('-').join('%20')
        let url = `${this.baseURL}/s/${queryFormatted}/`
        if(sort) {
            url += `?${this.sortOptions[sort]}`
        }
        const html = await this.fetchToText(url)

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
        // console.log(`SpankBangService.search took ${time2 - time1} milliseconds`)
        return videolist
    }
}

export default SpankBangService