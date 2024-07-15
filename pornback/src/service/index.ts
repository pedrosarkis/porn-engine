import EpornService from './eporn/index'
import XvideosService from './xvideos/index'  
import PornHubService from './pornhub/index'
import AggregatedSearchService from './AggregatedSearchService'
import YepTubeService from './yeptube/index'
import XhamsterService from './xhamster/index'
import TxxxService from './txxx/index'
import SpankBang from './spankbang/index'
import RedtubeService from './redtube'

const epornService = new EpornService()
const xvideosService = new XvideosService()
const pornhubService = new PornHubService()
const yeptubeService = new YepTubeService()
const xhamsterService = new XhamsterService()
const txxxService = new TxxxService()
const spankBangService = new SpankBang()
const redtubeService = new RedtubeService()


const aggregatedSearchService = new AggregatedSearchService(
    [
        xvideosService,
        epornService,
        pornhubService,
        yeptubeService,
        xhamsterService,
        txxxService,
        spankBangService,
        redtubeService,
    ]
)

export default aggregatedSearchService
