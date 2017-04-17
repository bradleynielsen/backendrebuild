const {sign} = require('jsonwebtoken'),
    User = require('../model'),
    {jwt: {secretOrKey, expiresIn}, host, port} = require('../../../config')


// middleware
const signToken = userInfo  => sign(userInfo, secretOrKey, {expiresIn})
const createURL = fileObject => `http://${host}:${port}/${fileObject.filename}`

module.exports = {
  newUser: ({body},res)=> new User(body).save()
  .then(newUser => res.json(
      Object.assign( newUser.toObject() , {token: signToken(newUser._id), password: null})

  )),
  getAllUsers:(req,res)=> User.find().select('-password').then( users => res.json(users)),

  getOneUser: ({params: {_id}}, res) => User.findById(_id).select('-password')
    .then(user => res.json(user))
    .catch(e => res.status(400).send(e.message)),

    // http -f put :3000/lots/58a65006652c886d21bdf990  imgURLs@/Users/joe/Desktop/test4.png name='new place'
  updateProfile: ({body, params:{_id}, files  }, res) =>
  files /* do files exist? */
    ? User.findOneAndUpdate(
      {_id},
      {
        $set:body,
        $addToSet:{imgURLs: {$each: files.map(createURL)}}
      },
      {safe:1, upsert:1, new:1}
    )
    .select('-password')
    .then( updatedUser => res.json(updatedUser))
    .catch(e=> res.status(400).send(e.message))

    : User.findOneAndUpdate({_id}, {$set:body}, {safe:1, upsert:1, new:1})
      .then(updatedUser => res.json(updatedUser))
      .catch(e => res.status(400).send(e.message)),


  }
