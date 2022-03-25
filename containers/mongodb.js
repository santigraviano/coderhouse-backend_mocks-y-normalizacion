import mongoose from 'mongoose'
import config from '../config.js'
import { serializeItems } from '../util/index.js'

try {
  const { protocol, user, pass, host, database, params } = config.mongo
  const URI = `${protocol}://${user}:${pass}@${host}/${database}?${params}`
  await mongoose.connect(URI)
}
catch(e) {
  console.error(e.message, e.stack)
}

class MongoContainer {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, new mongoose.Schema(schema, { versionKey: false }))
  }

  async getAll() {
    const items = serializeItems(await this.model.find({}).lean())
    return items
  }

  async getById(id) {
    const item = await this.model.findById(id).lean()
    if (!item) throw new Error('Item not found')
    return item
  }

  async save(data) {
    const { _id } = await this.model.create(data)
    return _id
  }

  async update(id, data) {
    const item = await this.model.findByIdAndUpdate(id, data)
    if (!item) throw new Error('Item not found')
  }

  async delete(id) {
    const item = await this.model.findByIdAndDelete(id)
    if (!item) throw new Error('Item not found')
  }

  async deleteAll() {
    await this.model.deleteMany({})
  }
}

export default MongoContainer