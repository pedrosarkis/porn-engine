import SearchController from "./searchController"
import SearchRepository from "../repositories/searchRepository"
import AggregatedSearchService from "../repositories/index"

const searchRepository = new SearchRepository(AggregatedSearchService)
const searchController = new SearchController(searchRepository)

export default searchController