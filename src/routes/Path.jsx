import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import RouteGuard from "../components/RouteGuard";
import LoginGuard from "../components/LoginGuard";
import UpdateContact from "../pages/UpdateContact";
import ContactTable from "../components/ContactTable";
import CreateContact from "../components/CreateContact";
import Favorite from "../pages/Favorite";
import Detail from "../pages/Detail";

const Path = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <LoginGuard>
              <Dashboard />
            </LoginGuard>
          }
        >
          <Route index element={<ContactTable />} />
          <Route path="table" element={<ContactTable />} />
          <Route path="create" element={<CreateContact />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="update/:id" element={<UpdateContact />} />
          <Route path="detail/:id" element={<Detail />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Path;
