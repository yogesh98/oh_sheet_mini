import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Layout from 'views/Owner/Layout';
const Dashboard = React.lazy(() => import('containers/Dashboard/OwnerDashboard'));

const NotFound = React.lazy(() => import('views/App/NotFound'));

export default function Owner() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="*" element={<NotFound />}/>
            </Route>
        </Routes>
    </>
  );
}

