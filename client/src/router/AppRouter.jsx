import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AdminTemplate from "../layouts/AdminTemplate";
import PreLoginTemplate from "../layouts/PreLoginTemplate";
import Login from "../screens/Auth/login";
import Dashboard from "../screens/Dashboard/dashboard";
import AddClient from "../screens/Users/addClient";
import AddStaff from "../screens/Users/addStaff";
import ClientListing from "../screens/Users/clientListing";
import EditUser from "../screens/Users/assignStaff";
import StaffListing from "../screens/Users/staffListing";
import ProtectedRoute from "./ProtectedRoute";



const AppRouter = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <PreLoginTemplate>
            <Login />
          </PreLoginTemplate>
        }
      />

      <Route path="/dashboard" element={<ProtectedRoute isAllowed={true} />}>
        <Route
          element={
            <AdminTemplate>
              <Dashboard />
            </AdminTemplate>
          }
        />
        <Route
          path=""
          element={
            <AdminTemplate>
              <Dashboard />
            </AdminTemplate>
          }
        />

        <Route
          path="staff"
          element={
            <AdminTemplate>
              <StaffListing />
            </AdminTemplate>
          }
        />
        <Route
          path="staff/add"
          element={
            <AdminTemplate>
              <AddStaff />
            </AdminTemplate>
          }
        />
        <Route
          path="clients"
          element={
            <AdminTemplate>
              <ClientListing />
            </AdminTemplate>
          }
        />
        <Route
          path="client/add"
          element={
            <AdminTemplate>
              <AddClient />
            </AdminTemplate>
          }
        />
        <Route
          path="client/assign/staff/:id"
          element={
            <AdminTemplate>
              <EditUser />
            </AdminTemplate>
          }
        />
      </Route>

      {/* <Route path="/"
                element={
                    <PreLoginTemplate>
                        <Login />
                    </PreLoginTemplate>
                }
            /> */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;

const NotFound = () => {
  return <div>404</div>;
};
