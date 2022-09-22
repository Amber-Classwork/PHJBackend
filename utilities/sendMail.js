const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * ### Description
 * This function gets information passed in an object then sends an email using the send grid api to the recipient of the data passed.
 * @returns Promise of a message that is to be sent with the email passed
 */
exports.sendMail = (data = {recipient:"vainedev@gmail.com",sender:"vainedev@gmail.com", subject:"Appointment Update", text:"Everything okay", html:"HTML"})=>{
    const msg = {
        to: data.recipient, // Change to your recipient
        from: data.sender, // Change to your verified sender
        subject: data.subject,
        text: data.text,
        html: data.html ?? undefined,
      }
    
    return sgMail.send(msg);
}
