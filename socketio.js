import { Server } from 'socket.io'
import { normalize, schema } from 'normalizr'
import server from './server.js'
import Message from './models/Message.js'

const io = new Server(server)

const getNormalizedMessages = async () => {
  const data = await Message.getAll()

  const author = new schema.Entity('authors', {}, { idAttribute: 'email' })
  const message = new schema.Entity('messages', { author }, { idAttribute: '_id' })
  const dataSchema = new schema.Entity('data', { data: [message] })

  const normalizedData = normalize({ id: 'messages', data }, dataSchema)

  return normalizedData
}

io.on('connection', async (socket) => {

  const messages = await getNormalizedMessages()
  socket.emit('messages update', JSON.stringify(messages))

  socket.on('new message', async (data) => {
    const { email, name, lastname, age, alias, avatar, text } = JSON.parse(data)
    
    const message = {
      author: {
        email,
        name,
        lastname,
        age,
        alias,
        avatar
      },
      text
    }

    await Message.save(message)

    const messages = await getNormalizedMessages()
    io.emit('messages update', JSON.stringify(messages))
  })
})

export default io