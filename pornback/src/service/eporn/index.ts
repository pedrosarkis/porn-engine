import Video from '../../entities/Video'
import cheerio from 'cheerio'
import SearchService from '../searchService'
import fs from 'fs'
import { Performance } from 'perf_hooks'
class EpornService extends SearchService{

   private sortOptions = {
        viewed: 'most-viewed',
        rating: 'top-rated',
   }
    constructor(private sort: string = '') {
        super('https://www.eporner.com')
    }
    async search(query: string, sort: string) {
        const videoList: Video[] = []
        const time = performance.now()
        const queryFormatted = query.split(' ').join('-')
        
        const data = await this.fetchToText(`${this.baseURL}/search/${queryFormatted}`)
        const $ = cheerio.load(data)
        
        const videos = $('#vidresults .mb')
      // -1 because the last element is the next page button, but i need to review this, cuz it seems not quite right
        
        videos.each((index, element) => {
            const title = $(element).find('.mbtit a').text()
            const url = $(element).find('.mbtit a').attr('href') || ''
            const image = $(element).find('.mbimg img')
            // if image has a class lazyimg search for data-src, else search for src
            const thumbnail = image.attr('data-src') || image.attr('src') || ''
            const tags = $(element).find('.mbunder .mbstats').text().split(' ')
            const description = $(element).find('.mbunder .mbstats').text()
            const duration =  $(element).find('.mbtim').text()
            videoList.push(new Video(title, this.baseURL + url, tags, description, duration, thumbnail))
        })
        
        // if (page <= pagesNumber) {
        //     await this.search(query, page + 1, pagesNumber, videoList)
        // }
        const time2 = performance.now()
        // console.log(`EpornService.search took ${time2 - time} milliseconds`)
        return videoList
    }
}

export default EpornService