const posts = [
  {title: "Joy to the World Baby Quilt", slug: "joy-to-the-world-baby-quilt", updatedAt: "04-April-2023"},
  {title: "Idaho", slug: "idaho", updatedAt: "04-April-2023"},
  {title: "New England", slug: "new-england", updatedAt: "04-April-2023"},
  {title: "Tennessee", slug: "tennessee", updatedAt: "04-April-2023"},
  {title: "Utah", slug: "utah", updatedAt: "04-April-2023"},
  {title: "Savannah", slug: "savannah", updatedAt: "04-April-2023"},
  {title: "Maine", slug: "maine", updatedAt: "04-April-2023"},
  {title: "Virginia", slug: "virginia", updatedAt: "04-April-2023"},
  {title: "Alaska North Pole", slug: "alaska-north-pole", updatedAt: "04-April-2023"},
  {title: "North Carolina", slug: "north-carolina", updatedAt: "04-April-2023"},
  {title: "Florida", slug: "florida", updatedAt: "04-April-2023"},
  {title: "Michigan", slug: "michigan", updatedAt: "04-April-2023"},
  {title: "Oregon", slug: "oregon", updatedAt: "04-April-2023"},
  {title: "Montana Dinosaurs", slug: "montana-dinosaurs", updatedAt: "04-April-2023"},
  {title: "Wyoming Dinosaurs", slug: "wyoming-dinosaurs", updatedAt: "04-April-2023"},
  {title: "Georgia", slug: "georgia", updatedAt: "04-April-2023"},
  {title: "Vermong", slug: "vermont", updatedAt: "04-April-2023"},
  {title: "South Carolina", slug: "south-carolina", updatedAt: "04-April-2023"},
  {title: "Arizona", slug: "arizona", updatedAt: "04-April-2023"},
  {title: "Nebraska", slug: "nebraska", updatedAt: "04-April-2023"},
  {title: "Montana", slug: "montana", updatedAt: "04-April-2023"},
  {title: "Louisiana", slug: "louisiana", updatedAt: "04-April-2023"},
  {title: "Mississippi", slug: "mississippi", updatedAt: "04-April-2023"},
  {title: "Massachusetts", slug: "massachusetts", updatedAt: "04-April-2023"},
  {title: "New Mexico", slug: "new-mexico", updatedAt: "04-April-2023"},
  {title: "Delaware", slug: "delaware", updatedAt: "04-April-2023"},
  {title: "Kansas", slug: "kansas", updatedAt: "04-April-2023"},
]

const pages = ["quilts", "about", "contact", "colophon"] //list of pages as a string ex. ["about", "blog", "contact"]

const site = "https://suzannecontiquilts.vercel.app"

/** @type {import('./$types').RequestHandler} */
export async function GET({
    url
}) {
    const body = sitemap(posts, pages);
    const response = new Response(body);
    response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
    response.headers.set('Content-Type', 'application/xml');
    return response;
}

const sitemap = (posts, pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${site}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  ${pages.map((page) => `
  <url>
    <loc>${site}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `).join('')}
  ${posts.map((post) => post.visible ? null : `
  <url>
    <loc>${site}/quilts/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${post.updatedAt}</lastmod>
    <priority>0.3</priority>
  </url>
  `
		)
		.join('')}
</urlset>`;