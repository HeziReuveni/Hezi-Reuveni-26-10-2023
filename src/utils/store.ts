import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isBoolean: false, 
};

const exampleSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
    setIsBoolean: (state, action) => {
      state.isBoolean = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    example: exampleSlice.reducer,
  },
});

export const { updateData, setIsBoolean } = exampleSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;

