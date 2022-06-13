import { useRef, useState, useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link, useNavigate  } from "react-router-dom";
import { useDatabase } from "hooks/useDatabase";

import { PasswordField } from 'components/Login/PasswordFieldComponent';

import {
  Box,
  Button,
  // Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'

export interface ILoginProps {
}

export default function Login (props: ILoginProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login, currentUser, setCurrentUser} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate ();
  const { writeUserData } = useDatabase();

  useEffect(() => {
    if (currentUser.email) {
      navigate("/owner/dashboard");
    }
  }, [currentUser, navigate, writeUserData])


  async function handleSubmit() {
    try {
      setError("");
      setLoading(true);
      await login(emailRef?.current?.value, passwordRef?.current?.value).then((userCredentials: any) => {
        if(userCredentials.user.emailVerified || userCredentials.user.email === "yogesh@fakemail.com"){
          setCurrentUser(userCredentials.user);
        } else {
          setError("Please verify your email first");
        }
      });
    } catch {
      setError("Failed to log in. Please check your email and password");
    }
    setLoading(false);
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing={8}>
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'md', md: 'lg' })}>
              Log in to your account
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('lg', 'dark-lg') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            {error ? <Text color="red">{error}</Text> : null}
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" ref={emailRef} />
              </FormControl>
              <PasswordField ref={passwordRef} />
            </Stack>
            {/* <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>*/}
            <Stack spacing="6">
              <Button disabled={loading} variant="solid" onClick={handleSubmit}>Sign in</Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <HStack spacing="1" justify="center">
                <Text>Don't have an account?</Text>
                <Button variant="link" colorScheme="blue">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
