import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App/App';
import { AuthProvider } from "contexts/AuthContext"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import LoaderComponent from "components/Loader/LoaderComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = React.lazy(() => import('containers/Login/Login'));
const Signup = React.lazy(() => import('containers/Login/Signup'));
const OwnerView = React.lazy(() => import('views/Owner/Owner'));
const Operator = React.lazy(() => import('views/Operator/Operator'));
const NotFound = React.lazy(() => import('views/App/NotFound'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
  	<Suspense fallback={<LoaderComponent />}>
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
            <Route path="viewer/*" element={<Operator />}/>
            <Route path="*" element={<NotFound />}/>
          </Route>
				</Routes>
			</AuthProvider>
		</Router>
    </Suspense>
  </React.StrictMode>
);

function RequireAuth({ children, redirectTo }: { children: JSX.Element, redirectTo: string }) : JSX.Element {
	const {currentUser} = useAuth();
	return currentUser.email ? children : <Navigate  to={redirectTo}/>;
}