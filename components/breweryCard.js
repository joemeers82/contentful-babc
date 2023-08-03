import ContentfulImage from "./contentful-image";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";
export default function BreweryCard({
  title,
  location,
  breweryLogo,
  slug,
  excerpt,
}) {
  return (
    <div
      className="bg-white border shadow overflow-hidden sm:rounded-lg 
                 transform transition duration-500 ease-in-out 
                 hover:-translate-y-1 hover:shadow-xl w-9/12 mx-auto md:w-full"
    >
      <Link href={`brewery/${slug}`}>
        <div className="flex flex-col justify-between h-full">
          <div
            className={`${location
              .toLowerCase()
              .replace(
                /\s/g,
                "-"
              )}-label rounded-lg text-center w-1/2 p-1 text-sm`}
          >
            {location}
          </div>
          <ContentfulImage
            src={breweryLogo.url}
            alt={`${title} Logo`}
            width="200"
            height="200"
            className="mx-auto"
          />
          <div className="py-3 flex border w-full items-center justify-around">
            {title}
            <BsArrowRightCircle />
          </div>
        </div>
      </Link>
    </div>
  );
}
