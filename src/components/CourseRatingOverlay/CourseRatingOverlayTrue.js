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

/*
The flow was supposed to be like this:
1. We have course with no ratings.
2. User A rates the course.
3. Firestore ratings collection is populatd, and firebase functions calculate the average ratings for the course and updates it in this particular course document in courses collection.
4. User B opens a platform. When he clicks show ratings, he sees averaged ratings that are included in course documents in courses collection.
5. User B clicks rate it, and opens a rating form. This rating form should be empty, zero stars assigned.
6. User B adjust amount of starts for each rating (or at least Overall rating) and clicks rate it.
7. New rating is added to ratings collection, firebase functions recalculate average ratings for this course (now there are ratings of (user A + user B divided by 2) and populates the course document with new averaged values.
8. And now User B should not be able to update the rating anymore. When he clicks rate it, he sees amount of stars he send, but he is not able to change them and also submit button is disabled.
*/
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
const loremIpsum = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. \nMany desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
const alreadyRatedAlert = "* You already rated this course."

const NoCourseDialogBody = ({ closeHandler, errorText }) => (
  <>
    <DialogTitle>Oops!</DialogTitle>
    <DialogContent>
      <DialogContentText>{errorText || "Course is not present in DB"}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center" }}>
      <PrimaryButton onClick={closeHandler} sx={{ flexGrow: 0 }}>
        Close
      </PrimaryButton>
    </DialogActions>
  </>
)

export const CourseRatingOverlay = () => {
  const dispatch = useDispatch();
  const [currentCourseData, setCurrentCourseData] = useState(initialCourseState)
  const [ratingId, setRatingId] = useState(null);
  const [noCourse, setNoCourse] = useState('');

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
          comment: rating?.comment || loremIpsum
        }
      })
    }
    return formData
  }, [currentCourseId])

  const { control, handleSubmit, formState: { defaultValues, errors } } = useForm({
    defaultValues: setInitialValues
  })

  const onSubmit = async(data) => {
    console.log(ratingId, data)
    // ToDo: add submit functionality with rating collection api
    const newRating = {
      id: uuidv4(),
      courseId: currentCourseId,
      userId: getCurrentUser().uid,

      rating: data.rating,
      codeSnippetsWorking: data.codeSnippetsWorking,
      easilyExplained: data.easilyExplained,
      keptUpToDate: data.keptUpToDate,
      topicCoverage: data.topicCoverage,
      organization: data.organization,
      comment: data.comment
    };
    console.log('newRating', newRating)
    try {
      await addRating(newRating)
      // ToDo: add comment to comments array in course collection
      closeCourseHandler()
      // navigate("/", {state: {message: "Course was rated!"}})
    } catch (error) {
      console.log('submit error', error)
    }
    // if (ratingId) {
    //   // do nothing
    //   // await updateRating(newRating);
    // } else {
    //   await addRating({ ...newRating, id: uuidv4() });
    // }

    // closeCourseHandler();
    // navigate("/", {state: {message: "Course was rated!"}})
  }

  const fetchInitialRating = useCallback(async () => {
    if (currentCourseId !== null) {
      try {
        const response = await fetchCourse(currentCourseId);
  
        if (!response?.exists()) return setNoCourse("Course is not present in DB");
  
        return setCurrentCourseData({
          id: response.get('id'),
          title: response.get('title'),
          author: response.get('author')
        });
      } catch (error) {
        console.log('fetchInitialRating [error]', error)
        setNoCourse(error?.message || 'Unknown error');
      }
    
    }
  }, [currentCourseId]);

  useEffect(() => {
    fetchInitialRating();
  }, [fetchInitialRating]);

  const isAlredyRated = Boolean(ratingId)

  if (noCourse?.length) return (
    <StyledDialog open={showCourse} onClose={closeCourseHandler}>
      <NoCourseDialogBody closeHandler={closeCourseHandler} errorText={noCourse} />
    </StyledDialog>
  )

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
            {alreadyRatedAlert}
          </DialogContentText>
        )}
        <CourseRatingSection control={control} {...defaultValues} readOnly={isAlredyRated} />

        {errors?.rating?.message && <DialogContentText variant='caption' color='error'>{errors?.rating?.message}</DialogContentText>}

        <Box sx={{ mt: 1, paddingX: { xs: 2, sm: 0 } }}>
          <AddCommentSection control={control} readOnly={isAlredyRated} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <PrimaryButton onClick={closeCourseHandler} sx={{ flexGrow: 0 }}>
          Cancel
        </PrimaryButton>
        <PrimaryButton type="submit" sx={{ flexGrow: 0 }} disabled={isAlredyRated}>
          Submit
        </PrimaryButton>
      </DialogActions>
    </StyledDialog>
  );
}
