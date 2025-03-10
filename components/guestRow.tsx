import { AllArtistEntry } from "../types/shared";
import GuestPreview from "./guestPreview";
import Pill from "./pill";

type ArtistRowProps = {
  alphabet: string;
  artists: AllArtistEntry[];
};

export default function GuestRow({ alphabet, artists }: ArtistRowProps) {
  return (
    <section id={alphabet} className="border-t-2 border-black">
      <div className="p-4 sm:p-8 relative">
        <Pill>
          <h2>{alphabet}</h2>
        </Pill>

        <div className="h-8" />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-6 sm:gap-8">
          {artists.map((artist, i) => (
            <li key={i}>
              <GuestPreview
                name={artist.name}
                slug={artist.slug}
                src={artist.photo.url}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
