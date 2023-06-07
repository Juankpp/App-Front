import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const LoginWithUsernamePassword = (props) => {
  const {
    username,
    password,
    handleInputChange,
    handleLogin,
    showPassword,
    setShowPassword,
    loading,
  } = props;

  return (
    <>
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
          endIcon={<LoginIcon />}
        >
          Ingresar
        </Button>
      </Box>
    </>
  );
};
