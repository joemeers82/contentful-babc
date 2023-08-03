import Link from "next/link";
export default function BreweryCard({ title, slug, excerpt }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <Link href={slug}>{title}</Link>
    </div>
  );
}
