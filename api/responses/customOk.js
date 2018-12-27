/**
 * 201 (Created) Response
 * Successful generic query occurred (via either GET POST, PUT, PATCH, DELETE).
 * Set the Location header to contain a link 
 * Response body content may or may not be present.
 */
module.exports = function (data, code, message, root) {
    var response = _.assign({
      code: code || 'SUCCESS',
      message: message 
         || 'The request was execute succesfull',
      data: data || {}
    }, root);
   
    this.req._sails.log.silly('Sent (201 customOk)\n', response);
   
    this.res.status(201);
    this.res.json(response);
};