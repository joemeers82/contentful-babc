import BreweryCard from "./breweryCard";

export default function BreweryList({ allBreweries }) {
  return (
    <>
      <div className="max-w-screen-xl mx-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allBreweries.map((brewery) => {
          return (
            <BreweryCard
              key={brewery.slug}
              location={brewery.locationCategoryName.locationCategoryName}
              title={brewery.breweryName}
              breweryLogo={brewery.breweryLogo}
              slug={brewery.slug}
            ></BreweryCard>
          );
        })}
      </div>
    </>
  );
}
