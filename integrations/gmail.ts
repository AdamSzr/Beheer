import { MailOptions } from "app/core/models/model"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
class Gmail {
  private static transporter
  public static email = "beheer.projekt@gmail.com"
  private static password = "beheerprojekt5%"
  private static isSetup = false

  public static init() {
    if (this.isSetup) return

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.email,
        pass: this.password,
      },
    })
    this.isSetup = true
  }

  public static send(to: string, featurName: string) {
    this.init()

    const mailOptions = new MailOptions(to, featurName)

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
