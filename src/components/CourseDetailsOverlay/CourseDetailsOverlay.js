import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { courseDetailsActions } from "../../store/courseDetailsSlice";
import { fetchCourse } from "../../firebase/FirestoreApi";
import CourseRatingSection from "./CourseRatingSection";
import CircularLoading from "../Loader/CircularLoading"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const initialCourseState = {
  title: "",
  author: "",
  rating: 0,
  ratingVotes: 0,
  snippets: 0,
  understandability: 0,
  maintenance: 0,
};

const CourseDetailsOverlay = () => {
  const showCourse = useSelector((state) => state.courseDetails.isCourseOpened);
  const currentCourseId = useSelector(
    (state) => state.courseDetails.currentCourseId
  );
  const dispatch = useDispatch();
  const [currentCourse, setCurrentCourse] = useState(initialCourseState);
  const [isLoading, setIsLoading] = useState(true);

  const closeCourseHandler = () => {
    dispatch(courseDetailsActions.setCurrentCourseId(null));
    dispatch(courseDetailsActions.toggleCourseDetails());
    setIsLoading(true);
  };

  const fetchCurrentCourse = useCallback(async () => {
    if (currentCourseId != null) {
      setIsLoading(true);
      const response = await fetchCourse(currentCourseId);
      setCurrentCourse((oldState) => {
        return {
          title: response.data().title,
          author: response.data().author,
          rating: response.data().rating,
          ratingVotes: response.data().ratingVotes,
          snippets: response.data().snippets,
          understandability: response.data().understandability,
          maintenance: response.data().maintenance,
        };
      });
      setIsLoading(false);
    }
  }, [currentCourseId]);

  useEffect(() => {
    fetchCurrentCourse();
  }, [fetchCurrentCourse]);

  return (
    <Modal open={showCourse} onClose={closeCourseHandler}>
      <>
        {isLoading && <CircularLoading />}
        {!isLoading && (
          <Box sx={style}>
            <Typography
              variant="h6"
              component="div"
              fontSize="20px"
              align="left"
            >
              {currentCourse.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              fontSize="12px"
              align="left"
              marginBottom="20px"
            >
              {currentCourse.author}
            </Typography>
            <CourseRatingSection {...currentCourse} />
            <Box
              width="100"
              marginTop="20px"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button onClick={closeCourseHandler}>Close</Button>
            </Box>
          </Box>
        )}
      </>
    </Modal>
  );
};

export default React.memo(CourseDetailsOverlay);
