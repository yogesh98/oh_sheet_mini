import { useRef, useState, useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link, useNavigate  } from "react-router-dom";

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

export interface ILoginProps {
}

export default function Login (props: ILoginProps) {
  const emailRef = useRef<HTMLInputElement>(null);

  const { currentUser, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate ();

  useEffect(() => {
    if (currentUser.email) {
      navigate("/owner/dashboard");
    }
  }, [currentUser, navigate])


  async function handleSubmit() {
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef?.current?.value).then(() => {
        navigate("/login");
      });
    } catch {
      setError("Failed to send email. Please make sure you have a valid email address");
    }
    setLoading(false);
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
              <Text as='sup'>Open Beta</Text>
            </Flex>
            <Heading size={useBreakpointValue({ base: 'md', md: 'lg' })}>
              Forgot Password
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
            {error ? <Text color="red.400">{error}</Text> : null}
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" ref={emailRef} />
              </FormControl>
              <Button disabled={loading} variant="solid" onClick={handleSubmit}>Reset Password</Button>
            </Stack>

            <Stack spacing="6">
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <HStack spacing="1" justify="center">
                <Text>Remember your password?</Text>
                <Button variant="link" colorScheme="blue">
                  <Link to="/login">Log in</Link>
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
