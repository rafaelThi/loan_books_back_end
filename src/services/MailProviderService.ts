import nodemailer from 'nodemailer';

interface IEmailDTO {
  email: string;
  messageMail: {
    title: string;
    body: string
  };
}

export default class MailProvider {
  public async execute({ email, messageMail }:IEmailDTO): Promise<void> {
    const sendMail = nodemailer.createTestAccount().then(async (account) => {
      const transporter = await nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      console.log(account);
      const Html = `<h1>${messageMail.title}</h1>
<p>${messageMail.body}</p>
`;
      const client = transporter;
      const message = await client.sendMail({
        from: 'Equipe Loan Books <contato@contato.com>',
        to: email,
        subject: `${messageMail.title}✔`,
        html: Html,
      });
      console.log('Message sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    });
    return sendMail;
  }
}
