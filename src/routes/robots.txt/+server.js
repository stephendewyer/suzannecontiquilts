const site = "https://suzannecontiquilts.vercel.app";

export const GET = async () => {
  const body = `
User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`;

  return new Response(body.trim(), {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};