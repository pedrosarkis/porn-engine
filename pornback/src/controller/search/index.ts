import SearchController from "./searchController"
import SearchRepository from "../../entities/searchRepository"
import AggregatedSearchService from "../../service/index"

const searchRepository = new SearchRepository(AggregatedSearchService)
const searchController = new SearchController(searchRepository)

export default searchController