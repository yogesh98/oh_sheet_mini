import React, { Suspense } from "react";
import { AuthProvider } from "contexts/AuthContext"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const Login = React.lazy(() => import('containers/Login/Login'));
const Signup = React.lazy(() => import('containers/Login/Signup'));
const CueCallerView = React.lazy(() => import('views/CueCaller/CueCaller'));

const NotFound = React.lazy(() => import('views/App/NotFound'));

//todo: Create private routes for authenticated users

export default function App() {
  return (
  	<Suspense fallback={<span>Loading...</span>}>
		<Router>
			<AuthProvider>
				<Routes>
					<Route exact path="/" element={<Login />}/>
					<Route exact path="/signup"  element={<Signup />}/>
					<Route path="/cuecaller/*" element={<CueCallerView />}/>
					<Route element={<NotFound />}/>
				</Routes>
			</AuthProvider>
		</Router>
    </Suspense>
  );
}

