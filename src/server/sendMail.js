var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ribbonf297@gmail.com',
    pass: 'Text$100'
  }
});

var mailOptions = {
  from: 'ribbonf297@gmail.com',
  to: '',
  subject: 'Password Reset RibbonFlo',
  html: ''
};




module.exports = function sendMail(myMailOptions){
    mailOptions.to = myMailOptions.to;
    mailOptions.html = myMailOptions.html;
    mailOptions.subject = myMailOptions.subject;
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });

}