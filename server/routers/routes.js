const express = require('express');
const routes = express()
const { getPacks, getProducts, updateProductData } = require(`../controllers/products`)


routes.get(`/`, getProducts)
routes.get(`/packs`, getPacks)

routes.put('/', updateProductData);

module.exports = routes