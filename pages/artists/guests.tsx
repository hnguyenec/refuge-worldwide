import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import GuestRow from "../../components/guestRow";
import Badge from "../../components/badge";
import Layout from "../../components/layout";
import Pill from "../../components/pill";
import PageMeta from "../../components/seo/page";
import { getArtistsPage } from "../../lib/contentful/pages/artists";
import { sortAndGroup } from "../../util";
import useArtistsGuests from "../../hooks/useArtistsGuests";
import { ARTISTS_GUESTS_PAGE_SIZE } from "../../lib/contentful/pages/artists";
import LoadMore from "../../components/loadMore";

export async function getStaticProps({ preview = false }) {
  return {
    props: {
      preview,
      guests: await getArtistsPage(false, ARTISTS_GUESTS_PAGE_SIZE, 0),
    },
  };
}

export default function GuestsPage({
  preview,
  guests: fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { guests, loadMore, isReachingEnd, isValidating, isLoading, isError } =
    useArtistsGuests(fallbackData);
  const sections = sortAndGroup(guests);

  return (
    <Layout preview={preview} className="bg-purple">
      <PageMeta title="Guests | Refuge Worldwide" path="guests/" />

      <div>
        <section className="p-4 sm:p-8">
          <Pill outline>
            <h1>Artists A-Z</h1>
          </Pill>

          <div className="h-8" />

          <ul className="w-full flex flex-wrap leading-none gap-2">
            <Link
              href="/artists"
              className="focus:outline-none focus:ring-4 rounded-full"
            >
              <Badge text={"Residents"} />
            </Link>

            <Link
              href="/artists/guests"
              className="focus:outline-none focus:ring-4 rounded-full"
            >
              <Badge invert text={"Guests"} />
            </Link>
          </ul>
        </section>

        {sections.map(
          (section, i) =>
            (section.alphabet !== "#" || isReachingEnd) && (
              <GuestRow key={i} {...section} />
            )
        )}

        {!isReachingEnd && (
          <div className="flex justify-center mt-10 sm:mt-8">
            <button
              onClick={loadMore}
              className="inline-flex focus:outline-none rounded-full items-center justify-center group"
              aria-label="Load more guests"
            >
              <LoadMore loading={isValidating} />

              <span
                className="absolute rounded-full h-20 w-20 group-focus-visible:ring-4"
                aria-hidden
              />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
