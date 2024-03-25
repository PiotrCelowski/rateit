import Dialog from '@mui/material/Dialog';
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
import { fetchCourse, fetchCourseRating } from '../../api/FirestoreApi';
import { getCurrentUser } from '../../api/FirebaseAuthApi';

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
  organization: null
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
          organization: rating.organization
        }
      })
    }
    return formData
  }, [currentCourseId])

  const { control, handleSubmit, formState: { defaultValues } } = useForm({
    defaultValues: setInitialValues
  })

  const onSubmit = (data) => {
    console.log(ratingId, data)
    // ToDo: add submit functionality from src/components/CourseRatingOverlay/CourseRatingOverlay.js
    closeCourseHandler();
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
      <Dialog
        open={showCourse} onClose={closeCourseHandler}
        maxWidth='sm'
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit),
          sx: {
            width: '100%',
            marginX: 0
          }
        }}
      >
        <DialogTitle>{currentCourseData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {ratingId && "You already rated this course. Want to change the rating?"}
          </DialogContentText>
            <CourseRatingSection control={control} {...defaultValues} />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <PrimaryButton onClick={closeCourseHandler} sx={{ flexGrow: 0 }}>Cancel</PrimaryButton>
          <PrimaryButton type="submit" sx={{ flexGrow: 0 }}>Submit</PrimaryButton>
        </DialogActions>
      </Dialog>
  );
}
