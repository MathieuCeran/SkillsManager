const nodemailer = require('nodemailer');

function sendEmail(message) {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "test",
                pass: "test"
            }
        })

        transporter.sendMail(message, function (err, info) {
            if (err) {
                rej(err)
            } else {
                res(info)
            }
        })
    })
}

exports.sendConfirmationEmail = function ({ toUser, hash }) {
    const message = {
        from: "test",
        to: "test",
        subject: "Modifier votre mot de passe",
        html: `
         <h3> Bonjour ${toUser.name} </h3>
         <p>Vous pouvez modifier votre mot de passe en suivant ce lien : <a href=""> </a>
        `
    }
    return sendEmail(message);
}



exports.sendResetPasswordEmail = (toUser, hash) => {

}