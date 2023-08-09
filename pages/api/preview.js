import { getPreviewBreweryBySlug } from "../../lib/api";

export default async function preview(req, res) {
  const { secret, slug } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const brewery = await getPreviewBreweryBySlug(slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!brewery) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Draft Mode by setting the cookie
  res.setDraftMode({ enable: true });

  // Redirect to the path from the fetched brewery
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  const url = `/breweries/${brewery.slug}`;
  res.setHeader("Content-Type", "text/html");
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>
    </html>`
  );
  res.end();
}
