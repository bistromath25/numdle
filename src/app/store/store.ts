import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducers/gameSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
