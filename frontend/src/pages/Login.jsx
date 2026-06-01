import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography
} from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Login failed"
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4 }}>
        Login
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        name="password"
        onChange={handleChange}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography sx={{ mt: 2 }}>
  Don't have an account?{" "}
  <Link to="/register">
    Register
  </Link>
</Typography>
    </Container>
  );
}

export default Login;