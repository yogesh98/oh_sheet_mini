import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Layout() {

    return (
        <Flex direction="column" height="100%">
            <Outlet />
        </Flex>
    )
}