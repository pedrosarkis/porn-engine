import cheerio from 'cheerio'
import Video from '../../entities/Video'
import SearchService from '../searchService'
import fs from 'fs'
import { Performance } from 'perf_hooks'

class RedtubeService extends SearchService {
    constructor() {
        super('https://www.redtube.com')
    }
    
    async search(query: string, page: number = 0) {
        const time = performance.now()
        const videoList: Video[] = []
        
        const queryFormatted: string = query.split('-').join('+')
        const url: string = `${this.baseURL}/?search=${queryFormatted}`
     
        const data: string = await this.fetchToText(url)

        const $ = cheerio.load(data)
        
        const videos = $('.video_link')
        videos.each((index, element) => {
            const videoId = $(element).attr('href')?.replace('/', '')
            const url = `${this.baseURL}/${videoId}`
            //search tag a with attribute href equals videoId
            const title = this.normalizeData(  $(element).find('img').attr('alt') || ''); 
           
            const thumbnail: string = $(element).find('img').attr('data-o_thumb') || ''
            const duration: string = this.normalizeData($(element).find('.tm_video_duration').text()) 
            const tags: string[] = []
            const description: string = ''
            const video: Video = new Video(title, url, tags, description, duration, thumbnail)
            videoList.push(video)
        })
        const time2 = performance.now()
        // console.log(`RedtubeService.search took ${time2 - time} milliseconds"`)

        return videoList

    }
}

export default RedtubeService