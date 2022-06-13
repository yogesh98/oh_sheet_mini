import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Icon,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon, ChevronUpIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IoLogOutOutline } from "react-icons/io5";

import { useAuth } from "contexts/AuthContext";
import {  useNavigate  } from "react-router-dom";


const Links = [
    {label: 'Home', eventKey: 'dashboard'},
];


const NavLink = ({ children, handleSelect }: { children: ReactNode, handleSelect: React.MouseEventHandler<HTMLAnchorElement> }) => 
{

    return (
        <Link
          px={2}
          py={1}
          rounded={'md'}
          _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}
          onClick={handleSelect}>
          {children}
        </Link>
      );
}

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {  logout } = useAuth();
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();

    const handleSelect = (eventKey: string) => () => {
        console.log(eventKey);
        if (eventKey === "logout") {
            logout();
        } else if(eventKey === "dashboard") {
            navigate("/owner/dashboard");
        }
    };


    return (
    <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                size={'md'}
                icon={isOpen ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box>📜</Box>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}>
                        {Links.map((link) => (
                            <NavLink key={link.eventKey} handleSelect={handleSelect(link.eventKey)}>{link.label}</NavLink>
                        ))}
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <HStack>
                        <Menu>
                            <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                                <HamburgerIcon boxSize={6} />
                            </MenuButton>
                            <MenuList>
                                {colorMode === 'dark' ? <MenuItem onClick={toggleColorMode} icon={<SunIcon boxSize={6}/>}>Light Mode</MenuItem> : <MenuItem onClick={toggleColorMode} icon={<MoonIcon boxSize={6}/>}>Dark Mode</MenuItem>}
                                <MenuDivider />
                                <MenuItem onClick={handleSelect("logout")} icon={<Icon boxSize={6} as={IoLogOutOutline} />}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                <Stack as={'nav'} spacing={4}>
                    {Links.map((link) => (
                        <NavLink key={link.eventKey} handleSelect={handleSelect(link.eventKey)}>{link.label}</NavLink>
                    ))}
                </Stack>
                </Box>
            ) : null}
        </Box>
    </>
    );
}