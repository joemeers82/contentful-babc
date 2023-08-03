import { useState } from "react";

import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import BreweryList from "../components/breweryList";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllBreweries, getAllPostsForHome } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";

export default function Index({ preview, allBreweries }) {
  console.log(allBreweries);
  const locales = [
    "North Bay",
    "East Bay",
    "South Bay",
    "San Francisco",
    "Peninsula",
  ];
  const [selectedLocale, setSelectedLocale] = useState("All Bay Area");
  const filteredBreweries =
    selectedLocale === "All Bay Area"
      ? allBreweries
      : allBreweries.filter(
          (b) => b.locationCategoryName.locationCategoryName === selectedLocale
        );

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{`${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
          <div className="w-full pb-10 mb-10">
            <ul className="flex gap-1 md:gap-3 flex-col md:flex-row">
              <li
                className="rounded-lg border p-2 md:p-1 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-gray-300"
                onClick={() => setSelectedLocale("All Bay Area")}
              >
                All Bay Area
              </li>
              {locales.map((locale) => {
                return (
                  <li
                    className={`${locale
                      .toLowerCase()
                      .replace(
                        /\s/g,
                        "-"
                      )}-label rounded-lg text-center flex items-center justify-center p-2 md:p-1 flex-1 text-sm cursor-pointer transition-colors duration-200 hover:bg-gray-300`}
                    onClick={() => setSelectedLocale(locale)}
                  >
                    {locale}
                  </li>
                );
              })}
            </ul>
          </div>
          <BreweryList allBreweries={filteredBreweries} />
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
