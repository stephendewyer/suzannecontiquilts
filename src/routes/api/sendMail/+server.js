import sgMail from "@sendgrid/mail";
import {SENDGRID_API_KEY} from '$env/static/private';

export async function POST({request}) {

  if (request.method !== 'POST') {
      return;
  }

  const data = await request.json();

  const nameFirst = data.nameFirst;
  const nameLast = data.nameLast;
  const subject = data.subject;
  const email = data.email;
  const message = data.message;

  if (
    !nameFirst ||
    !nameLast ||
    !subject ||
    !email ||
    !message 
  ) {
    return new Response(JSON.stringify({error: "missing form data"}), {status: 422});
  }

  if (
    !email.includes('@')
  ) {
    return new Response(JSON.stringify({error: "missing an @ symbol in email address"}), {status: 422});
  }

  // begin sending the message

  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = [
    {
      to: 'sdewyer@artintechservices.com',
      from: 'sdewyer@artintechservices.com',
      subject: subject,
      text: 'message sent via Suzanne Conti Quilts contact form',
      html: `${message} <br /><br />Sender email: ${email}`,
    },
    {
      to: 'stephen.dewyer@stephengdewyer.info',
      from: 'sdewyer@artintechservices.com',
      subject: `message receipt`,
      text: 'Your message was sent via the Suzanne Conti Quilts contact form.',
      html: `<p>Dear ${nameFirst} ${nameLast},<br /><br />Thank you for contacting Suzanne Conti Quilts.  Your email has been received.<br /><br />Sincerely,<br /><br />Suzanne Conti<br />https://suzannecontiquilts.vercel.app/</p>`,
    },
  ];

  try {
    await sgMail.send(msg);
    console.log("message sent");
    return new Response(JSON.stringify({success: "data sent"}), {status: 200})
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({error: "message not sent due to a problem with the API"}), {status: 422});
  }

  // end sending the message

}