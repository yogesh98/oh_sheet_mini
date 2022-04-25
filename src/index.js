import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App/App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { AuthProvider } from "contexts/AuthContext"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = React.lazy(() => import('containers/Login/Login'));
const Signup = React.lazy(() => import('containers/Login/Signup'));
const OwnerView = React.lazy(() => import('views/Owner/Owner'));

const NotFound = React.lazy(() => import('views/App/NotFound'));
require('dotenv').config()


ReactDOM.render(
  <React.StrictMode>
  	<Suspense fallback={<span>Loading...</span>}>
		<Router>
			<AuthProvider>
        <ToastContainer />
				<Routes>
					<Route path="/" element={<App />}>
            <Route path="login" element={<Login />}/>
            <Route path="signup"  element={<Signup />}/>
            <Route path="owner/*" element={
              <RequireAuth redirectTo="/login">
                <OwnerView />
              </RequireAuth>
            }/>
            <Route element={<NotFound />}/>
          </Route>
				</Routes>
			</AuthProvider>
		</Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
  () => document.title = "📜 Oh Sheet!"
);

function RequireAuth({ children, redirectTo }) {
	const {currentUser} = useAuth();
	return currentUser.email ? children : <Navigate  to={redirectTo}/>;
}

