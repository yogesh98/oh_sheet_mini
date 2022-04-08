import React, { Suspense } from "react";
import { AuthProvider } from "contexts/AuthContext"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "contexts/AuthContext";


const Login = React.lazy(() => import('containers/Login/Login'));
const Signup = React.lazy(() => import('containers/Login/Signup'));
const OwnerView = React.lazy(() => import('views/Owner/Owner'));

const NotFound = React.lazy(() => import('views/App/NotFound'));

//todo: Create private routes for authenticated users

export default function App() {
  return (
  	<Suspense fallback={<span>Loading...</span>}>
		<Router>
			<AuthProvider>
				<Routes>
					<Route exact path="/" element={<Login />}/>
					<Route exact path="/login" element={<Login />}/>
					<Route exact path="/signup"  element={<Signup />}/>
					<Route path="/owner/*" element={
						<RequireAuth redirectTo="/login">
							<OwnerView />
						</RequireAuth>
					}/>
					<Route element={<NotFound />}/>
				</Routes>
			</AuthProvider>
		</Router>
    </Suspense>
  );
}

function RequireAuth({ children, redirectTo }) {
	const {currentUser} = useAuth();
	console.log(currentUser);
	return currentUser.email ? children : <Navigate  to={redirectTo}/>;
}
