const mongoose = require('mongoose'),
      {Schema} = require('mongoose'),
      {Types: {ObjectId}} = Schema


const lotSchema = new Schema({
  imgURLs: [{type: String}],
  interests:{type:Number, default: 0},
  address:{type: String, },
  lat:{type: Number, },
  lng:{type: Number, },
  beds: {type: Number},
  baths: {type: Number},
  description: {type: String},
  year_built: {type: Number},
  sqft: {type: Number, required: true},
  price: {type: Number, required: true},
  sqft_range: {type: String},
  price_range: {type: String},
  owner_id: {type: ObjectId, ref:'User', required: true},
  overview:{type:String},
  protectedOverview: {type: String},
  details: [{
    title: String,
    imgURLs: [{type: String}],
    points: [ {type:String}]
  }],
  propertyDetails: {
    keyFacts:[{type: String}],
    extras:[{type: String}],
    schools:[{type: String}],
  }

})


const getPriceRange = num =>{

  switch (true) {
    case num < 100000 : return 'Under $100000:'
    case num >= 100000 && num < 150000: return '$100K - $150K'
    case num >= 150000 && num < 200000: return '$150K - $200K'
    case num >= 200000 && num < 300000: return '$200K - $300K'
    case num >= 300000 && num < 400000: return '$300K - $400K'
    case num >= 400000 && num < 500000: return '$400K - $500K'
    case num >= 500000 && num < 750000: return '$500K - $750K'
    case num >= 750000 && num < 1000000: return '$750K - $1M'
    case num >= 1000000 && num < 1500000: return '$1M - $1.5M'
    case num >= 1500000 && num < 2000000: return '$1.5M - $2M'
    case num >= 2000000 && num <= 3000000: return '$2M - $3M'
    case num > 3000000: return 'Over $3M'
  }
  return 'Not within range.'
}


const getSqftRange = num =>{

  switch (true) {
    case num < 1000 : return 'Under 1000 sqft'
    case num >= 1000 && num < 1500: return '1000 - 1500 sqft'
    case num >= 1500 && num < 2000: return '1500 - 2000 sqft'
    case num >= 2000 && num < 2500: return '2000 - 2500 sqft'
    case num >= 3000 && num < 4000: return '3000 - 4000 sqft'
    case num >= 4000 && num <= 5000: return '4000 - 5000 sqft'
    case num > 5000: return 'Over 5000 sqft'
  }
  return 'Not within range.'
}

// // get the acreage
// const getLotsizeRange = num =>{
//   witch (true) {
//     // ots sizes - >.25 Acres, .50-.25 Acres, 1-.50 Acres, 1-2 Acres, <2 Acres
//     case num < .25 : return 'Under .25 acres'
//     case num >= .25 && num < .50: return '.25 - .50 sqft'
//     case num >= .50 && num < 2000: return '1500 - 2000 sqft'
//     case num >= 2000 && num < 2500: return '2000 - 2500 sqft'
//     case num >= 3000 && num < 4000: return '3000 - 4000 sqft'
//     case num >= 4000 && num <= 5000: return '4000 - 5000 sqft'
//     case num > 5000: return 'Over 5000 sqft'
//
//   }
// //   return 'Not within range.'
// }
// }


lotSchema.pre('save', function(next){
  this.price_range = getPriceRange(this.price)
  this.sqft_range = getSqftRange(this.sqft)
  // this.lotsize_range = getLotsizeRange(this.lotsize)


  next()
})


module.exports = mongoose.model('Lot', lotSchema)
