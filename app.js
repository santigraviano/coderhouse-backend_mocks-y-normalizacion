import 'dotenv/config'
import './socketio.js'
import server from './server.js'

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

