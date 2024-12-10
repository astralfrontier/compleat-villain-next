import { CvArt } from "@/lib/art-loader";
import Image from "next/image";

interface CvArtProps {
  art: CvArt;
}

export default function ArtImage(props: CvArtProps) {
  const { art } = props;
  return (
    <a href={art.url} target="_blank">
      <div className="card">
        <div className="card-image">
          <Image
            src={art.url}
            width={art.width}
            height={art.height}
            alt={art.caption}
          />
        </div>
        <div className="card-content">
          <p className="has-text-centered">{art.caption}</p>
          <p className="has-text-centered is-size-7">
            <em>{art.attribution}</em>
          </p>
        </div>
      </div>
    </a>
  );
}
