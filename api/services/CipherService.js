var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
 
module.exports = {
  secret: sails.config.jwtSettings.secret,
  issuer: sails.config.jwtSettings.issuer,
  audience: sails.config.jwtSettings.audience,
 
  /**
   * Hash the password field of the passed user.
   */
  hashPassword: function (user) {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password);
    }
  },
 
  /**
   * Compare user password hash with unhashed password
   * @returns boolean indicating a match
   */
  comparePassword: function(password, user){
    return bcrypt.compareSync(password, user.password);
  },
 
  /**
   * Create a token based on the passed user
   * @param user
   */
  createToken: async function(user, res)
  {
      console.log('cipher services');
      console.log(user);
      var verifyOptions = {
        algorithm: sails.config.jwtSettings.algorithm,
        expiresIn : sails.config.jwtSettings.expiresInMinutes,
        issuer: sails.config.jwtSettings.issuer,
        audience: sails.config.jwtSettings.audience
       };
       var payload = {
           user:user
       }
    var token = await jwt.sign(
      payload,
      sails.config.jwtSettings.secret,
      verifyOptions
    );
        try {
            res.customOk({      
                token: token,
                user: user
              });        
        } catch (error) {
            res.serverError(error);
        }
    
  }
};