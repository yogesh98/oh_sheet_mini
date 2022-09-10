import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Layout from 'views/About/Layout';
import Landing from 'containers/Landing/Landing';
const NotFound = React.lazy(() => import('views/App/NotFound'));

export default function About() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/landing" element={<Landing />} />
              <Route path="*" element={<NotFound />}/>
            </Route>
        </Routes>
    </>
  );
}

