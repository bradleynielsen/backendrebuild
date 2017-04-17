const lotRouter = require('express').Router(),
      {getAllLots, newLot} = require('./controller')

lotRouter.get('/', getAllLots)
lotRouter.post('/', newLot)

module.exports = lotRouter
