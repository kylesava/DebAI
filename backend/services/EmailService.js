const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("./AuthService");

class EmailService{

    async sendEmail({subject,text,html,email}){



    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: 'santehero8@gmail.com',
        pass: 'vqok fser mcni vitr'
    },
  });

  try {
    
      let info = await transporter.sendMail({
    from:process.env.APP_EMAIL, 
    to: email, 
    subject, 
    text,
    html, 
});

  console.log("Message sent: %s", info.messageId);
  return info.messageId;

} catch (error) {
    return error.message;
}
    }

    async confirmationEmail({text,subject,html,email}){
        const emailPayload = {
            text,
            subject,
            html,
            email,
        }
        try {
              const messageId =   await this.sendEmail(emailPayload)
              return messageId;

        } catch (error) {
            console.log(error)
            return error;            

        }

    }


       createEmailConfirmationHash(email){



     const hash =    this.createEmailToken(email);
     console.log(hash)
     return hash;
    
  }

   createEmailToken(email){
 
        const token = jwt.sign({email},process.env.CONFIRMATION_HASH,{expiresIn:60*10})
         return token;

   
  }

  async verifyEmailConfirmationToken(token){
    console.log("inside verify 0",token);
    try {
        
        const decoded =  jwt.verify(token,process.env.CONFIRMATION_HASH)
        console.log("inside verify");


        
        return {email:decoded?.email, exp:false, invalidLink:false}
    } catch (error) {
        console.log(error)
                return {email:null, exp:true, invalidLink:false}
            
    }
    }

}

module.exports = new EmailService()