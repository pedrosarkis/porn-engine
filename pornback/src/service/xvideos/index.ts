import cheerio from 'cheerio'
import Video from '../../entities/Video'
import SearchService from '../searchService'
import fs from 'fs'
import { Performance } from 'perf_hooks'

class XvideosService extends SearchService {
    constructor() {
        super('https://www.xvideos.com')
    }

    formatDuration(duration: string): string {
        let finalDuration: string = ''
        if(duration.includes('min')) {
             finalDuration = (duration.split('min')[0].trim() + ':00').padStart(5, '0')
        } else {
             finalDuration = '00:' + duration.split('sec')[0].trim()
        }

        return finalDuration 
    }
    
    async search(query: string, page: number = 0) {
        const time1 = performance.now()
        const videoList: Video[] = []
        
        const queryFormatted: string = query.split('-').join('+')
        const url: string = `${this.baseURL}/?k=${queryFormatted}&p=${page}`
     
        const data: string = await this.fetchToText(url)
        const $ = cheerio.load(data)
        
        const videos = $('.thumb-block').not('.thumb-block-profile')
        videos.each((index, element) => {
            const title: string = $(element).find('.title').text()
            const url: string = this.baseURL + $(element).find('.title a').attr('href')
            const thumbnail: string = $(element).find('.thumb img').attr('data-src') || ''
            const duration: string = this.formatDuration($(element).find('.duration').text()) 
            const tags: string[] = []
            const description: string = ''
            const video: Video = new Video(title, url, tags, description, duration, thumbnail)
            videoList.push(video)
        })

        const time2 = performance.now()
        console.log(`XvideosService.search took ${time2 - time1} milliseconds"`)
        return videoList

    }
}

export default XvideosService