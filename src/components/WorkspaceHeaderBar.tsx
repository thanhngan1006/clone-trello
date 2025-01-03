import { CiLock } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { IoPersonAdd } from "react-icons/io5";
import { Button } from "./Button";
import { Line } from "./Line";

export const WorkspaceHeaderBar = () => {
  return (
    <div>
      <div className="w-769 mx-auto p-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              src="https://i.pinimg.com/736x/47/94/c6/4794c6203b9650f968248b529614dfb3.jpg"
              alt="cho"
              className="w-16 h-16 rounded-md border"
            />
            <div className="flex flex-col gap-1 ">
              <div className="flex gap-2 items-center">
                <span className=" font-bold text-gray-600">
                  Mon's Workspace
                </span>
                <GoPencil className="w-3" />
              </div>
              <div className="flex gap-1">
                <CiLock className="w-4 h-4" />
                <span className="text-sm text-gray-500">Riêng tư</span>
              </div>
            </div>
          </div>

          {/* <button>Mời các thành viên Không gian làm việc</button> */}
          <Button
            width="46"
            className="font-thin rounded-sm flex gap-2 text-sm items-center"
          >
            <IoPersonAdd className="w-3 h-4" />
            Mời các thành viên Không gian làm việc
          </Button>
        </div>
      </div>
      <Line />
    </div>
  );
};
