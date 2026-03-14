import { combineReducers, configureStore } from "@reduxjs/toolkit";
import materialsReducer from "./materialsSlice";

const store = configureStore({
    reducer: combineReducers({
        materials: materialsReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
