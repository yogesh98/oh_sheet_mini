import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Navs from 'containers/Navbar/Navs';
const Dashboard = React.lazy(() => import('containers/Dashboard/CueCallerDashboard'));

const NotFound = React.lazy(() => import('views/App/NotFound'));

export default function CueCaller() {
  return (
        <>
            <Navs />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route element={<NotFound />}/>
            </Routes>
        </>
  );
}

