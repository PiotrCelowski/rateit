import React, { useState, useEffect, useCallback, useReducer } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { courseRatingActions } from "../../store/courseRatingSlice";
import { fetchCourse } from "../../firebase/FirestoreApi";
import CourseRatingSection from "./CourseRatingSection";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "../../firebase/FirebaseAuthApi";
import {
  addRating,
  fetchCourseRating,
  updateRating,
} from "../../firebase/FirestoreApi";

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
  id: "",
  title: "",
  author: "",
  rating: 0,
  ratingVotes: 0,
  snippets: 0,
  understandability: 0,
  maintenance: 0,
};

const changeCourseRatingHandler = (state, action) => {
  const courseRating = {
    id: state.id,
    title: state.title,
    author: state.author,
    release: state.release,
    rating: state.rating,
    ratingVotes: state.ratingVotes,
    snippets: state.snippets,
    understandability: state.understandability,
    maintenance: state.maintenance,
  };

  if (action.type === "RATING") {
    courseRating.rating = parseInt(action.value);
  }

  if (action.type === "SNIPPETS") {
    courseRating.snippets = parseInt(action.value);
  }

  if (action.type === "UNDERSTANDABILITY") {
    courseRating.understandability = parseInt(action.value);
  }

  if (action.type === "MAINTENANCE") {
    courseRating.maintenance = parseInt(action.value);
  }

  if (action.type === "INITIAL_UPDATE") {
    courseRating.id = action.id;
    courseRating.title = action.title;
    courseRating.author = action.author;
    courseRating.release = parseInt(action.release);
    courseRating.rating = parseInt(action.rating);
    courseRating.snippets = parseInt(action.snippets);
    courseRating.understandability = parseInt(action.understandability);
    courseRating.maintenance = parseInt(action.maintenance);
  }

  if (action.type === "INITIAL_RATING_UPDATE") {
    courseRating.rating = parseInt(action.rating);
    courseRating.snippets = parseInt(action.snippets);
    courseRating.understandability = parseInt(action.understandability);
    courseRating.maintenance = parseInt(action.maintenance);
  }

  return courseRating;
};

const CourseRatingOverlay = () => {
  const showCourse = useSelector((state) => state.courseRating.isRatingOpened);
  const currentCourseId = useSelector(
    (state) => state.courseRating.currentCourseId
  );
  const dispatch = useDispatch();
  const [currentCourseRating, courseRatingDispatch] = useReducer(
    changeCourseRatingHandler,
    initialCourseState
  );
  const [isLoading, setIsLoading] = useState(false);
  const [ratingId, setRatingId] = useState(null);

  const closeCourseHandler = () => {
    setRatingId(null);
    dispatch(courseRatingActions.toggleCourseRating(null));
  };

  const fetchInitialRating = useCallback(async () => {
    if (currentCourseId != null) {
      const response = await fetchCourse(currentCourseId);
      courseRatingDispatch({
        type: "INITIAL_UPDATE",
        id: response.data().id,
        title: response.data().title,
        author: response.data().author,
        release: response.data().release,
        rating: response.data().rating,
        ratingVotes: response.data().ratingVotes,
        snippets: response.data().snippets,
        understandability: response.data().understandability,
        maintenance: response.data().maintenance,
      });

      const maybeRatingSnap = await fetchCourseRating(
        currentCourseId,
        getCurrentUser().uid
      );

      maybeRatingSnap.forEach((doc) => {
        const rating = doc.data();
        setRatingId(rating.id);
        courseRatingDispatch({
          type: "INITIAL_RATING_UPDATE",
          rating: rating.rating,
          snippets: rating.snippets,
          understandability: rating.understandability,
          maintenance: rating.maintenance,
        });
      });
    }
  }, [currentCourseId]);

  useEffect(() => {
    fetchInitialRating();
  }, [fetchInitialRating]);

  const ratingChangeHandler = (event) => {
    courseRatingDispatch({ type: "RATING", value: event.target.value });
  };

  const snippetsChangeHandler = (event) => {
    courseRatingDispatch({ type: "SNIPPETS", value: event.target.value });
  };

  const understandabilityChangeHandler = (event) => {
    courseRatingDispatch({
      type: "UNDERSTANDABILITY",
      value: event.target.value,
    });
  };

  const maintenanceChangeHandler = (event) => {
    courseRatingDispatch({ type: "MAINTENANCE", value: event.target.value });
  };

  const rateItHandler = async () => {
    const newRating = {
      id: ratingId ? ratingId : null,
      courseId: currentCourseId,
      userId: getCurrentUser().uid,
      rating: currentCourseRating.rating,
      snippets: currentCourseRating.snippets,
      understandability: currentCourseRating.understandability,
      maintenance: currentCourseRating.maintenance,
    };

    if (ratingId) {
      await updateRating(newRating);
    } else {
      await addRating({ ...newRating, id: uuidv4() });
    }

    setRatingId(null);
    dispatch(courseRatingActions.toggleCourseRating(null));
  };

  return (
    <Modal open={showCourse} onClose={closeCourseHandler}>
      <Box sx={style}>
        {ratingId && (
          <Typography variant="subtitle2" component="div" align="center">
            {"You already rated this course. Want to change the rating?"}
          </Typography>
        )}
        <Typography variant="h6" component="div" fontSize="20px" align="left">
          {currentCourseRating.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          fontSize="12px"
          align="left"
          marginBottom="20px"
        >
          {currentCourseRating.author}
        </Typography>
        <CourseRatingSection
          {...currentCourseRating}
          ratingChangeHandler={ratingChangeHandler}
          snippetsChangeHandler={snippetsChangeHandler}
          understandabilityChangeHandler={understandabilityChangeHandler}
          maintenanceChangeHandler={maintenanceChangeHandler}
        />
        <Box
          width="100"
          marginTop="20px"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button onClick={rateItHandler}>Rate it</Button>
          <Button onClick={closeCourseHandler}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CourseRatingOverlay;
