import MongoContainer from '../containers/mongodb.js'

class Message extends MongoContainer {
  constructor() {
    super('messages', {
      author: {
        email: String,
        name: String,
        lastname: String,
        age: Number,
        alias: String,
        avatar: String
      },
      text: String,
      date: { type: Date, default: Date.now() }
    })
  }
}

export default new Message()