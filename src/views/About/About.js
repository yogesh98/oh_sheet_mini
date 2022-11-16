import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Layout from 'views/About/Layout';
import Landing from 'containers/Landing/Landing';
import OhSheetMax from "containers/Landing/OhSheetMax";
const NotFound = React.lazy(() => import('views/App/NotFound'));

export default function About() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/landing" element={<Landing />} />
              <Route path="/ohsheet-max" element={<OhSheetMax />} />
              <Route path="*" element={<NotFound />}/>
            </Route>
        </Routes>
    </>
  );
}

