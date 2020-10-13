import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox6dc95a40763144f59f34911bf0fb8eaf.mailgun.org",
});

interface IEmailHandle {
  sendEmail: (
    subject: string,
    html: string
  ) => Promise<Mailgun.messages.SendResponse>;
  sendVerificationEmail: (
    fullName: string,
    key: string
  ) => Promise<Mailgun.messages.SendResponse>;
}

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "itnico.las.me@gmail.com",
    to: "itnico.las.me@gmail.com",
    subject,
    html,
  };
  return mailGunClient.messages().send(emailData);
};

const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};

export const EmailHandle: IEmailHandle = {
  sendVerificationEmail,
  sendEmail,
};
