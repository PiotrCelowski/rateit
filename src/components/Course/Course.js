import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import CourseHeader from "./CourseHeader";
import CourseFooter from "./CourseFooter";
import { courseRatingActions } from "../../store/courseRatingSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { setLoggedIn } from "../../store/loginSlice";
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  maxWidth: 402,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiCardActionArea-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flexGrow: 1
  },
  '& .MuiCardContent-root': {
    flexGrow: 1,
    paddingBottom: 0,
    minHeight: "100px",
  }
})

const Course = (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.login.isLoggedIn);

  const navigate = useNavigate()

  const openCourseHandler = () => {
    navigate(`/courses/${props.id}`)
  };

  const openCourseRatingHandler = () => {
    dispatch(courseRatingActions.toggleCourseRating());
    dispatch(courseRatingActions.setCurrentCourseId(props.id));
  };


  return (
    <StyledCard>
       <CardActionArea onClick={openCourseHandler}>
        <CardMedia
          component="img"
          image={props.photoUrl}
          alt={props.title}
          sx={{
            height: {
              xs: 180,
              sm: 200
            }
          }}
          />
        <CardContent>
          <CourseHeader {...props} />
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'space-between', px: 1.5, "& .MuiButton-root": { textTransform: 'uppercase' } }}>
        <CourseFooter {...props} />
        {loggedIn && <Button size="small" onClick={openCourseRatingHandler}>
          Rate it
        </Button>}
      </CardActions>
    </StyledCard>
  );
};

export default Course;
