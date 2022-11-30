const cds = require('@sap/cds');
const { Books } = cds.entities;
const SapCfMailer = require('sap-cf-mailer').default;
const transporter = new SapCfMailer("MAILTRAP");

module.exports = cds.service.impl(async function () {
    
    this.after('CREATE', 'Books', async (req, res) => {
        try {
            // use sendmail as you should use it in nodemailer
            const result = await transporter.sendMail({
                to: 'someoneimportant@sap.com',
                subject: `This is the mail subject`,
                text: `body of the email`
            });
            return result;

        } catch (error) {
            return  "Something went wrong";
        }
    });

    /**
     * Function to Insert an entry into custom table.
     */
       this.on('triggerMail', async (req) => {
        try {
            // use sendmail as you should use it in nodemailer
             let receiptiant = req.data.mailID;
            const result = await transporter.sendMail({
                to: receiptiant,
                subject: `Automated Email for BTP`,
                text: `Mail successfully triggered from Node.js endpoint`
            });
            return result;

        } catch (error) {
            return  "Something went wrong";
        }
    });
  
});