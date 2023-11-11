import React from 'react';
import PendingCourseHeader from './PendingCourseHeader';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { courseDetailsActions } from '../../store/courseDetailsSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';

const PendingCourse = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openPendingCourseHandler = () => {
        dispatch(courseDetailsActions.setCurrentCourseId(props.id));
        navigate("/edit");
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="150"
                image={props.photoUrl}
                alt={props.title}
            />
            <CardContent sx={{ paddingBottom: "0px", minHeight: "150px" }}>
                <PendingCourseHeader {...props} />
            </CardContent>
            <CardActions sx={{ paddingLeft: "16px" }}>
                <Button size="small" onClick={openPendingCourseHandler}>
                    Edit & approve
                </Button>
            </CardActions>
        </Card>
    );
}

export default PendingCourse;