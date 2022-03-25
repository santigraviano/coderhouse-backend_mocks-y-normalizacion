import MongoContainer from '../containers/mongodb.js'

class Product extends MongoContainer {
  constructor() {
    super('products', {
      id: String,
      name: String,
      price: Number,
      image: String
    })
  }
}

export default new Product()