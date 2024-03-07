import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material";
import { MAX_SIZE, ACCEPT_TYPES } from "./Dropzone"

export const DropzoneMobile = ({ file, setFile, ...props }) => {
  const theme = useTheme();

  const baseStyle = {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
    borderColor: `rgba(0, 0, 0, 0.23)`,
    borderStyle: "solid",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.disabled,
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const onDrop = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);

  const onFileDialogCancel = useCallback(() => {
    setFile(null);
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    open
  } = useDropzone({
    onDrop,
    onFileDialogCancel,
    noClick: true,
    noKeyboard: true,
    multiple: false,
    maxFiles: 1,
    maxSize: MAX_SIZE,
    accept: ACCEPT_TYPES
  });

  return (
    <div className='container'>
      <div {...getRootProps({ style: baseStyle })} onClick={open}>
        <input {...getInputProps({...props})} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          paddingX: 2,
          paddingY: 1
        }}
        >
          <UploadFileIcon color={acceptedFiles?.length > 0 ? 'inherit' : 'primary'} fontSize='medium' />
        {acceptedFiles?.length > 0 ? (
          <Typography variant="body1">{file.name}</Typography>
        ) : (
            <Typography component={'div'} variant="body1" color='text.primary' sx={{ flexGrow: 1 }}>
              Click to upload
            </Typography>
          )}
        </Box>
      </div>
    </div>
  );
};
