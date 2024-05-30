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
        outline: 'none'
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
                    <Typography variant="p">We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising, and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services. </Typography>
                    <Button onClick={approveHandler}
                        type="button"
                        variant="contained"
                        sx={{width: "100px", alignSelf: "center", marginTop: "10px", backgroundColor: '#ba68c8'}}
                        >Got it!</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CookieBanner;