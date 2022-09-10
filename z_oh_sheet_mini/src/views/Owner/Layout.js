import { Box, Flex } from "@chakra-ui/react";
import Navs from "containers/Navbar/Navs";
import { Outlet } from "react-router-dom";

export default function Layout() {

    return (
        <Flex direction="column" height="100%">
            <Box className="mb-2">
                <Navs />        
            </Box>
            <Outlet />
        </Flex>
    )
}