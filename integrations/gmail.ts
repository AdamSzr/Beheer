import { MailOptions } from "app/core/models/model"
import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
class Gmail {
  private static transporter
  public static isSetup: false

  public static init() {
    if (this.isSetup) return

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "beheer.projekt@gmail.com",
        pass: "beheerprojekt5%",
      },
    })
  }

  public static send(options: MailOptions) {
    this.init()

    var mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    }

    Gmail.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log("Email sent: " + info.response)
      }
    })
  }
}

export default Gmail
