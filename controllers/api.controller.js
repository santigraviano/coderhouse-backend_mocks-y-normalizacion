import faker from 'faker'

class ApiController {
  products(req, res) {
    const products = []

    for (let i = 0; i < 5; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.technics()
      })
    }

    res.json(products)
  }
}

export default new ApiController()