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
import { addRating, fetchCourse, fetchCourseRating, updateRating, addNewCommentToCourse } from '../../api/FirestoreApi';
import { getCurrentUser } from '../../api/FirebaseAuthApi';
import { AddCommentSection } from './AddCommentSection';
import { v4 as uuidv4 } from "uuid";
import Box from '@mui/material/Box';
import { StyledDialog } from './CourseRateDialog.styled';
import { Alert, Collapse, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

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
const ALERT_TEXT = '*All rating fields are required.'

const initialCourseState = {
  id: "",
  title: " ",
  author: " "
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
  const navigate = useNavigate()
  const isAlreadyRated = Boolean(ratingId)

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

  const { control, handleSubmit, formState: { defaultValues, errors } } = useForm({
    defaultValues: setInitialValues
  })

  const onSubmit = async(data) => {
    console.log('ratingId, data', ratingId, data)
    const currentUser = getCurrentUser()
    const newRatingId = isAlreadyRated ? ratingId : uuidv4()

    const newRating = {
      id: newRatingId,
      courseId: currentCourseId,
      userId: currentUser.uid,
      // -- should we send 0 or currentRating values? --
      rating: data?.rating || 0,
      codeSnippetsWorking: data?.codeSnippetsWorking || 0,
      easilyExplained: data?.easilyExplained || 0,
      keptUpToDate: data?.keptUpToDate || 0,
      topicCoverage: data?.topicCoverage || 0,
      organization: data?.organization || 0,
      comment: data?.comment
    };
  
    try {
      // -- maybe we can add an update rating+comment feature here in the future --
      if (ratingId) {
        // -- do nothing for now --
        console.log('omg! ratingId is already exists! We should update it, but we cant :)', ratingId)
        // await updateRating(newRating); -- here we can update rating in the future
      } else {
        // -- adds new rating to firestore collection "ratings" --
        await addRating(newRating)
      }

      if (data?.comment?.length) {
        const commentData = {
          ratingId: newRatingId,
          courseId: currentCourseId,
          userId: currentUser.uid,
          userName: currentUser?.displayName || currentUser?.email,
          photoUrl: currentUser?.photoURL || '',
          rating: data?.rating || 0,
          comment: data.comment
        }
        // -- pushes overall rating and new comment to comment array of current course in firestore "courses" collection --
        await addNewCommentToCourse(commentData)
      }

      closeCourseHandler()
      navigate("/", { state: { message: "Course was rated!" } })
    } catch (error) {
      console.log('submit error', error)
      // ToDo: add error handling (toast notification or add server error to errors.root with useForm() functions)
    }
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
        <CourseRatingSection control={control} {...defaultValues} readOnly={isAlreadyRated} />

        <Collapse in={!isEmpty(errors)}>
          <Alert severity='error'>
            {ALERT_TEXT}
          </Alert>
        </Collapse>

        <Box sx={{ mt: 1, paddingX: { xs: 2, sm: 0 } }}>
          <AddCommentSection control={control} readOnly={isAlreadyRated} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <PrimaryButton onClick={closeCourseHandler} sx={{ flexGrow: 0 }}>
          Cancel
        </PrimaryButton>
        <PrimaryButton type="submit" sx={{ flexGrow: 0 }} disabled={isAlreadyRated || Boolean(Object.keys(errors)?.length)}>
          Submit
        </PrimaryButton>
      </DialogActions>
    </StyledDialog>
  );
}
