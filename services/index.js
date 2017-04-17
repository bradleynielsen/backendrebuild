const router = require('express').Router()
      lotRouter = require('./lots/router'),
      userRouter = require('./users/router'),


  router.use('/users', userRouter)
  router.use('/lots', lotRouter)




module.exports = router
