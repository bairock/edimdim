const nodemailer = require('nodemailer')

module.exports = (options) => {
    const mailUser = process.env.MAIL_USER
    const mailPassword = process.env.MAIL_PASSWORD

    if (!mailUser && !mailPassword) throw new Error('mailUser and mailPassword not found')

    const transport = {
        service: 'Yandex',
        auth: {
            user: mailUser,
            pass: mailPassword
        }
    }

    const transporter = nodemailer.createTransport(transport)

    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: mailUser,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('CAN NOT SEND EMAIL', error)
                return reject(false)
            }
            return resolve(true)
        })
    })
}
