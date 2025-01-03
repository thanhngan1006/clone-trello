// list cac mau, khong tinh phan duoi cung
import { SampleItem } from "./SampleItem";

type SampleListData = {
  imgSrc: string;
  sampleName: string;
};

type SampleListProps = {
  data: SampleListData[];
};

export const SampleList = ({ data }: SampleListProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {data.map((item, index) => (
        <SampleItem
          key={index}
          imgSrc={item.imgSrc}
          sampleName={item.sampleName}
        />
      ))}
    </ul>
  );
};
