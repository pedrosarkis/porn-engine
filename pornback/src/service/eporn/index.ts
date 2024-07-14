import Video from '../../entities/Video'
import cheerio from 'cheerio'
import SearchService from '../searchService'
import fs from 'fs'
class EpornService extends SearchService{
   
    constructor() {
        super('https://www.eporner.com')
    }
    async search(query: string, page: number = 1, pages: number = 1, videoList: Video[] = []) {
        const queryFormatted = query.split(' ').join('-')
        const pageString = page > 1 ? page : ''
        const data = await this.fetchToText(`${this.baseURL}/search/${queryFormatted}`)
        const $ = cheerio.load(data)
        fs.writeFileSync('eporn.html', data)
       
        
        const videos = $('#vidresults .mb')
        const pagesNumber = pages > 1 ? pages : $('.numlist2 a').length - 1 // -1 because the last element is the next page button, but i need to review this, cuz it seems not quite right
        
        videos.each((index, element) => {
            const title = $(element).find('.mbtit a').text()
            const url = $(element).find('.mbtit a').attr('href') || ''
            const thumbnail = $(element).find('.mbimg img').attr('data-src') || ''
            console.log('thumbnail', thumbnail)
            const tags = $(element).find('.mbunder .mbstats').text().split(' ')
            const description = $(element).find('.mbunder .mbstats').text()
            const duration =  $(element).find('.mbtim').text()
            videoList.push(new Video(title, this.baseURL + url, tags, description, duration, thumbnail))
        })
        
        // if (page <= pagesNumber) {
        //     await this.search(query, page + 1, pagesNumber, videoList)
        // }
        return videoList
    }
}

export default EpornService