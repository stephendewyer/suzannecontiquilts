import sgMail from "@sendgrid/mail";
import {SENDGRID_API_KEY} from '$env/static/private';
import { json } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export async function POST({request}) {

  const data = await request.json();

  const nameFirst = data.nameFirst;
  const nameLast = data.nameLast;
  const subject = data.subject;
  const email = data.email;
  const message = data.message;

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
  (async () => {
    try {
      await sgMail.send(msg);
      return json(200, { success: 'message sent' });
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
        return fail(422, { message: 'message not sent due to a problem with the API' });
      }
    }
  })();

  // end sending the message

  return json({
    message: "data sent!"
  })
}