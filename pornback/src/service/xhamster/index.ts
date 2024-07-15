import cheerio from 'cheerio'
import SearchService from '../searchService'
import Video from '../../entities/Video'
import fs from 'fs'
import { Performance } from 'perf_hooks'
class XhamsterService extends SearchService {
    constructor() {
        super('https://xhamster.com')
    }

    async search(query: string) {
        const time = performance.now()
        const videoList: Video[] = []
        const queryFormatted = query.split('-').join('+')
        const url = `${this.baseURL}/search/${queryFormatted}`
        const data = await (await fetch(url)).text()
        const $ = cheerio.load(data)
        
        const videos = $('div[data-video-id]')

        videos.each((index, element) => {
            const title = $(element).find('.thumb-image-container__image').attr('alt') || ''
            const url = $(element).find('.video-thumb__image-container').attr('href') || ''
            const thumbnail = $(element).find('.thumb-image-container__image').attr('src') || ''
            const tags = $(element).find('.thumb-list__tags').text().split(' ')
            const description = $(element).find('.thumb-list__description').text()
            const duration = $(element).find('div[data-testid="video-duration"]').text()
            const video = new Video(title, url, tags, description, duration, thumbnail)
            videoList.push(video)

        })
        const time2 = performance.now()
        console.log(`XhamsterService.search took ${time2 - time} milliseconds`)
        return videoList

    }
}
export default XhamsterService