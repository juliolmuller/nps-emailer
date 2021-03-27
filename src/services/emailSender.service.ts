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

  async submit(to: string, subject: string, body: string) {
    const client = await this.clientPromise
    const message = await client.sendMail({
      to,
      subject,
      html: body,
      from: 'NPS <noreply@lacussoft.com>',
    })

    console.log(`Message sent: ${message.messageId}`)
    console.log(`Message URL: ${getTestMessageUrl(message)}`)
  }
}

export default new EmailSender()
