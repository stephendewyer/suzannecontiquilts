import sgMail from "@sendgrid/mail";
import {SENDGRID_API_KEY} from '$env/static/private';

export async function POST({request}) {

  if (request.method !== 'POST') {
      return new Response(JSON.stringify({error: "method is not a POST"}), {status: 422});
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
      to: 'smconti7@gmail.com',
      from: 'sdewyer@artintechservices.com',
      subject: subject,
      text: 'message sent via Suzanne Conti Quilts contact form',
      html: `<p>Dear Suzanne,<br />,<br />
      You received a new message via the Suzanne Conti Quilts website.  The following is the message:<br /><br />${message} <br /><br />The sender's email is ${email}.</p>`,
    },
    {
      to: email,
      from: 'sdewyer@artintechservices.com',
      subject: `thank you for contacting Suzanne Conti Quilts`,
      text: 'We are happy to say Suzanne Conti Quilts received your message via our website contact form.',
      html: `<p>Dear ${nameFirst} ${nameLast},<br /><br />Thank you for contacting Suzanne Conti Quilts.  We are happy to say Suzanne Conti Quilts received your message via our website contact form.<br /><br />Happy quilting!<br /><br />Suzanne Conti<br />https://suzannecontiquilts.vercel.app/</p>`,
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