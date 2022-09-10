import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Layout from 'views/Operator/Layout';
const Dashboard = React.lazy(() => import('containers/Dashboard/OperatorDashboard'));
const NotFound = React.lazy(() => import('views/App/NotFound'));

export default function Owner() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/cues/:uid/:spreadsheetId/:sheetName" element={<Dashboard />} />  
              <Route path="*" element={<NotFound />}/>
            </Route>
        </Routes>
    </>
  );
}

