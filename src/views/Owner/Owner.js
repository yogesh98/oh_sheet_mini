import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Layout from 'views/Owner/Layout';
const Dashboard = React.lazy(() => import('containers/Dashboard/CueCallerDashboard'));

const NotFound = React.lazy(() => import('views/App/NotFound'));

export default function Owner() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route element={<NotFound />}/>
            </Route>
        </Routes>
    </>
  );
}

