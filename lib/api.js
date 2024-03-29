const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`;

const BREWERY_GRAPHQL_FIELDS = `
slug
breweryName
location {
  lat
  lon
}
breweryLogo {
  url
}
breweryAbout {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
facebookUrl
instagramUrl
phoneNumber
breweryWebsite
locationCategoryName {
  ... on LocationCategory {
    locationCategoryName
  }
}


`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractPostEntries(entries);
}

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? "true" : "false"}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

export async function getPreviewBreweryBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      breweryCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${BREWERY_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractBrewery(entry);
}

export async function getAllBreweries(preview) {
  const entries = await fetchGraphQL(
    `query {
      breweryCollection(limit: 10, order: breweryName_ASC, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${BREWERY_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  console.log(entries);
  return entries?.data?.breweryCollection?.items;
}

function extractBrewery(fetchResponse) {
  return fetchResponse?.data?.breweryCollection?.items?.[0];
}

function extractBreweryEntries(fetchResponse) {
  return fetchResponse?.data?.breweryCollection?.items;
}

export async function getAllBreweriesWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      breweryCollection(where: { slug_exists: true }, order: breweryName_ASC) {
        items {
          ${BREWERY_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return entries?.data?.breweryCollection?.items;
}

export async function getBreweryAndMoreBreweries(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      breweryCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${BREWERY_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      breweryCollection(where: { slug_not_in: "${slug}" }, order: breweryName_ASC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${BREWERY_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    brewery: extractBrewery(entry),
    moreBreweries: extractBreweryEntries(entries),
  };
}
