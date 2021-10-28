import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const Login = React.lazy(() => import('containers/Login/Login'));
const NotFound = React.lazy(() => import('containers/App/NotFound'));


export default function App() {
  return (
  	<Suspense fallback={<span>Loading...</span>}>
	    <Router>
	        <Switch>
	          <Route exact path="/">
	            <Login />
	          </Route>
	          <Route path="/">
	          	<NotFound />
	          </Route>
	        </Switch>
	    </Router>
    </Suspense>
  );
}

