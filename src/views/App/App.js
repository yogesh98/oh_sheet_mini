import React, {useEffect} from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function App() {
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/login");
		}
	});

	return (
		<div style={{ height: "100vh" }}>
			<Outlet />
		</div>
  	);
}