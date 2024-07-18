import cheerio from "cheerio";
import Video from "../../entities/Video";
import SearchService from "../searchService";
import { Performance } from "perf_hooks";
import fs from "fs";

class PornzogService extends SearchService {
    constructor() {
        super("https://www.pornzog.com");
    }

    async search(query: string) {
        const time1 = performance.now();
        const videoList: Video[] = [];

        const queryFormatted: string = query.split("-").join("+");
        const url: string = `${this.baseURL}/search/?s=${queryFormatted}`;

        const data: string = await this.fetchToText(url);
        fs.writeFileSync("pornzog.html", data);
        const $ = cheerio.load(data);

        //<ul class="thumbs-list thumbs-videos-list"> query this element 
        const videos = $(".thumbs-list.thumbs-videos-list").find("li");
        videos.each((index, element) => {
            const title: string =$(element).find(".thumb-video-link.test3 .thumb").attr("alt") || "";
            const url: string = this.baseURL + $(element).find(".thumb-video-link.test3").attr("href");
            const thumbnail: string = $(element).find(".thumb-video-link.test3 .thumb").attr("data-original") || "";
            const duration: string = $(element).find(".duration").text();
            const tags: string[] = [];
            const description: string = "";
            const video: Video = new Video(title, url, tags, description, duration, thumbnail);
            videoList.push(video);
        });

        const time2 = performance.now();
        console.log(`PornzogService.search took ${time2 - time1} milliseconds"`)
        return videoList;
    }
}

export default PornzogService;