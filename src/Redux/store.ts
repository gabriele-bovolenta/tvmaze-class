import { configureStore } from "@reduxjs/toolkit";
import themeSlice from './theme'

const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});

export default store;
 