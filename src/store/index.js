import { configureStore } from '@reduxjs/toolkit';
import courseDetailsReducer from './courseDetailsSlice';
import loginReducer from './loginSlice';
import courseRatingReducer from './courseRatingSlice';

const store = configureStore({
    reducer: { courseDetails: courseDetailsReducer, login: loginReducer, courseRating: courseRatingReducer },
    devTools: true
});

export default store;