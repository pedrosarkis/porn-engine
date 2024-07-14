import EpornService from '../service/eporn/index'
import XvideosService from '../service/xvideos/index'  
import PornHubService from '../service/pornhub/index'
import AggregatedSearchService from './AggregatedSearchService'
import YepTubeService from '../service/yeptube/index'
import XhamsterService from '../service/xhamster/index'
import UrlBasedDeduplicationStrategy from './UrlBasedDeduplicationStrategy'
import TxxxService from '../service/txxx/index'
import SpankBang from '../service/spankbang/index'
import RedtubeService from '../service/redtube'

const epornService = new EpornService()
const xvideosService = new XvideosService()
const pornhubService = new PornHubService()
const yeptubeService = new YepTubeService()
const xhamsterService = new XhamsterService()
const txxxService = new TxxxService()
const spankBangService = new SpankBang()
const redtubeService = new RedtubeService()
const deduplicationStrategy = new UrlBasedDeduplicationStrategy()


const aggregatedSearchService = new AggregatedSearchService(
    [
        redtubeService,
        epornService,
        xvideosService,
        pornhubService,
        yeptubeService,
        xhamsterService,
        txxxService,
        spankBangService
    ],
    deduplicationStrategy
)

export default aggregatedSearchService
