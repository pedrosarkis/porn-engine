import Video from "../entities/Video";

interface VideoDeduplicationStrategy {
    deduplicate(videos: Video[]): Video[];
  }

export default VideoDeduplicationStrategy