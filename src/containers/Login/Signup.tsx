import { useRef, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link, useNavigate  } from "react-router-dom";

import { PasswordField } from 'components/Login/PasswordFieldComponent';

import {
  Box,
  Button,
  // Checkbox,
  Container,
  Divider,
  Flex,
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

export interface ISignupProps {
}

export default function Signup (props: ISignupProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate ();


  async function handleSubmit() {

    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef?.current?.value, passwordRef?.current?.value).then((userCredentials: any) => {
        console.log(userCredentials);
        setLoading(false);
        navigate("/Login");
      });
    } catch {
      setError("Failed to create an account");
      setLoading(false);
    }
  }

  const passwordConfirmProps = { // make sure all required component's inputs/Props keys&types match
    label: "Confirm Password",
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing={8}>
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Flex alignItems={"center"} justifyContent="center">
              <Heading size={useBreakpointValue({ base: '2xl', md: '4xl' })}>
                  oh sheet.
              </Heading>
              <Text>Open Beta</Text>
            </Flex>
            <Heading size={useBreakpointValue({ base: 'md', md: 'lg' })}>
              Sign up for your account
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
              <PasswordField {...passwordConfirmProps} ref={passwordConfirmRef}/>
            </Stack>
            <Stack spacing="6">
              <Button disabled={loading} variant="solid" onClick={handleSubmit}>Sign up</Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <HStack spacing="1" justify="center">
                <Text>Already have an account?</Text>
                <Button variant="link" colorScheme="blue">
                    <Link to="/Login">Log In</Link>
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
