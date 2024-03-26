import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { courseRatingActions } from '../../store/courseRatingSlice';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CourseRatingSection from './CorseRatingSection';
import { PrimaryButton } from "../PrimaryButton/PrimaryButton"
import { addRating, fetchCourse, fetchCourseRating, updateRating } from '../../api/FirestoreApi';
import { getCurrentUser } from '../../api/FirebaseAuthApi';
import { AddCommentSection } from './AddCommentSection';
import { v4 as uuidv4 } from "uuid";
import Box from '@mui/material/Box';
import { StyledDialog } from './CourseRateDialog.styled';
import { Typography } from '@mui/material';

const initialCourseState = {
  id: "",
  title: "",
  author: ""
}
const initialFormState = {
  rating: null,
  codeSnippetsWorking: null,
  easilyExplained: null,
  keptUpToDate: null,
  topicCoverage: null,
  organization: null,
  comment: ''
}

export const CourseRatingOverlay = () => {
  const dispatch = useDispatch();
  const [currentCourseData, setCurrentCourseData] = useState(initialCourseState)
  const [ratingId, setRatingId] = useState(null);

  const showCourse = useSelector((state) => state.courseRating.isRatingOpened);
  const currentCourseId = useSelector(
    (state) => state.courseRating.currentCourseId
  );

  const closeCourseHandler = () => {
    setRatingId(null);
    dispatch(courseRatingActions.toggleCourseRating(null));
    dispatch(courseRatingActions.setCurrentCourseId(null));
  };

  const setInitialValues = useCallback(async () => {
    let formData = initialFormState
    if (currentCourseId !== null) {
      const maybeRatingSnap = await fetchCourseRating(
        currentCourseId,
        getCurrentUser().uid
      );
      if (maybeRatingSnap.empty) return;

      maybeRatingSnap.forEach((doc) => {
        const rating = doc.data();
        setRatingId(rating.id);
        formData = {
          rating: rating.rating,
          codeSnippetsWorking: rating.codeSnippetsWorking,
          easilyExplained: rating.easilyExplained,
          keptUpToDate: rating.keptUpToDate,
          topicCoverage: rating.topicCoverage,
          organization: rating.organization,
          comment: rating?.comment || ''
        }
      })
    }
    return formData
  }, [currentCourseId])

  const { control, handleSubmit, formState: { defaultValues } } = useForm({
    defaultValues: setInitialValues
  })

  const onSubmit = async(data) => {
    console.log(ratingId, data)
    // ToDo: add submit functionality from src/components/CourseRatingOverlay/CourseRatingOverlay.js
    const newRating = {
      id: ratingId ? ratingId : null,
      courseId: currentCourseId,
      userId: getCurrentUser().uid,

      rating: data.rating,
      codeSnippetsWorking: data.codeSnippetsWorking,
      easilyExplained: data.easilyExplained,
      keptUpToDate: data.keptUpToDate,
      topicCoverage: data.topicCoverage,
      organization: data.organization
    };
    console.log('newRating', newRating)

    // if (ratingId) {
    //   await updateRating(newRating);
    // } else {
    //   await addRating({ ...newRating, id: uuidv4() });
    // }

    closeCourseHandler();
    // navigate("/", {state: {message: "Course was rated!"}})
  }

  const fetchInitialRating = useCallback(async () => {
    if (currentCourseId !== null) {
      const response = await fetchCourse(currentCourseId);
      setCurrentCourseData({
        id: response.get('id'),
        title: response.get('title'),
        author: response.get('author')
      });
    }
  }, [currentCourseId]);

  useEffect(() => {
    fetchInitialRating();
  }, [fetchInitialRating]);


  return (
    <StyledDialog
      open={showCourse}
      onClose={closeCourseHandler}
      maxWidth="md"
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle variant="h4">
        {currentCourseData.title}
        <Typography variant="body1" color="text.secondary" textTransform="capitalize" marginTop={1}>
          By {currentCourseData.author}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {ratingId && (
          <DialogContentText color="text.primary" mb={2} variant="subtitle2" component="div" align="center">
            {"* You already rated this course. Want to change the rating?"}
          </DialogContentText>
        )}
        <CourseRatingSection control={control} {...defaultValues} />
        <Box sx={{ mt: 1, paddingX: { xs: 2, sm: 0 } }}>
          <AddCommentSection control={control} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <PrimaryButton onClick={closeCourseHandler} sx={{ flexGrow: 0 }}>
          Cancel
        </PrimaryButton>
        <PrimaryButton type="submit" sx={{ flexGrow: 0 }}>
          Submit
        </PrimaryButton>
      </DialogActions>
    </StyledDialog>
  );
}
