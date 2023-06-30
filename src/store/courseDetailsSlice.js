import { createSlice } from '@reduxjs/toolkit';

const initialCourseState = { 
    isCourseOpened: false,
    currentCourseId: null
  }

const courseDetailsSlice = createSlice({
    name: 'courseDetails',
    initialState: initialCourseState,
    reducers: {
        toggleCourseDetails(state) {
            state.isCourseOpened = !state.isCourseOpened;
        },
        setCurrentCourseId(state, action) {
            state.currentCourseId = action.payload;
        }
    }
})

export const courseDetailsActions = courseDetailsSlice.actions;

export default courseDetailsSlice.reducer;