import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Boards,
  Login,
  NoPage,
  Samples,
  Business,
  Design,
  Education,
  Technology,
  Marketing,
  HumanResource,
  Personal,
  Performance,
  ProductManagement,
  ProjectManagement,
  RemoteWork,
  BusinessDepartment,
  Support,
  GroupManagement,
  Layout,
  WorkspaceBoard,
  WorkspaceMembers,
  BoardDetail,
} from "./pages";
import { ResetPassword } from "./pages/reset_password_page";
import ProtectedRoute from "./components/ProtectdRoute";
import { LoginProvider } from "./context/LoginContext";
import { AuthProvider } from "./context/AuthContext";
import { ResetPasswordProvider } from "./context/ResetPasswordContext";
import { LayoutWorkspace } from "./pages/layout_workspace";
import { BoardManagementProvider } from "./context/BoardManagementContext";
import { WorkspaceHeaderBar } from "./components/WorkspaceHeaderBar";
import { NavBoard } from "./components/NavBoard";

// const Home = React.lazy(() => import("./pages/"));

const Home = React.lazy(() =>
  import("e:/Mon's Workspace/Typescript/CloneTrello/src/pages/index").then(
    (module) => ({ default: module.Home })
  )
);

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading component...</p>}>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginProvider>
                <Login />
              </LoginProvider>
            }
          />

          <Route
            path="/reset-password"
            element={
              <ResetPasswordProvider>
                <ResetPassword />
              </ResetPasswordProvider>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="boards" element={<Boards />} />
            <Route path="samples" element={<Samples />}>
              <Route path="business" element={<Business />} />
              <Route path="design" element={<Design />} />
              <Route path="education" element={<Education />} />
              <Route path="technology" element={<Technology />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="human_resource" element={<HumanResource />} />
              <Route path="personal" element={<Personal />} />
              <Route path="performance" element={<Performance />} />
              <Route
                path="product_management"
                element={<ProductManagement />}
              />
              <Route
                path="project_management"
                element={<ProjectManagement />}
              />
              <Route path="remote_work" element={<RemoteWork />} />
              <Route
                path="business_department"
                element={<BusinessDepartment />}
              />
              <Route path="support" element={<Support />} />
              <Route path="group_management" element={<GroupManagement />} />
              <Route path="*" element={<NoPage />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Route>

          {/* cho trang workspace */}
          <Route
            path="/w/workspace3"
            element={
              <ProtectedRoute>
                <LayoutWorkspace
                  HeaderBar={WorkspaceHeaderBar}
                  classNameForMainPart="p-4 mt-[62px] flex flex-col"
                />
              </ProtectedRoute>
            }
          >
            <Route index element={<WorkspaceBoard />} />
            <Route path="members" element={<WorkspaceMembers />} />
            {/* <Route path="account" element={<WorkspaceAccount />} />
            <Route path="billing" element={<WorkspaceBilling />} />
            <Route path="view/table" element={<WorkspaceViewTable />} />
            <Route path="view/calendar" element={<WorkspaceViewCalendar />} /> */}
          </Route>

          {/* chuyen toi trang board */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LayoutWorkspace
                  HeaderBar={NavBoard}
                  classNameForMainPart="mt-[62px] flex flex-col"
                />
              </ProtectedRoute>
            }
          >
            {/* <Route index element={} /> */}
            {/* <Route path="sXviVaXEqvwQxxgIdrIL/Main" element={<BoardDetail />} /> */}
            <Route path="b/:boardId/:boardName" element={<BoardDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
