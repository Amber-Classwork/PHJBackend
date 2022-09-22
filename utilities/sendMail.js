const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * ### Description
 * This function gets information passed in an object then sends an email using the send grid api to the recipient of the data passed.

 */
exports.sendMail = async (data = {recipient:"test@gmail.com",sender:"vainedev@gmail.com", subject:"Appointment Update", text:"Everything okay", html:"HTML"})=>{
    let mail;
    const msg = {
        to: data.recipient, // Change to your recipient
        from: data.sender ?? "vainedev@gmail.com", // Change to your verified sender
        subject: data.subject,
        text: data.text,
        html: data.html ?? undefined,
      }
  try{  
    console.log(msg)
    mail = await sgMail.send(msg);
  }catch(err){
    console.log(err);
  }
}
