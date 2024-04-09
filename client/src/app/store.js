import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { movieApi } from '../services/MOVIEAPI';
import genreOrCategoryReducer from '../features/currentGenreOrCategory'
import userReducer from '../features/auth';

export const store = configureStore({
    reducer: {
        [movieApi.reducerPath]: movieApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

setupListeners(store.dispatch);