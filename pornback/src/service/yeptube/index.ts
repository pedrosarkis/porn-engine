import SearchService from "../searchService"
import cheerio from 'cheerio'
import fs from 'fs'
import Video from "../../entities/Video"

class YepTubeService extends SearchService {
  constructor() {
    super('https://www.yeptube.com/search/videos')
  }

  async search(query: string) {
	const videoList: Video[] = []
	const queryFormatted = query.split(' ').join('+')
	
	const url = `${this.baseURL}/${queryFormatted}`

	const data = await this.fetchToText(url)
	const $ = cheerio.load(data, { xmlMode: true })
	const videos = $('ins')

	videos.each((_, element) => {
		const title = $(element).find('img').attr('alt') || ''
		const url = this.baseURL.replace('search/videos', '') + $(element).find('a').attr('href') || ''
		const thumbnail = $(element).find('img').attr('src') || ''
		const duration = $(element).find('span.time').text() || ''
		videoList.push(new Video(title, url, [], '', duration, thumbnail))

	})	
	return videoList
}
}

export default YepTubeService