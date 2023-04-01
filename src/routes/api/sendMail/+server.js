import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY } from '$env/static/private';

export const GET = async ({ request }) => {
  console.log(SENDGRID_API_KEY);

  const data = await res.json();

  return new Response(JSON.stringify(data), { status: 200})
}

// sgMail.setApiKey(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);

// export async function get(page) {
//       const msg = {
//         to: "test@example.com",
//         from: "test@example.com",
//         subject: "Sending with SendGrid is Fun",
//         text: "and easy to do anywhere, even with Node.js",
//         html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//       };
//       console.log("Form submitted");
//       const output = await sgMail.send(msg);
//   return {
//     body: output,
//   };
// }

