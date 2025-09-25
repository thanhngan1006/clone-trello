import { Outlet } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export const Samples = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span>Các tính năng nổi bật</span>
        <div className="relative">
          <input
            name="password"
            type="text"
            className="text-sm border border-gray-300 rounded-md pl-8 pr-2 py-2 w-full"
            placeholder="Search..."
            autoComplete=""
          />

          <div className="absolute left-0 bottom-0 top-0 flex items-center cursor-pointer px-2">
            <CiSearch />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
