import ISearchRepository from "./ISearchRepository"

class SearchRepository implements ISearchRepository {
    searchService: any
    constructor(searchService: any) {
       this.searchService = searchService
    }
    search(query: string, sort: string = ''): Promise<any[]> {
        return Promise.resolve(this.searchService.search(query, sort))
    }
}

export default SearchRepository