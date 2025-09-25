import classNames from "classnames";

type SwitchProps = {
  isActive: boolean;
  onChange: () => void;
};

export const Switch = ({ isActive, onChange }: SwitchProps) => {
  return (
    <div
      onClick={onChange}
      className={classNames(
        "flex w-8 h-4 bg-gray-600 rounded-full cursor-pointer transition-all duration-500",
        {
          "bg-green-500": isActive,
        }
      )}
    >
      <span
        className={classNames(
          "h-4 w-4 bg-white rounded-full transition-all duration-500 shadow-lg",
          {
            "ml-4": isActive,
          }
        )}
      />
    </div>
  );
};
