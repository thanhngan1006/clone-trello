// này là cái khi toggle ra là ra khung, có nút khám phá các mẫu luôn
import { FaChevronUp } from "react-icons/fa";
import { SampleList } from "./SampleList";

type SamplesData = {
  imgSrc: string;
  sampleName: string;
};

type SamplesProps = {
  data: SamplesData[];
};

export const Samples = ({ data }: SamplesProps) => {
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-gray-400">Các mẫu hàng đầu</span>
        <FaChevronUp />
      </div>
      <SampleList data={data} />
    </div>
  );
};
