import React, { useCallback, useMemo } from "react";
import { Typography, alpha } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material";

export const Dropzone = ({ file, setFile }) => {
  const theme = useTheme();
  const focusedStyle = {
    borderColor: alpha(
      theme.palette.action.focus,
      theme.palette.action.focusOpacity
    ),
    backgroundColor: alpha(
      theme.palette.action.focus,
      theme.palette.action.focusOpacity
    ),
  };

  const acceptStyle = {
    borderColor: alpha(
      theme.palette.success.main,
      0.2 + theme.palette.action.hoverOpacity
    ),
    backgroundColor: alpha(
      theme.palette.success.light,
      0.2 + theme.palette.action.hoverOpacity
    ),
  };

  const rejectStyle = {
    borderColor: alpha(
      theme.palette.error.main,
      0.2 + theme.palette.action.hoverOpacity
    ),
    backgroundColor: alpha(
      theme.palette.error.light,
      0.2 + theme.palette.action.hoverOpacity
    ),
  };

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    borderWidth: 2,
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.grey[300],
    borderStyle: "dashed",
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.disabled,
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);

  // Todo: add accepted file types, style with icon and figma text

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: { "image/*": [] },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1">Drop here</Typography>
        ) : acceptedFiles?.length > 0 ? (
          <Typography variant="body1">{file.name}</Typography>
        ) : (
          <Typography variant="body1">
            Drag 'n' drop some files here, or click to select files
          </Typography>
        )}
      </div>
    </div>
  );
};
