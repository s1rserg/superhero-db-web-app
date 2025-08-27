import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { superheroes as superheroesService } from '~/services/services';

const extraArgument = {
  superheroesService,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, extraArgument };
