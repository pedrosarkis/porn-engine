class Video {
    constructor(
        private title: string,
        private url: string,
        private tags: string[],
        private description: string,
        private duration: string,
        private thumbnail: string
        ) {
    }

    getTitle() {
        return this.title
    }

    getThumbnail() {
        return this.thumbnail
    }

    getUrl() {
        return this.url
    }

    getTags() {
        return this.tags
    }

    getDescription() {
        return this.description
    }

    getDuration() {
        return this.duration
    }
}

export default Video