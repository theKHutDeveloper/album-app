import express from 'express'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import { albumsRouter } from './routes/albums.js'

const PORT = 8000
const app = express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100,
	standardHeaders: 'draft-8', 
	legacyHeaders: false,
})

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors())
// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use('/api/albums', albumsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}).on('error', (err) => {
  console.error('Error starting server:', err)
})