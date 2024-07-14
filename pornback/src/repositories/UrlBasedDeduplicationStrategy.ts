import Video from '../entities/Video'
import DeduplicationStrategy from '../entities/IVideoDeduplicationStrategy'

export default class UrlBasedDeduplicationStrategy implements DeduplicationStrategy {
  deduplicate(videos: Video[]): Video[] {
    const uniqueVideos = new Map<string, Video>()
    for (const video of videos) {
      uniqueVideos.set(video.getUrl(), video)
    }
    return Array.from(uniqueVideos.values())
  }
}