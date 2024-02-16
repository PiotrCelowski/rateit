import { forwardRef, useState } from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export const PasswordInput = forwardRef(( { id = 'password', label = "Password", name = 'password', autoComplete = 'new-password', required = false, ...controlProps }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((show) => !show);

  // -- from Mui docs - maybe it fix some unwanted behaviour - let it be :) --
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" required={required} fullWidth {...controlProps}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        inputRef={ref}
        name={name}
        label={label}
        id={id}
        autoComplete={autoComplete}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff color="inherit" />
              ) : (
                <Visibility color="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
});
