import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { useForm } from "../../hooks/useForm";
import { setError, removeError } from "../../actions/ui";
import { startRegisterWithUsernamePassword } from "../../actions/auth";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const theme = createTheme();

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ui);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [formValues, handleInputChange] = useForm({
    username: "",
    password: "",
    password2: "",
  });

  const { username, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithUsernamePassword(username, password));
    }
  };

  const isFormValid = () => {
   if (password.toString().length < 1) {
      dispatch(setError("La contraseña debe tener minimo ocho caracteres"));
      return false;
    } else if (password !== password2) {
      dispatch(setError("Las contraseñas no coinciden"));
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
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegister}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              type="username"
              autoComplete="off"
              onChange={handleInputChange}
              value={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              value={password}
              InputProps={{
                className: "pr-2",
                type: showPassword ? "text" : "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      size="large"
                    >
                      <VisibilityIcon>
                        {showPassword ? "visibility" : "visibility_off"}
                      </VisibilityIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirmar contraseña"
              type="password"
              id="password2"
              autoComplete="current-password2"
              name="password2"
              onChange={handleInputChange}
              value={password2}
              InputProps={{
                className: "pr-2",
                type: showPassword2 ? "text" : "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword2(!showPassword2)}
                      size="large"
                    >
                      <VisibilityIcon>
                        {showPassword2 ? "visibility" : "visibility_off"}
                      </VisibilityIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              endIcon={<LoginIcon />}
            >
              Registrar
            </Button>
            <Grid container>
              <Grid item>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/auth/login" variant="body2">
                  Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
