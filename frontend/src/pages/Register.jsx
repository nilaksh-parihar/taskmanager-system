import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        formData
      );

      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Register
      </Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        margin="normal"
        onChange={handleChange}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Register
      </Button>
      <Typography sx={{ mt: 2 }}>
  Already have an account?{" "}
  <Link to="/">
    Login
  </Link>
</Typography>
    </Container>
  );
}

export default Register;