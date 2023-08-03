import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import BreweryCard from "../components/breweryCard";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllBreweries, getAllPostsForHome } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";

export default function Index({ preview, allBreweries }) {
  console.log(allBreweries);
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{`${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
          {allBreweries.map((brewery) => {
            return (
              <BreweryCard
                key={brewery.slug}
                title={brewery.breweryName}
                slug={brewery.slug}
              ></BreweryCard>
            );
          })}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? [];
  const allBreweries = (await getAllBreweries(preview)) ?? [];
  return {
    props: { preview, allBreweries },
  };
}
