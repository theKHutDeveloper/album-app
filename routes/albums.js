import express from 'express'
import { getAlbums, getGenres } from '../controllers/albumControllers.js'

export const albumsRouter = express.Router()

albumsRouter.get('/genres', getGenres)
albumsRouter.get('/', getAlbums)