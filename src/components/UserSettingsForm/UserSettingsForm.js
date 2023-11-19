import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Form, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { uploadUserPhoto } from "../../api/FirestoreApi";
import { updatePhoto } from "../../api/FirebaseAuthApi";

const UserSettingsForm = () => {
    const navigate = useNavigate();
    const userEmail = useSelector((state) => state.login.email);
    const userPhoto = useSelector((state) => state.login.imageUrl);
    const userId = useSelector((state) => state.login.userId);
    const [firstLetter, setFirstLetter] = useState('');
    const [photo, setPhoto] = useState(userPhoto);

    const updateUserHandler = async (event) => {
        event.preventDefault();

        const data = event.target;

        let url = "/static/images/no-image.jpg";

        if (data.photo.files[0]) {
            url = await uploadUserPhoto(data.photo.files[0], userId);
        }
        
        updatePhoto(userId, url);

        navigate("/", {state: {message: "Photo was uploaded!"}});
    }

    const goBackHandler = () => {
        navigate("/");
    }

    const deleteAccountHandler = () => {

    }

    const displayPhotoHandler = (event) => {
        setPhoto(URL.createObjectURL(event.target.files[0]))
    }

    useEffect(() => {
        setFirstLetter(userEmail.charAt(0).toUpperCase());
    }, [userEmail]);

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    User settings
                </Typography>
                <Box
                    component={Form}
                    onSubmit={updateUserHandler}
                    sx={{ mt: 1, width: "100%" }}
                    autoComplete="off"
                >
                    <Grid container spacing={1} direction={"row"}>
                        <Grid item xs={2} sx={{ display: "flex", justifyContent: "right", alignItems: "center", paddingRight: "20px" }}>
                            <Typography component="p">
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={10} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                            <TextField
                                margin="normal"
                                disabled
                                fullWidth
                                multiline
                                id="name"
                                name="name"
                                autoFocus
                                defaultValue={userEmail}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} direction={"row"}>
                        <Grid item xs={2} sx={{ display: "flex", justifyContent: "right", alignItems: "center", paddingRight: "20px" }}>
                            <Avatar sx={{ bgcolor: deepOrange[500] }} src={photo ? photo : ''} >
                                {firstLetter}
                            </Avatar>
                        </Grid>
                        <Grid item xs={10} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                            <TextField
                                name="photo"
                                id="photo"
                                type="file"
                                fullWidth
                                sx={{
                                    marginTop: "16px"
                                }}
                                onChange={displayPhotoHandler}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        direction={"row"}
                        justifyContent={"center"}
                    >
                        <Grid item xs={2} alignContent={"center"}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Apply
                            </Button>
                        </Grid>
                        <Grid item xs={4} alignContent={"center"}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick={deleteAccountHandler}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Delete account
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick={goBackHandler}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Go back
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default UserSettingsForm;