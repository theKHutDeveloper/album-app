import express from 'express'
import { albumsRouter } from './routes/albums.js'

const PORT = 8000
const app = express()

app.use('/api/albums', albumsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}).on('error', (err) => {
  console.error('Error starting server:', err)
})