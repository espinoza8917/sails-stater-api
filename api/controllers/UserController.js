/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    testEmail: async (req, res) => {
        let result = await MailerService.sendPasswordReset( 'espinoza8917@gmail.com', 'test', 'test', 'test' );
        res.customOk( result );
    }

};

