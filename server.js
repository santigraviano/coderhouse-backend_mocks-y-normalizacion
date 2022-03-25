import http from 'http'
import express from 'express'
import mainRoutes from './routes/main.routes.js'
import apiRoutes from './routes/api.routes.js'

const app = express()
const server = http.createServer(app)

// Global Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes
app.use('/api', apiRoutes)
app.use('/', mainRoutes)

// Views bootstrapping
app.set('views', './views')
app.set('view engine', 'pug')

export default server