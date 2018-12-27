var nodeMailer = require("nodemailer");
var Email = require('email-templates');

const config = sails.config.custom.mailer;
const sender = config.auth.user; 

const transporter = nodeMailer.createTransport({
    host:   config.host,
    port:   465,
    secure: true, // true for 465, false for other ports
    auth:   config.auth,
    tls: {
        rejectUnauthorized: false //for development
    }
});

const email = new Email({
    message: {
        from: sender
    },
    transport: {
        jsonTransport: true
    },
    views: {
        options: {
          extension: 'ejs' // <---- HERE for enable "ejs" engine, if not the app will use "pug" by default
        }
    }
});

module.exports = {
    sendPasswordReset: ( emailAddress, username, name, tokenUrl ) => {
        email.render( '../templates/resetPassword/html',
                {
                name:       name,
                username:   username,
                token:      tokenUrl
            }
        )
        .then( res=> {            
            transporter.sendMail( { 
                from:       sender,
                to:         emailAddress,
                subject:    'Password Reset - domain.com',                    
                html:       res, // html body
            }, ( error, info ) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            })
                
        } )
        .catch(
            console.error
        )    
    }
}
