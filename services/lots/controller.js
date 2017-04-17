const Lot = require('./model')
      User = require('../users/model')

module.exports = {
  newLot: ({body}, res) =>
    new Lot(Object.assign(body))
    .save()
    .then( lot => User.findOneAndUpdate({_id},
      {
        $addToSet:{ownedLots: {$each: [lot._id] }}
      },
      {safe:1, upsert: 1, new: 1}
    )
    .then( lotResponse(lot, res) ))
    .catch(e=>res.status(400).send(e)),

getAllLots: (req, res) => res.json({some: 'lots'})

}
