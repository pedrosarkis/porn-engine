import { Router } from 'express'
import SearchController from '../controller/search/index'

const router = Router()

router.get('/', (req, res) => {
  SearchController.search(req, res)
})

export default router