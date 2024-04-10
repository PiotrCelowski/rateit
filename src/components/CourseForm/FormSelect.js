import { Controller } from "react-hook-form"
import { capitalize } from "../../utils/helpers"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"

export const FormSelect = ({ name, label, options }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          id={name}
          label={label || capitalize(name)}
          fullWidth
          select
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}
