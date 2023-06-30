import { createSlice } from '@reduxjs/toolkit';

const initialRatingState = { 
    isRatingOpened: false,
    currentCourseId: null
}

const courseRatingSlice = createSlice({
    name: 'courseRating',
    initialState: initialRatingState,
    reducers: {
        toggleCourseRating(state) {
            state.isRatingOpened = !state.isRatingOpened;
        },
        setCurrentCourseId(state, action) {
            state.currentCourseId = action.payload;
        }
    }
})

export const courseRatingActions = courseRatingSlice.actions;

export default courseRatingSlice.reducer;