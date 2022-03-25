import Product from '../models/Product.js'

class MainController {

  index(req, res) {
    res.render('index')
  }

  show(req, res) {
    res.render('products')
  }
}

export default new MainController()