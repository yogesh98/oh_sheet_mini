import React from "react";
import { Outlet } from "react-router-dom";

//todo: Create private routes for authenticated users

export default function App({ children }) {
  return (
	<div style={{ height: "100vh" }}>
		<Outlet />
	</div>
  );
}