import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setError, removeError } from "../../actions/ui";

import { useForm } from "../../hooks/useForm";
import { startLoginUsernamePassword } from "../../actions/auth";

import Avatar from "@mui/material/Avatar";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginWithUsernamePassword } from "./LoginWithUsernamePassword";

const theme = createTheme();

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ui);

  const [showPassword, setShowPassword] = useState(false);

  const [formValues, handleInputChange] = useForm({
    username: "",
    password: "",
  });

  const { username, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startLoginUsernamePassword(username, password));
    }
  };

  const isFormValid = () => {
    if (password.toString().length < 1) {
      dispatch(setError("La contraseña debe tener minimo ocho caracteres"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>{" "}
          
            <LoginWithUsernamePassword
              username={username}
              password={password}
              handleInputChange={handleInputChange}
              handleLogin={handleLogin}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              loading={false}
            />
          
          <Grid container>
            <Grid item>
              ¿No tienes una cuenta?{" "}
              <Link to="/auth/register" variant="body2">
                {"Registrate"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
