import React, {useEffect} from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, useColorModeValue } from '@chakra-ui/react'

export default function App() {
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/login");
		}
	});

	return (
			<Box id="app_container" bg={useColorModeValue('', 'gray.800')} h="100vh">
				<Outlet />
			</Box>
  	);
}