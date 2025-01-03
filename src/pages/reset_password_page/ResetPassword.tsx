import { useContext } from "react";
import { ResetPasswordContext } from "../../context/ResetPasswordContext";

export const ResetPassword = () => {
  const context = useContext(ResetPasswordContext);

  if (!context) {
    // Handle the case where context is undefined
    throw new Error("ResetPasswordContext is undefined");
  }

  const {
    oldPassword,
    newPassword,
    confirmPassword,
    handleOldPassword,
    handleNewPassword,
    handleConfirmedPassword,
  } = context;

  return (
    <div className="w-full h-screen">
      <div className="bg-red-200 w-1280 mx-auto">
        <form action="">
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="old_password" className="text-sm">
              Old password
            </label>
            <input
              name="old_password"
              type="text"
              className="text-sm border border-gray-300 rounded-xl p-2.5"
              placeholder="Enter your old password"
              value={oldPassword}
              onChange={(e) => {
                handleOldPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="new_password" className="text-sm">
              New Password
            </label>
            <input
              name="new_password"
              type="text"
              className="text-sm border border-gray-300 rounded-xl p-2.5"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => {
                handleNewPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="confirmed password" className="text-sm">
              Confirmed password
            </label>
            <input
              name="confirmed password"
              type="text"
              className="text-sm border border-gray-300 rounded-xl p-2.5"
              placeholder="Enter your confirmed password"
              value={confirmPassword}
              onChange={(e) => {
                handleConfirmedPassword(e.target.value);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
