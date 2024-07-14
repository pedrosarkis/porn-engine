import cheerio from 'cheerio'
import Video from '../../entities/Video'
import SearchService from '../searchService'
import fs from 'fs'

class XvideosService extends SearchService {
    constructor() {
        super('https://www.xvideos.com')
    }
    
    async search(query: string, page: number = 0) {
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
            const duration: string = $(element).find('.duration').text()
            const tags: string[] = []
            const description: string = ''
            const video: Video = new Video(title, url, tags, description, duration, thumbnail)
            videoList.push(video)
        })

        return videoList

    }
}

export default XvideosService