import React, { useState, useEffect, useCallback, useReducer } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { courseRatingActions } from "../../store/courseRatingSlice";
import { fetchCourse } from "../../api/FirestoreApi";
import CourseRatingSection from "./CourseRatingSection";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "../../api/FirebaseAuthApi";
import { useNavigate } from "react-router-dom";
import {
  addRating,
  fetchCourseRating,
  updateRating,
} from "../../api/FirestoreApi";

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
  codeSnippetsWorking: 0,
  easilyExplained: 0,
  keptUpToDate: 0,
  topicCoverage: 0,
  organization: 0
};

const changeCourseRatingHandler = (state, action) => {
  const courseRating = {
    id: state.id,
    title: state.title,
    author: state.author,
    release: state.release,
    rating: state.rating,
    ratingVotes: state.ratingVotes,
    codeSnippetsWorking: state.codeSnippetsWorking,
    easilyExplained: state.easilyExplained,
    keptUpToDate: state.keptUpToDate,
    topicCoverage: state.topicCoverage,
    organization: state.organization
  };

  if (action.type === "RATING") {
    courseRating.rating = parseInt(action.value);
  }

  if (action.type === "SNIPPETS") {
    courseRating.codeSnippetsWorking = parseInt(action.value);
  }

  if (action.type === "EXPLAINED") {
    courseRating.easilyExplained = parseInt(action.value);
  }

  if (action.type === "UPTODATE") {
    courseRating.keptUpToDate = parseInt(action.value);
  }

  if (action.type === "COVERAGE") {
    courseRating.topicCoverage = parseInt(action.value);
  }

  if (action.type === "ORGANIZATION") {
    courseRating.organization = parseInt(action.value);
  }

  if (action.type === "INITIAL_UPDATE") {
    courseRating.id = action.id;
    courseRating.title = action.title;
    courseRating.author = action.author;
    courseRating.release = parseInt(action.release);
    courseRating.rating = parseInt(action.rating);
    courseRating.codeSnippetsWorking = parseInt(action.codeSnippetsWorking);
    courseRating.easilyExplained = parseInt(action.easilyExplained);
    courseRating.keptUpToDate = parseInt(action.keptUpToDate);
    courseRating.topicCoverage = parseInt(action.topicCoverage);
    courseRating.organization = parseInt(action.organization);
  }

  if (action.type === "INITIAL_RATING_UPDATE") {
    courseRating.rating = parseInt(action.rating);
    courseRating.codeSnippetsWorking = parseInt(action.codeSnippetsWorking);
    courseRating.easilyExplained = parseInt(action.easilyExplained);
    courseRating.keptUpToDate = parseInt(action.keptUpToDate);
    courseRating.topicCoverage = parseInt(action.topicCoverage);
    courseRating.organization = parseInt(action.organization);
  }

  return courseRating;
};

const CourseRatingOverlay = () => {
  const navigate = useNavigate();
  const showCourse = useSelector((state) => state.courseRating.isRatingOpened);
  const currentCourseId = useSelector(
    (state) => state.courseRating.currentCourseId
  );
  const dispatch = useDispatch();
  const [currentCourseRating, courseRatingDispatch] = useReducer(
    changeCourseRatingHandler,
    initialCourseState
  );
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
        codeSnippetsWorking: response.data().codeSnippetsWorking,
        easilyExplained: response.data().easilyExplained,
        keptUpToDate: response.data().keptUpToDate,
        topicCoverage: response.data().topicCoverage,
        organization: response.data().organization
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
          codeSnippetsWorking: rating.codeSnippetsWorking,
          easilyExplained: rating.easilyExplained,
          keptUpToDate: rating.keptUpToDate,
          topicCoverage: rating.topicCoverage,
          organization: rating.organization
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

  const explanationHandler = (event) => {
    courseRatingDispatch({
      type: "EXPLAINED",
      value: event.target.value,
    });
  };

  const upToDateHandler = (event) => {
    courseRatingDispatch({ type: "UPTODATE", value: event.target.value });
  };

  const coverageHandler = (event) => {
    courseRatingDispatch({ type: "COVERAGE", value: event.target.value });
  };

  const organizationHandler = (event) => {
    courseRatingDispatch({ type: "ORGANIZATION", value: event.target.value });
  };

  const rateItHandler = async () => {
    const newRating = {
      id: ratingId ? ratingId : null,
      courseId: currentCourseId,
      userId: getCurrentUser().uid,
      rating: currentCourseRating.rating,
      codeSnippetsWorking: currentCourseRating.codeSnippetsWorking,
      easilyExplained: currentCourseRating.easilyExplained,
      keptUpToDate: currentCourseRating.keptUpToDate,
      topicCoverage: currentCourseRating.topicCoverage,
      organization: currentCourseRating.organization
    };

    if (ratingId) {
      await updateRating(newRating);
    } else {
      await addRating({ ...newRating, id: uuidv4() });
    }

    setRatingId(null);
    dispatch(courseRatingActions.toggleCourseRating(null));

    navigate("/", {state: {message: "Course was rated!"}})
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
          explanationHandler={explanationHandler}
          upToDateHandler={upToDateHandler}
          coverageHandler={coverageHandler}
          organizationHandler={organizationHandler}
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
