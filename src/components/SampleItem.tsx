import { Link } from "react-router-dom";

type SampleItemProps = {
  imgSrc: string;
  sampleName: string;
};

export const SampleItem = ({ imgSrc, sampleName }: SampleItemProps) => {
  return (
    <li className="px-3">
      <Link
        className="flex gap-3 py-2 px-2 items-center hover:bg-gray-200 rounded-md group relative"
        to=""
      >
        <img className="w-12 h-11 rounded-sm" src={imgSrc} alt={sampleName} />
        <span className="font-bold text-md">{sampleName}</span>
      </Link>
    </li>
  );
};
