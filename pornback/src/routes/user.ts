import { Router } from "express"
import UserController from "../controller/User"

import authMiddleware from "../middleware/authMiddleware"
import LogMiddleware from "../middleware/logMiddleware"
const router = Router()

router.post('/', (req, res) => UserController.create(req, res))

// router.get('/:id', (req, res) => UserController.findById(req, res))

router.post('/login', (req, res) => UserController.login(req, res))

router.post('/favorite', authMiddleware, (req, res) => UserController.addFavoriteVideo(req, res))

router.get('/favorite', LogMiddleware, authMiddleware, (req, res) => UserController.getFavoriteVideos(req, res))

export default router