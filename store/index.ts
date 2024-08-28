import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './redux/pageReducer';
import selectedSlideReducer from './redux/selectedSlide';
import isSliderReducer from './redux/isSlider';
import clickableReducer from './redux/isClickable';
import touchReducer from './redux/isTouch';
import cursorDisabledReducer from './redux/cursorDisabled';
import isScrollEnabledReducer from './redux/isScrollEnabled';
import portfolioReducer from './redux/portfolioItems';
import sectionReducer from './redux/sectionItems';
import postsSliceReducer from './redux/postSlice';

const store = configureStore({
  reducer: {
    page: pageReducer,
    selectedSlide: selectedSlideReducer,
    isSlider: isSliderReducer,
    isClickable: clickableReducer,
    isTouch: touchReducer,
    cursorDisabled: cursorDisabledReducer,
    isScrollEnabled: isScrollEnabledReducer,
    portfolio: portfolioReducer,
    section: sectionReducer,
    postSlice: postsSliceReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
