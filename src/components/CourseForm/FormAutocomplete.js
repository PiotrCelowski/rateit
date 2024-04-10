import { capitalize } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const renderTags = (value, getTagProps) => {
  return value.map((option, index) => (
    <Chip variant="filled" label={option} {...getTagProps({ index })} />
  ));
};

export const FormAutocomplete = ({ name, options, placeholder }) => {
  const { setValue } = useFormContext()
  const handleCreateOption = useCallback(
    (name, arrayValue, newOption) => {
      if (!newOption?.length) return;
      return setValue(name, [...arrayValue, capitalize(newOption)]);
    },
    [setValue]
  );

  return (
    <Controller
      name={name}
      render={({ field: { onChange, ref, ...field } }) => (
        <Autocomplete
          {...field}
          id={name}
          options={options}
          handleHomeEndKeys
          freeSolo
          multiple
          onChange={(_event, value, action, details) => {
            if (action === "createOption") {
              const { option } = details;
              return handleCreateOption(name, field.value, option);
            }
            onChange(value);
          }}
          renderTags={renderTags}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              hiddenLabel
              placeholder={placeholder || "Choose"}
              inputRef={ref}
            />
          )}
        />
      )}
    />
  );
};
