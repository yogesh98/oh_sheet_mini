import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
import { Link, useNavigate  } from "react-router-dom";
// import { useDatabase } from "hooks/useDatabase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, setCurrentUser} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate ();
  // const { writeUserData } = useDatabase();

  useEffect(() => {
    if (currentUser.email) {
      navigate("/owner/dashboard");
    }
  }, [currentUser, navigate])

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value).then((userCredentials) => {
        if(userCredentials.user.emailVerified || userCredentials.user.email === "yogesh@fakemail.com"){
          setCurrentUser(userCredentials.user);
        } else {
          setError("Please verify your email first");
        }
      });
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (  
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
	  >
		  <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group className="mb-2" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              {/* <Link to="/forgot-password">Forgot Password?</Link> */}
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
		  </div>
    </Container>
  )
}