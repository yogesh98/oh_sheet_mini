import React, { Suspense } from "react";
import { AuthProvider } from "contexts/AuthContext"
import { Container } from "react-bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const Login = React.lazy(() => import('containers/Login/Login'));
const Signup = React.lazy(() => import('containers/Login/Signup'));

const NotFound = React.lazy(() => import('containers/App/NotFound'));


export default function App() {
  return (
  	<Suspense fallback={<span>Loading...</span>}>
  	    <Container
	      className="d-flex align-items-center justify-content-center"
	      style={{ minHeight: "100vh" }}
	    >
		    <div className="w-100" style={{ maxWidth: "400px" }}>
			    <Router>
				    <AuthProvider>
				        <Switch>
				          <Route exact path="/">
				            <Login />
				          </Route>
				          <Route exact path="/signup">
				            <Signup />
				          </Route>
				          <Route>
				          	<NotFound />
				          </Route>
				        </Switch>
				    </AuthProvider>
			    </Router>
		    </div>
	    </Container>
    </Suspense>
  );
}

