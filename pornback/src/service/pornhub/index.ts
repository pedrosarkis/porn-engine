import cheerio from 'cheerio'
import Video from '../../entities/Video'
import SearchService from '../searchService'
import fs from 'fs'
import { Performance } from 'perf_hooks'
import IVideoFilter from '../../entities/ISearchFilter'
class PornhubService extends SearchService {
    private SORT_CONST = 'o'
    //recent: `${this.SORT_CONST}=mr`,
    private sortOptions: { [key: string]: string } = {
        views: `${this.SORT_CONST}=mv`,
        rating: `${this.SORT_CONST}=tr`,

    }

    constructor() {
        super('https://www.pornhub.com')
    }

    async search(query: string, sort: string) {
        const time = performance.now()
        const videoList: Video[] = []
        const queryFormatted = query.split(' ').join('+')
        let url = `${this.baseURL}/video/search?search=${queryFormatted}`
        if (sort) {
            url += `&${this.sortOptions[sort]}`
        }
     
        const data = await (await fetch(url)).text()
        const $ = cheerio.load(data)
        const videos = $('div[data-action="search"]')
        videos.each((index, element) => {
            const title = this.normalizeData($(element).find('.title').text())
            const url = this.baseURL + $(element).find('.title a').attr('href')
            const thumbnail = $(element).find('.videoThumb').attr('src') || ''
            const duration = this.normalizeData($(element).find('.duration').text()) 
            const tags: string[] = []
            const description = ''
            const video = new Video(title, url, tags, description, duration, thumbnail)
            videoList.push(video)
        })
        const time2 = performance.now()
        console.log(`PornhubService.search took ${time2 - time} milliseconds`)
        return videoList
    }
}

export default PornhubService