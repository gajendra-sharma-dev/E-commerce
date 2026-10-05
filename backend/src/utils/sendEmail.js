import nodemailer from "nodemailer"

const sendEmail = async(to,subject,text)=>{
  try {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.NODEMAILER_USER,
            pass:process.env.NODEMAILER_PASSWORD
        }
    })

    const mailOptions = {
        from:process.env.NODEMAILER_USER,
        to,
        subject,
        text
    }
    await transporter.sendMail(mailOptions)
}catch (error) {
    console.log(error)
  }


  } 


  export default sendEmail
