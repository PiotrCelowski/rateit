import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const CookieBanner = () => {
    const [cookies, setCookies] = useState(new Cookies());
    const [isConsentApproved, setIsConsentApproved] = useState(cookies.get("ConsentCookie") === true);

    const style = {
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
    };

    const approveHandler = () => {
        cookies.set('ConsentCookie', 'true', { path: '/' });
        setIsConsentApproved(true);
    }

    useEffect(() => {
        setIsConsentApproved(cookies.get('ConsentCookie') === true);
    }, [cookies])

    return (
        <Modal open={!isConsentApproved}>
            <Box padding={"10px"} sx={{ ...style, display: "flex", flexDirection: "row" }}>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                    <Typography variant="h5" textAlign={"center"}>Cookie consent</Typography>
                    <Typography variant="p">This website uses cookies to enhance the user experience.</Typography>
                    <Button onClick={approveHandler}
                        type="button"
                        variant="contained"
                        sx={{width: "100px", alignSelf: "center", marginTop: "10px"}}
                        >Got it!</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CookieBanner;