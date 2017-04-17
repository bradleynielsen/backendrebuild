const mongoose = require('mongoose'),
      {Schema} = require('mongoose'),
      {Types: {ObjectId}} = Schema,
      {hashSync, genSaltSync} = require('bcryptjs')



const userSchema =  new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {type: String, required: [true, 'Must provide a password.']},
  name:{type: String, required: [true, 'Must provide your name,']},
  imgURLs: [{type: String}],
  customer: {type:String}, //reference to stripe customer id,
  credits: {type:Number, default: 0,  min:0 }, //user credit state
  watchedLots: [{type: ObjectId, ref:'Lot'}],
  bio: {type:String },
  ownedLots: [{type: ObjectId, ref:'Lot'}]
})

userSchema.pre('save', function(next){
  this.password = hashSync(this.password, genSaltSync(10));
  next()
})

userSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true
  next()
})


module.exports = mongoose.model('user', userSchema)
