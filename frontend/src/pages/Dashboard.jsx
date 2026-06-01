import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";

import api from "../services/api";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const loadTasks = async () => {
    try {
      const response = await api.get("/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async () => {
    try {
      await api.post("/tasks/", taskData);

      setTaskData({
        title: "",
        description: "",
      });

      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="md">
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 4,
    mb: 2,
  }}
>
  <Typography variant="h4">
    Dashboard
  </Typography>

  <Button
    color="error"
    variant="contained"
    onClick={logout}
  >
    Logout
  </Button>
</Box>
      <TextField
        fullWidth
        label="Task Title"
        name="title"
        margin="normal"
        value={taskData.title}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Description"
        name="description"
        margin="normal"
        value={taskData.description}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={createTask}
      >
        Create Task
      </Button>

      

      {tasks.map((task) => (
        <Card key={task.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {task.title}
            </Typography>

            <Typography>
              {task.description}
            </Typography>

            <Typography>
              Status: {task.status}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                color="error"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Dashboard;