import Button from '@mui/material/Button';
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
    reset();
    setRatingId(null);
    dispatch(courseRatingActions.toggleCourseRating(null));
  };

  const setInitialValues = useCallback(async () => {
    let formData = initialFormState
    if (currentCourseId !== null) {
      const maybeRatingSnap = await fetchCourseRating(
        currentCourseId,
        getCurrentUser().uid
      );

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
    console.log('formData', formData)
    return formData
  }, [currentCourseId])

  const { control, handleSubmit, reset } = useForm({
    defaultValues: setInitialValues
  })

  const onSubmit = (data) => {
    console.log(data)
    closeCourseHandler();
  }

  const fetchInitialRating = useCallback(async () => {
    if (currentCourseId !== null) {
      const response = await fetchCourse(currentCourseId);
      console.log('response', response.data())
      setCurrentCourseData({
        id: response.get('id'),
        title: response.get('title'),
        author: response.get('author')
      });
      // ToDo: set form values correctly

      // const maybeRatingSnap = await fetchCourseRating(
      //   currentCourseId,
      //   getCurrentUser().uid
      // );

      // maybeRatingSnap.forEach((doc) => {
      //   const rating = doc.data();
      //   setRatingId(rating.id);
      //   courseRatingDispatch({
      //     rating: rating.rating,
      //     codeSnippetsWorking: rating.codeSnippetsWorking,
      //     easilyExplained: rating.easilyExplained,
      //     keptUpToDate: rating.keptUpToDate,
      //     topicCoverage: rating.topicCoverage,
      //     organization: rating.organization
      //   });
      // });
    }
  }, [currentCourseId]);

  useEffect(() => {
    fetchInitialRating();
  }, [fetchInitialRating]);


  return (
      <Dialog
        open={showCourse} onClose={closeCourseHandler}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit)
        }}
      >
        <DialogTitle>{currentCourseData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
            <CourseRatingSection control={control} {...initialFormState} />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <PrimaryButton onClick={closeCourseHandler} sx={{ flexGrow: 0 }}>Cancel</PrimaryButton>
          <PrimaryButton type="submit" sx={{ flexGrow: 0 }}>Submit</PrimaryButton>
        </DialogActions>
      </Dialog>
  );
}