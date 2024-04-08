import { configureStore } from '@reduxjs/toolkit';
import courseDetailsReducer from './courseDetailsSlice';
import loginReducer from './loginSlice';
import courseRatingReducer from './courseRatingSlice';
import errorStateReducer from './errorSlice';

const store = configureStore({
    reducer: { courseDetails: courseDetailsReducer, login: loginReducer, courseRating: courseRatingReducer, errorState: errorStateReducer },
    devTools: true
});

export default store;