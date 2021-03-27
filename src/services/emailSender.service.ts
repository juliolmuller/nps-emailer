import fs from 'fs'
import handlebars from 'handlebars'
import { createTestAccount, createTransport, getTestMessageUrl, Transporter } from 'nodemailer'

class EmailSender {

  private clientPromise: Promise<Transporter>

  constructor() {
    this.init()
  }

  private init() {
    this.clientPromise = new Promise((resolve, reject) => {
      createTestAccount()
        .then((account) => createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        }))
        .then(resolve)
        .catch(reject)
    })
  }

  async submit(to: string, subject: string, templatePath: string, variables = {}) {
    const templateText = fs.readFileSync(templatePath).toString('utf8')
    const html = handlebars.compile(templateText)(variables)

    const client = await this.clientPromise
    const message = await client.sendMail({
      from: 'NPS <noreply@lacussoft.com>',
      to,
      subject,
      html,
    })

    console.log(`Message sent: ${message.messageId}`)
    console.log(`Message URL: ${getTestMessageUrl(message)}`)
  }
}

export default new EmailSender()
