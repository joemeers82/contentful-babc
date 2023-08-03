import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreBreweries from "../../components/more-breweries";
import Header from "../../components/header";
import BreweryHeader from "../../components/brewery-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";

import {
  getBreweryAndMoreBreweries,
  getAllBreweriesWithSlug,
} from "../../lib/api";
import PostTitle from "../../components/post-title";
import { CMS_NAME } from "../../lib/constants";

export default function Brewery({ brewery, moreBreweries, preview }) {
  const router = useRouter();
  console.log(brewery);
  if (!router.isFallback && !brewery) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${brewery.breweryName} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                {/* <meta property="og:image" content={post.coverImage.url} /> */}
              </Head>
              <BreweryHeader
                title={brewery.breweryName}
                // coverImage={post.coverImage}
                // date={post.date}
              />
            </article>
            <SectionSeparator />
            {moreBreweries && moreBreweries.length > 0 && (
              <MoreBreweries posts={moreBreweries} />
            )}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getBreweryAndMoreBreweries(params.slug, preview);
  console.log(data);
  return {
    props: {
      preview,
      brewery: data?.brewery ?? null,
      moreBreweries: data?.moreBreweries ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allBreweries = await getAllBreweriesWithSlug();
  return {
    paths: allBreweries?.map(({ slug }) => `/brewery/${slug}`) ?? [],
    fallback: true,
  };
}
