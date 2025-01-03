type LineType = {
  mtTop?: "0" | "1" | "2" | "3" | "4" | "5";
  mbBottom?: "0" | "1" | "2" | "3" | "4" | "5";
};

export const Line = ({ mtTop = "3", mbBottom = "3" }: LineType) => {
  return (
    <div
      className={`w-full h-0.5 bg-gray-200 ${`mt-${mtTop}`} ${`mb-${mbBottom}`}`}
    ></div>
  );
};
