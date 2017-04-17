const userRouter = require('express').Router(),
      {getAllUsers, newUser, getOneUser, updateProfile} = require('./controllers/crud'),
      multer = require('multer')

//mids
const upload = multer({storage: multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: ({params}, {originalname}, cb) => {
  cb(null,
    `oid.${params._id}.utc.${new Date().getTime()}.${originalname.slice(-3)}`
  )
}
})})


//routes
userRouter.get('/', getAllUsers)
userRouter.post('/', newUser)
userRouter.get('/:_id', getOneUser)
userRouter.put('/:_id', upload.array('imgURLs'),  updateProfile)

module.exports = userRouter
