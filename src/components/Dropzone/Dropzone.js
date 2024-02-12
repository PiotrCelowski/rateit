import React, { useCallback, useMemo } from "react";
import { Box, Link, Typography, alpha } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material";

export const MAX_SIZE = 3145728;
export const ACCEPT_TYPES = {
  'image/jpeg': [],
  'image/png': [],
  'image/svg+xml': [],
  'image/gif': []
}

export const Dropzone = ({ file, setFile, ...props }) => {
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
    color: theme.palette.success.dark,
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
    color: theme.palette.error.dark,
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    borderWidth: 2,
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.divider,
    borderStyle: "dashed",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.disabled,
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
    open
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    multiple: false,
    maxFiles: 1,
    maxSize: MAX_SIZE,
    accept: ACCEPT_TYPES
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
        <input {...getInputProps({...props})} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          minHeight: '108px'
        }}>
          <Box sx={{ padding: 1, display: isDragActive ? 'none' : 'flex' }}>
            <UploadFileIcon color={acceptedFiles?.length > 0 ? 'inherit' : 'primary'} fontSize='medium' />
          </Box>
        {isDragActive ? (
          <Typography variant="body1">{isDragReject ? "Incorrect file type" : 'Drop here'}</Typography>
        ) : acceptedFiles?.length > 0 ? (
          <>
            <Typography variant="body1">{file.name}</Typography>
            <Link onClick={open} sx={{ cursor: 'pointer', textUnderlinePosition: 'under' }}>Replace</Link>
          </>
        ) : (
          <>
            <Typography component={'div'} variant="body1" color='text.primary'>
              <Link onClick={open} sx={{ marginInlineEnd: 1, cursor: 'pointer', textUnderlinePosition: 'under' }}>
                Click to upload
              </Link>
                or drag and drop
            </Typography>
            <Typography component={'div'} color='text.secondary'>{'SVG, PNG, JPG or GIF (max. 3MB)'}</Typography>
          </>
          )}
        </Box>
      </div>
    </div>
  );
};
