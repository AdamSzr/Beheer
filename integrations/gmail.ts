import { GMAIL } from "app/config"
import { MailOptions } from "app/core/models/model"
import nodemailer from "nodemailer"

class Gmail {
  private static transporter
  private static isSetup = false

  public static init() {
    if (this.isSetup) return

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL.ADRES_EMAIL,
        pass: GMAIL.PASSWORD,
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
