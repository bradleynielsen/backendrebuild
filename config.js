const {
  PORT,
  HOST,
  NODE_ENV,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DOMAIN,
  MONGO_DB,
  SECRET,
} = process.env,
{ExtractJwt}=require('passport-jwt')


module.exports = {
  port: PORT || 3090,
  host: HOST || 'localhost',
  mongoURI: NODE_ENV === 'production' && MONGO_USER && MONGO_PASSWORD  && MONGO_DOMAIN &&  MONGO_DB
 ? `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DOMAIN}/${MONGO_DB}`
 : 'mongodb://localhost/early-interest',


jwt:{
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET || 'secret',
  expiresIn:'30 days',
  usernameField:'email'
}
}
